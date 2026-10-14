"""Перевод списка строк открытой моделью NLLB-200 (локально, без сети после загрузки модели).

stdin:  {"src": "ru", "tgt": "en", "texts": ["...", ...]}
stdout: {"texts": ["...", ...]}  — тот же порядок и длина.
Markdown сюда не попадает: его разбирает scripts/translate.mjs, сюда — только чистый текст.
"""
import json
import re
import sys

from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

MODEL = "facebook/nllb-200-distilled-600M"
CODES = {"ru": "rus_Cyrl", "uz": "uzn_Latn", "en": "eng_Latn"}
LETTER = re.compile(r"[^\W\d_]")


def tidy(t: str) -> str:
    """Артефакты токенизации NLLB: «What 's it for ?» -> «What's it for?»."""
    t = re.sub(r"\s+([?!.,:;%)])", r"\1", t)
    t = re.sub(r"([(])\s+", r"\1", t)
    t = re.sub(r"(\w) ('s|'re|'ve|'ll|'d|n't)\b", r"\1\2", t)
    return t.replace("n 't", "n't").strip()


def main() -> None:
    req = json.load(sys.stdin)
    texts = req["texts"]
    todo = sorted({t for t in texts if LETTER.search(t)})
    out = {}
    if todo:
        tok = AutoTokenizer.from_pretrained(MODEL, src_lang=CODES[req["src"]])
        model = AutoModelForSeq2SeqLM.from_pretrained(MODEL)
        bos = tok.convert_tokens_to_ids(CODES[req["tgt"]])
        for i in range(0, len(todo), 16):
            batch = todo[i : i + 16]
            enc = tok(batch, return_tensors="pt", padding=True, truncation=True, max_length=400)
            gen = model.generate(**enc, forced_bos_token_id=bos, max_new_tokens=512, num_beams=2)
            for s, t in zip(batch, tok.batch_decode(gen, skip_special_tokens=True)):
                out[s] = tidy(t)
    json.dump({"texts": [out.get(t, t) for t in texts]}, sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
