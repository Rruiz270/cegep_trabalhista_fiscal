# CEGEP — Gestão de Riscos Trabalhistas e Fiscais

Sistema web interativo para gestão e análise de riscos trabalhistas e fiscais do Centro Guaçuano de Educação Profissional "Gov. Mário Covas" (CEGEP). Cobre cadastro de colaboradores e situações (demissão, FUNCAMP, INSS, manutenção), controle de obrigações/parcelamentos fiscais, análise de cenários e geração de relatórios em Markdown. Aplicação **client-side**, sem backend nem banco.

## Stack

- **Linguagem**: TypeScript 5 (strict).
- **Framework**: Next.js 14.0.4 (App Router, diretório `app/`) + React 18.
- **UI/estilo**: Tailwind CSS 3 (+ autoprefixer/postcss); ícones via `lucide-react` e `react-icons`.
- **Estado**: React Hooks (`useState`) em componentes `'use client'` — dados vivem em memória no browser, não há persistência.
- **Banco/API**: nenhum. Sem variáveis de ambiente (confirmado no README).
- **Package manager**: npm (lockfile `package-lock.json` versionado).
- **Deploy**: Vercel (auto-deploy via GitHub; sem `vercel.json` — detecção automática de Next.js).

## Comandos

```bash
npm install     # instala dependências
npm run dev     # desenvolvimento (http://localhost:3000)
npm run build   # build de produção
npm run start   # serve o build
npm run lint    # next lint (ESLint)
```

Não há script de teste.

## Estrutura

```
app/
├── layout.tsx            # layout principal
├── page.tsx              # página inicial ('use client'); orquestra os módulos por abas
└── globals.css           # estilos globais
components/
├── EmployeeManager.tsx   # gestão trabalhista (colaboradores, verbas rescisórias)
├── TaxRiskManager.tsx    # gestão fiscal (obrigações, parcelamentos, vencimentos)
├── RiskAssessment.tsx    # avaliação/classificação de risco
├── ScenarioAnalysis.tsx  # análise de cenários e impacto financeiro
└── ReportGenerator.tsx   # geração/exportação de relatórios em Markdown
types/index.ts            # tipos (Employee, TaxRisk, ...) com unions de status/categoria
```

## Convenções de código

- TypeScript **strict**; alias de import `@/*` → raiz do projeto (`./*`).
- ESLint via `eslint-config-next` (`npm run lint`).
- Componentes interativos marcados com `'use client'`.
- Domínio modelado com **union types** em `types/index.ts` (ex.: `category`, `status` de `Employee`); ao adicionar situações, estenda essas unions em vez de usar `string` solta.
- Estilização exclusivamente com utilitários Tailwind.

## Variáveis de ambiente

Nenhuma. A aplicação é 100% client-side e não consome APIs externas. Caso venha a integrar um backend, prefixe variáveis expostas ao browser com `NEXT_PUBLIC_`, use `.env.local` (ignorado pelo git) e documente os nomes aqui — nunca segredos.

## CI/CD & Deploy

- **Deploy**: Vercel com auto-deploy ao push na `main`; preview deploys por PR.
- **CI**: não há workflows em `.github/`. Recomendação — workflow mínimo em PR (`npm ci → npm run lint → tsc --noEmit → npm run build`) para evitar quebras chegando ao deploy.

## Boas práticas de PR

- Branches: `feat/…`, `fix/…`, `chore/…`.
- **Conventional Commits** (o README sugere um fluxo de fork/branch; para o repo interno, prefira branches diretas + PR).
- PRs pequenos; checklist:
  - `npm run build` e `npm run lint` passam;
  - sem segredos/`.env` no diff;
  - screenshots para mudanças de UI (é um app visual de dashboard).
- ≥1 review; **squash merge**; `main` sempre deployável.

## Testes

Nenhum teste configurado. Recomendação proporcional: Vitest + React Testing Library cobrindo a lógica de cálculo (verbas rescisórias, impacto financeiro, classificação de risco) em `EmployeeManager`/`TaxRiskManager`/`RiskAssessment` — é onde erros custam mais.

## Segurança & dados

- **Dados pessoais sensíveis**: o sistema lida com nomes, cargos, salários e situações previdenciárias/rescisórias de colaboradores reais do CEGEP. Embora o estado seja apenas client-side, **não commite dados reais** (nomes, salários, CPFs) em fixtures, seeds ou exemplos versionados — use dados fictícios.
- LGPD: se qualquer persistência/exportação for adicionada, avalie base legal e minimização de dados.
- Nunca commitar `.env`/segredos (já ignorados).
- Revise dependências ao atualizar.

## Gotchas

- **Sem persistência**: todo o estado está em `useState` — recarregar a página perde os dados. Qualquer feature de "salvar" exige introduzir storage/backend (mudança arquitetural, não incremental).
- App essencialmente estático do ponto de vista de infra: não há rotas de API nem env; mantenha assim salvo decisão explícita.
- Uso interno do CEGEP — trate o conteúdo de exemplo com o mesmo cuidado de dados de produção.
