import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: {
    bg: 'var(--bg)', pn: 'var(--pn)', p2: 'var(--p2)', bd: 'var(--bd)', tx: 'var(--tx)', mu: 'var(--mu)',
    ok: 'var(--g)', warn: 'var(--a)', crit: 'var(--r)', info: 'var(--b)' } } },
  plugins: [],
};
export default config;
