# 💖 Event Command Centre
**AI-powered Event Intelligence & Decision Support System** — a live control layer that tells an Event Lead how ready the event really is, what is going wrong, *why*, and *what to do about it* — then proves the action worked.

> Event data → metrics → risk rules → explanation → recovery action → task → completion → new metrics → re-evaluated risks → updated health score.

## Two ways to run it
| | How | Needs |
|---|---|---|
| **A. Standalone** | Double-click `standalone/event-command-centre.html` | A browser. Nothing else. |
| **B. Next.js project** | commands below | Node 20+ |

```bash
npm install
cp .env.example .env.local     # optional — runs fully without any keys
npm run dev                    # http://localhost:3000
npm run typecheck              # strict TypeScript
npm test                       # 25 closed-loop assertions against the real engine
```
Deploy: push to GitHub → import in Vercel (no config needed).

## Features
- **Command centre:** health score with transparent breakdown, 8 clickable KPIs, target-vs-actual-vs-forecast chart, funnel, team readiness, readiness radar, mood emoji.
- **Risk engine:** 8 live rules → severity, explanation (what / why / impact), owner, status.
- **Recovery loop:** accept an action → real task → complete → metrics, risks and health change; the outcome strip records it.
- **Simulation lab:** 5 scenarios + 6 sliders; **Live registrations** stream; confetti on full recovery.
- **Guided Demo** (8 steps, "do it for me"), **⌘K command palette**, **Ask the Command Centre** Q&A, **Management brief** export.
- **Setup wizard** that really regenerates the plan (roles, objectives, date, target).
- Role switcher (Event Lead · Marketing · Partnerships · Operations · Programme · Leadership), notifications, drawers, toasts, responsive, keyboard accessible.
- **Pink theme:** blush (light) / plum (dark), follows the OS, toggle persists.

## Environment variables (all optional)
| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Claude: risk explanations, follow-ups, plan tasks, management narrative, recovery ranking |
| `ANTHROPIC_MODEL` | Defaults to `claude-sonnet-5-5` |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Persist state to Supabase (run `supabase/schema.sql` first) |

Without keys the app shows **Demo Intelligence Mode** — never an error.

## Project structure
| Folder | Contents |
|---|---|
| `app/` | Next.js App Router pages (one folder per sidebar page) + `/api/ai` route |
| `components/` | UI: primitives, dashboard, charts, risks, tasks, partners, Shell, DemoTour, CommandPalette, Confetti |
| `data/` | `demo-data.ts` — realistic seeded event |
| `docs/` | `ARCHITECTURE.md`, `DEMO_SCRIPT.md` |
| `hooks/` | `use-event.tsx` — the single state store (clone → mutate → settle → commit) |
| `lib/` | Pure business logic: metrics, risk-engine, health-score, simulation, actions, ai, qa, live, plan, brief, persistence, engine |
| `standalone/` | Single-file version — open in any browser, no install |
| `supabase/` | `schema.sql` — snapshot table + normalised production tables |
| `tests/` | Closed-loop test suite against the real engine |
| `types/` | event / task / risk / partner interfaces |

<details><summary>Full file list (62 files)</summary>

```
.env.example
.gitignore
.nvmrc
README.md
app/actions/page.tsx
app/analytics/page.tsx
app/api/ai/route.ts
app/error.tsx
app/globals.css
app/layout.tsx
app/loading.tsx
app/operations/page.tsx
app/page.tsx
app/partners/page.tsx
app/plan/page.tsx
app/registrations/page.tsx
app/risks/page.tsx
app/settings/page.tsx
app/setup/page.tsx
app/simulation/page.tsx
app/tasks/page.tsx
components/CommandPalette.tsx
components/Confetti.tsx
components/DemoTour.tsx
components/Shell.tsx
components/charts/index.tsx
components/dashboard/index.tsx
components/partners/index.tsx
components/risks/index.tsx
components/tasks/index.tsx
components/ui/index.tsx
data/demo-data.ts
docs/ARCHITECTURE.md
docs/DEMO_SCRIPT.md
hooks/use-event.tsx
lib/actions.ts
lib/ai.ts
lib/brief.ts
lib/dates.ts
lib/engine.ts
lib/health-score.ts
lib/live.ts
lib/metrics.ts
lib/persistence.ts
lib/plan.ts
lib/qa.ts
lib/risk-engine.ts
lib/routes.ts
lib/simulation.ts
lib/theme.ts
next.config.mjs
package.json
postcss.config.mjs
standalone/event-command-centre.html
supabase/schema.sql
tailwind.config.ts
tests/loop.test.ts
tsconfig.json
types/event.ts
types/partner.ts
types/risk.ts
types/task.ts
```
</details>

See `docs/ARCHITECTURE.md` for the design and `docs/DEMO_SCRIPT.md` for the judge walkthrough.

## Verification status
- Pure logic (`lib/`, `types/`, `data/`) is compiled with `tsc --strict` and covered by `npm test` (25 assertions).
- UI files were type-checked against **stubbed** React/Next/Recharts typings (no network in the build environment). Run `npm install && npm run typecheck && npm run dev` once on your machine to confirm against the real libraries.
- The standalone HTML was exercised in a simulated DOM (every page, tour, wizard, palette, live stream, persistence).

## Known limitations
- Registration / partner / operations data and per-action effect sizes are simulated.
- Supabase stores one snapshot row per event; normalised tables are provided as the migration target. The demo RLS policies are open — add auth + owner-scoped policies before real data.
- Claude calls are implemented but untested against a live key.
