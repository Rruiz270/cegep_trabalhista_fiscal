# CEGEP - Sistema de Gestão de Riscos Trabalhistas e Fiscais

Sistema web interativo para gestão e análise de riscos trabalhistas e fiscais do Centro Guaçuano de Educação Profissional "Gov. Mário Covas" (CEGEP).

## 🎯 Funcionalidades

### Gestão de Riscos Trabalhistas
- Cadastro e gerenciamento de colaboradores
- Categorização por tipo de situação (demissão, FUNCAMP, INSS, manutenção)
- Cálculo de impactos financeiros
- Acompanhamento de verbas rescisórias

### Gestão de Riscos Fiscais
- Controle de obrigações fiscais e parcelamentos
- Monitoramento de vencimentos
- Análise de risco por valor e criticidade
- Acompanhamento de parcelas ativas

### Relatórios Interativos
- Geração de relatórios em Markdown
- Exportação de documentos
- Análise de impacto financeiro
- Identificação de lacunas de informação

## 🚀 Como Usar

### Instalação
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

### Estrutura dos Dados

#### Colaboradores
- **Professores**: 16 colaboradores com demissão confirmada em dezembro/2024
- **Administrativos**: Situações diversas (demissão, pendência FUNCAMP, manutenção)
- **FEG**: Colaboradores dependentes da decisão da FUNCAMP
- **INSS**: Afastados por licença médica ou maternidade
- **Manutenção**: Colaboradores essenciais até 2026

#### Riscos Fiscais
- **Parcelamentos**: Controle de parcelas ativas com INSS, Receita Federal, etc.
- **Obrigações**: Vencimentos de tributos e contribuições
- **Dívidas**: Passivos em negociação
- **Análise de Risco**: Classificação por criticidade

## 📊 Funcionalidades do Sistema

### Dashboard Principal
- Resumo executivo de riscos trabalhistas e fiscais
- Indicadores de impacto financeiro
- Alertas para situações críticas

### Módulo Trabalhista
- Lista completa de colaboradores
- Filtros por categoria e status
- Formulário de cadastro/edição
- Cálculo automático de economias

### Módulo Fiscal
- Controle de obrigações fiscais
- Cronograma de vencimentos
- Status de parcelamentos ativos
- Níveis de risco por item

### Gerador de Relatórios
- Relatório completo (trabalhista + fiscal)
- Relatórios específicos por área
- Exportação em Markdown
- Copy/paste para outras ferramentas

## 🔧 Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **React Hooks** - Gerenciamento de estado

## 📋 Informações Pendentes

Para completar a análise de riscos, são necessárias as seguintes informações:

### Trabalhistas
- [ ] Datas de contratação de todos os colaboradores
- [ ] Documentação trabalhista completa
- [ ] Situação previdenciária da Maria Quaresma
- [ ] Provisões existentes para passivo trabalhista
- [ ] Prestação de contas ao Ministério Público

### Fiscais
- [ ] Situação atual dos parcelamentos ativos
- [ ] Consulta junto aos órgãos competentes
- [ ] Verificação de obrigações não catalogadas
- [ ] Confirmação de valores com contabilidade

## 🎮 Deploy

### Vercel
```bash
# Fazer build
npm run build

# Deploy automático via GitHub
# Conecte o repositório ao Vercel para deploy automático
```

### Variáveis de Ambiente
Não há variáveis de ambiente necessárias para a versão atual.

## 📝 Estrutura do Projeto

```
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página inicial
│   └── globals.css         # Estilos globais
├── components/
│   ├── EmployeeManager.tsx # Gestão trabalhista
│   ├── TaxRiskManager.tsx  # Gestão fiscal
│   └── ReportGenerator.tsx # Relatórios
├── types/
│   └── index.ts            # Definições TypeScript
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de uso interno do CEGEP para gestão de riscos trabalhistas e fiscais.

## 📞 Suporte

Para dúvidas ou sugestões sobre o sistema, entre em contato com a equipe de desenvolvimento.