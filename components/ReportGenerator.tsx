'use client'

import { useState, useEffect } from 'react'
import { Download, FileText, Calendar, AlertTriangle, DollarSign } from 'lucide-react'
import { Employee, TaxRisk } from '@/types'

export default function ReportGenerator() {
  const [reportType, setReportType] = useState<'complete' | 'employees' | 'tax'>('complete')
  const [reportData, setReportData] = useState('')
  
  // Mock data - em produção, isso viria do estado global ou context
  const mockEmployees: Employee[] = [
    { id: '1', name: 'Adelino Bortolto Filho', position: 'Professor de Administração', salary: 2535.50, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '2', name: 'Maria do Carmo Quaresma Antonio', position: 'Analista de Recursos Humanos', salary: 5705.11, hireDate: '', category: 'maintain', status: 'maintain_2026' },
  ]
  
  const mockTaxRisks: TaxRisk[] = [
    {
      id: '1',
      type: 'installment',
      description: 'Parcelamento INSS - Contribuições em Atraso',
      amount: 45000.00,
      dueDate: '2025-01-15',
      status: 'current',
      riskLevel: 'medium',
      installmentInfo: { current: 8, total: 12, monthlyAmount: 3750.00 }
    }
  ]

  const generateEmployeeReport = () => {
    const dismissed = mockEmployees.filter(emp => emp.status === 'dismissed_december')
    const pending = mockEmployees.filter(emp => emp.status === 'funcamp_pending')
    const maintain = mockEmployees.filter(emp => emp.status === 'maintain_2026')
    const inss = mockEmployees.filter(emp => emp.status === 'inss_leave')
    
    const dismissedTotal = dismissed.reduce((sum, emp) => sum + emp.salary, 0)
    const pendingTotal = pending.reduce((sum, emp) => sum + emp.salary, 0)
    const maintainTotal = maintain.reduce((sum, emp) => sum + emp.salary, 0)

    return `# Relatório de Riscos Trabalhistas - CEGEP

## Data do Relatório
**Gerado em:** ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}

## Resumo Executivo

### Situação Geral dos Colaboradores
- **Total de colaboradores analisados:** ${mockEmployees.length}
- **Demissões confirmadas (Dezembro 2024):** ${dismissed.length}
- **Decisão pendente FUNCAMP:** ${pending.length}
- **Manutenção até 2026:** ${maintain.length}
- **Afastados INSS:** ${inss.length}

### Impacto Financeiro Mensal
- **Economia com demissões:** R$ ${dismissedTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- **Pendente decisão FUNCAMP:** R$ ${pendingTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- **Manutenção obrigatória:** R$ ${maintainTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

## Detalhamento por Categoria

### 1. Demissões Confirmadas - 15 de Dezembro de 2024
${dismissed.length > 0 ? dismissed.map(emp => 
  `- **${emp.name}** - ${emp.position} - R$ ${emp.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
).join('\n') : 'Nenhum colaborador nesta categoria'}

**Subtotal:** R$ ${dismissedTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

### 2. Decisão Pendente FUNCAMP
${pending.length > 0 ? pending.map(emp => 
  `- **${emp.name}** - ${emp.position} - R$ ${emp.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
).join('\n') : 'Nenhum colaborador nesta categoria'}

**Prazo para decisão:** Até início de 2026
**Subtotal:** R$ ${pendingTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

### 3. Manutenção até 2026
${maintain.length > 0 ? maintain.map(emp => 
  `- **${emp.name}** - ${emp.position} - R$ ${emp.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}${emp.observations ? ` - *${emp.observations}*` : ''}`
).join('\n') : 'Nenhum colaborador nesta categoria'}

**Subtotal:** R$ ${maintainTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

### 4. Afastados INSS
${inss.length > 0 ? inss.map(emp => 
  `- **${emp.name}** - ${emp.position}${emp.observations ? ` - *${emp.observations}*` : ''}`
).join('\n') : 'Nenhum colaborador nesta categoria'}

## Riscos Identificados

### 📋 Lacunas de Informação
- [ ] **Datas de contratação** de todos os colaboradores (necessário para cálculo de verbas rescisórias)
- [ ] **Situação previdenciária** detalhada da Maria Quaresma (data prevista de aposentadoria)
- [ ] **Documentação trabalhista** completa (contratos, folhas de pagamento)
- [ ] **Provisões existentes** para passivo trabalhista
- [ ] **Prestação de contas** ao Ministério Público (documentação atual)

### ⚠️ Riscos Trabalhistas
1. **Alto Risco:** Demissões em massa sem provisão adequada
2. **Médio Risco:** Colaboradores FEG dependentes de decisão FUNCAMP
3. **Baixo Risco:** Colaboradores com permanência garantida até 2026

### 💰 Estimativa de Passivo Trabalhista
- **Aviso prévio:** A calcular (dependente das datas de contratação)
- **13º salário proporcional:** A calcular
- **Férias proporcionais + 1/3:** A calcular
- **FGTS + 40% de multa:** A calcular

**⚠️ ATENÇÃO:** Cálculos finais dependem das informações pendentes listadas acima.

## Recomendações

1. **Imediato:**
   - Obter datas de contratação de todos os colaboradores
   - Solicitar documentação trabalhista completa
   - Verificar provisões existentes

2. **Curto prazo (até dezembro 2024):**
   - Calcular verbas rescisórias para demissões confirmadas
   - Preparar documentação para demissões
   - Definir cronograma de desligamentos

3. **Médio prazo (até 2026):**
   - Acompanhar decisão FUNCAMP sobre colaboradores FEG
   - Planejar aposentadoria da Maria Quaresma
   - Avaliar necessidade de contratações de substituição

## Observações Importantes

- Todos os colaboradores batem ponto e são registrados conforme legislação
- A associação presta contas ao Ministério Público
- Situação trabalhista declarada como regular pela presidência da associação

---
**Documento gerado automaticamente pelo Sistema de Gestão de Riscos CEGEP**`
  }

  const generateTaxReport = () => {
    const current = mockTaxRisks.filter(risk => risk.status === 'current')
    const overdue = mockTaxRisks.filter(risk => risk.status === 'overdue')
    const highRisk = mockTaxRisks.filter(risk => risk.riskLevel === 'high')
    const totalAmount = mockTaxRisks.reduce((sum, risk) => sum + risk.amount, 0)

    return `# Relatório de Riscos Fiscais - CEGEP

## Data do Relatório
**Gerado em:** ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}

## Resumo Executivo

### Situação Fiscal Geral
- **Total de obrigações/riscos:** ${mockTaxRisks.length}
- **Valor total:** R$ ${totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- **Em situação regular:** ${current.length}
- **Vencidos/em atraso:** ${overdue.length}
- **Alto risco:** ${highRisk.length}

## Detalhamento por Status

### ✅ Obrigações em Dia
${current.map(risk => `
**${risk.description}**
- Valor: R$ ${risk.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- Vencimento: ${new Date(risk.dueDate).toLocaleDateString('pt-BR')}
- Tipo: ${risk.type === 'installment' ? 'Parcelamento' : risk.type === 'debt' ? 'Dívida' : 'Obrigação Fiscal'}
${risk.installmentInfo ? `- Situação do parcelamento: ${risk.installmentInfo.current}/${risk.installmentInfo.total} parcelas` : ''}
${risk.observations ? `- Observações: ${risk.observations}` : ''}
`).join('\n')}

### ❌ Obrigações Vencidas
${overdue.length > 0 ? overdue.map(risk => `
**${risk.description}**
- Valor: R$ ${risk.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- Vencimento: ${new Date(risk.dueDate).toLocaleDateString('pt-BR')} ⚠️
- Tipo: ${risk.type === 'installment' ? 'Parcelamento' : risk.type === 'debt' ? 'Dívida' : 'Obrigação Fiscal'}
${risk.installmentInfo ? `- Situação do parcelamento: ${risk.installmentInfo.current}/${risk.installmentInfo.total} parcelas` : ''}
${risk.observations ? `- Observações: ${risk.observations}` : ''}
`).join('\n') : 'Nenhuma obrigação vencida identificada.'}

## Parcelamentos Ativos

${mockTaxRisks.filter(risk => risk.installmentInfo).map(risk => `
**${risk.description}**
- Parcela atual: ${risk.installmentInfo!.current}/${risk.installmentInfo!.total}
- Valor mensal: R$ ${risk.installmentInfo!.monthlyAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- Parcelas restantes: ${risk.installmentInfo!.total - risk.installmentInfo!.current}
- Valor restante: R$ ${((risk.installmentInfo!.total - risk.installmentInfo!.current) * risk.installmentInfo!.monthlyAmount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
`).join('\n')}

## Análise de Risco

### 🔴 Alto Risco
${highRisk.length > 0 ? highRisk.map(risk => `
- **${risk.description}**: R$ ${risk.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
  Motivo: ${risk.observations || 'Valor elevado ou vencimento crítico'}
`).join('\n') : 'Nenhum item de alto risco identificado.'}

## Cronograma de Vencimentos

${mockTaxRisks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).map(risk => `
**${new Date(risk.dueDate).toLocaleDateString('pt-BR')}** - ${risk.description} - R$ ${risk.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
`).join('\n')}

## Recomendações

### Imediatas
- Regularizar obrigações vencidas para evitar multas e juros
- Acompanhar cronograma de parcelamentos ativos
- Verificar situação junto aos órgãos competentes

### Preventivas
- Criar calendário fiscal com alertas de vencimento
- Manter provisões para obrigações recorrentes
- Revisar regularmente a situação dos parcelamentos

## Observações Importantes

⚠️ **LACUNAS DE INFORMAÇÃO:**
- Consultar situação atual dos parcelamentos junto aos órgãos
- Verificar se existem outras obrigações não catalogadas
- Confirmar valores e datas junto à contabilidade

---
**Documento gerado automaticamente pelo Sistema de Gestão de Riscos CEGEP**`
  }

  const generateCompleteReport = () => {
    return `${generateEmployeeReport()}

---

${generateTaxReport()}`
  }

  useEffect(() => {
    switch (reportType) {
      case 'employees':
        setReportData(generateEmployeeReport())
        break
      case 'tax':
        setReportData(generateTaxReport())
        break
      case 'complete':
        setReportData(generateCompleteReport())
        break
    }
  }, [reportType])

  const downloadReport = () => {
    const blob = new Blob([reportData], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `relatorio-cegep-${reportType}-${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reportData)
    alert('Relatório copiado para a área de transferência!')
  }

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">Gerador de Relatórios</h2>
          <p className="text-gray-600">Selecione o tipo de relatório e visualize ou baixe em formato Markdown</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="complete">Relatório Completo</option>
            <option value="employees">Apenas Riscos Trabalhistas</option>
            <option value="tax">Apenas Riscos Fiscais</option>
          </select>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <FileText size={16} />
            Copiar
          </button>
          <button
            onClick={downloadReport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download size={16} />
            Baixar .md
          </button>
        </div>
      </div>

      {/* Preview do Relatório */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            Preview do Relatório
          </h3>
        </div>
        <div className="p-6">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-lg overflow-x-auto max-h-96">
            {reportData}
          </pre>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 flex items-center gap-2 mb-2">
            <AlertTriangle size={16} />
            Informações Pendentes
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Datas de contratação dos colaboradores</li>
            <li>• Documentação trabalhista completa</li>
            <li>• Situação atual dos parcelamentos fiscais</li>
            <li>• Provisões existentes para passivos</li>
          </ul>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 flex items-center gap-2 mb-2">
            <Calendar size={16} />
            Próximos Passos
          </h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Coletar informações pendentes</li>
            <li>• Calcular verbas rescisórias</li>
            <li>• Acompanhar decisão FUNCAMP</li>
            <li>• Atualizar sistema regularmente</li>
          </ul>
        </div>
      </div>
    </div>
  )
}