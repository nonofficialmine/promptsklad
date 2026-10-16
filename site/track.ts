// Свои события в Umami (статистика без cookies). Если скрипт не загружен
// (локально, блокировщик, ID не задан) — просто ничего не делаем.
declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

export function track(event: string, data?: Record<string, string>): void {
  try {
    window.umami?.track(event, data);
  } catch {
    // статистика не должна ломать сайт
  }
}
