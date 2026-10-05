// Главная: терминал Claude Code с разделами; тексты берутся из frontmatter index.md.
import { useFrontmatter } from '@rspress/core/runtime';
import { HomeBackground, HomeFooter } from '@rspress/core/theme-original';
import { TerminalHub } from '../site/components/TerminalHub';

type Hero = { text?: string; actions?: { text: string; link: string }[] };

export function HomeHub() {
  const { frontmatter } = useFrontmatter();
  const hero = (frontmatter?.hero ?? {}) as Hero;
  return (
    <>
      <HomeBackground />
      <section className="hub-home">
        <TerminalHub title={hero.text} cta={hero.actions?.[0]} />
      </section>
      <HomeFooter />
    </>
  );
}
