'use client'

import { useState, useEffect } from 'react'
import { Download, FileText, Calendar, AlertTriangle, DollarSign, Users, TrendingDown, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Employee, TaxRisk } from '@/types'

export default function ReportGenerator() {
  const [reportType, setReportType] = useState<'complete' | 'employees' | 'tax'>('complete')
  const [reportData, setReportData] = useState('')
  
  // Dados reais dos documentos oficiais CEGEP - Atualizado conforme decisão
  const mockEmployees: Employee[] = [
    // DEMISSÕES CONFIRMADAS - 15 DE DEZEMBRO (14 colaboradores)
    { id: '1', name: 'Ademar de Oliveira Viotto', position: 'Trabalhador da Manutenção', salary: 4427.00, hireDate: '27/07/2020', category: 'administrative', status: 'dismissed_december', severancePay: 21422.87 },
    { id: '2', name: 'Aline da Silva Barbosa', position: 'Auxiliar de Tesouraria', salary: 4118.51, hireDate: '03/10/2019', category: 'administrative', status: 'dismissed_december', severancePay: 13960.11 },
    { id: '3', name: 'Amilton Fernando Lourenço', position: 'Trabalhador da Manutenção', salary: 4427.00, hireDate: '01/08/2013', category: 'administrative', status: 'dismissed_december', severancePay: 26180.04 },
    { id: '4', name: 'Carla Regina Bruno', position: 'Secretária Acadêmica', salary: 4614.85, hireDate: '20/01/2021', category: 'administrative', status: 'dismissed_december', severancePay: 24955.10 },
    { id: '5', name: 'Evandro Ricardo Sabino de Souza', position: 'Inspetor de Alunos', salary: 2479.97, hireDate: '02/02/2004', category: 'administrative', status: 'dismissed_december', severancePay: 18690.19 },
    { id: '6', name: 'Fátima Helena Cheregati', position: 'Auxiliar de Serviços Gerais', salary: 1980.26, hireDate: '17/11/2017', category: 'administrative', status: 'dismissed_december', severancePay: 9914.13 },
    { id: '7', name: 'Henrique Francisco Seixas', position: 'Assessor Jurídico', salary: 5677.64, hireDate: '10/04/2021', category: 'administrative', status: 'dismissed_december', severancePay: 29172.34 },
    { id: '8', name: 'Juliano Luiz do Amaral', position: 'Assistente de T.I.', salary: 4960.96, hireDate: '10/03/2011', category: 'administrative', status: 'dismissed_december', severancePay: 32061.98 },
    { id: '9', name: 'Maria do Carmo da Conceição Marques', position: 'Auxiliar de Serviços Gerais', salary: 1980.26, hireDate: '20/10/2006', category: 'administrative', status: 'dismissed_december', severancePay: 12394.83 },
    { id: '10', name: 'Vera Lucia Pereira da Silva', position: 'Auxiliar de Serviços Gerais', salary: 1980.26, hireDate: '15/08/2011', category: 'administrative', status: 'dismissed_december', severancePay: 11598.32 },
    { id: '11', name: 'Bruno Ferreira dos Santos', position: 'Oficial Administrativo Pleno', salary: 2754.73, hireDate: '02/05/2018', category: 'administrative', status: 'dismissed_december', severancePay: 15587.12 },
    { id: '12', name: 'Josue Benedito', position: 'Auxiliar de Compras Pleno', salary: 3857.57, hireDate: '07/08/2024', category: 'administrative', status: 'dismissed_december', severancePay: 12344.37 },
    { id: '13', name: 'Joyce Isis Jordão Anequini', position: 'Oficial Administrativo Júnior', salary: 2173.31, hireDate: '09/08/2024', category: 'administrative', status: 'dismissed_december', severancePay: 10068.39 },
    { id: '14', name: 'Cristiane Rodrigues de Oliveira', position: 'Auxiliar de Serviços Gerais', salary: 0, hireDate: '05/09/2022', category: 'administrative', status: 'dismissed_december', observations: 'INSS - Demissão 15/12/2024' },
    
    // COLABORADORES MANTIDOS ATÉ 2026 (2 essenciais)
    { id: '15', name: 'Maria do Carmo Quaresma Antonio', position: 'Analista de R.H.', salary: 5705.11, hireDate: '07/04/2021', category: 'maintain', status: 'maintain_2026', severancePay: 29309.50 },
    { id: '16', name: 'Eliane Cristina Moraes Santangelo', position: 'Auxiliar de Serviços Gerais', salary: 0, hireDate: '05/09/2022', category: 'maintain', status: 'maintain_2026', observations: 'INSS - Manter para atividades essenciais' },
    
    // AFASTADO INSS - Contrato suspenso
    { id: '17', name: 'Darlene da Silva Vieira', position: 'Oficial Administrativo Pleno', salary: 0, hireDate: '10/07/2012', category: 'inss', status: 'inss_leave', observations: 'Contrato suspenso pelo INSS' },
  ]
  
  // Dados reais do extrato PERT oficial
  const mockTaxRisks: TaxRisk[] = [
    {
      id: '1',
      type: 'installment',
      description: 'PERT - Programa Especial de Regularização Tributária',
      amount: 432961.91,
      dueDate: '2029-01-31',
      status: 'current',
      riskLevel: 'medium',
      installmentInfo: { current: 95, total: 145, monthlyAmount: 9829.85 }
    },
    {
      id: '2',
      type: 'tax_obligation',
      description: 'Saldo Devedor PERT - Contribuições Previdenciárias',
      amount: 432961.91,
      dueDate: '2029-01-31',
      status: 'current',
      riskLevel: 'high'
    }
  ]

  const calculateAnalytics = () => {
    const dismissed = mockEmployees.filter(emp => emp.status === 'dismissed_december')
    const pending = mockEmployees.filter(emp => emp.status === 'funcamp_pending')
    const maintain = mockEmployees.filter(emp => emp.status === 'maintain_2026')
    const inss = mockEmployees.filter(emp => emp.status === 'inss_leave')
    
    const dismissedTotal = dismissed.reduce((sum, emp) => sum + emp.salary, 0)
    const pendingTotal = pending.reduce((sum, emp) => sum + emp.salary, 0)
    const maintainTotal = maintain.reduce((sum, emp) => sum + emp.salary, 0)
    
    const totalTaxRisk = mockTaxRisks.reduce((sum, risk) => sum + risk.amount, 0)
    const overdueTax = mockTaxRisks.filter(risk => risk.status === 'overdue').reduce((sum, risk) => sum + risk.amount, 0)
    
    return {
      employees: {
        total: mockEmployees.length,
        dismissed: dismissed.length,
        pending: pending.length,
        maintain: maintain.length,
        inss: inss.length,
        dismissedTotal,
        pendingTotal,
        maintainTotal,
        totalSavings: dismissedTotal + pendingTotal
      },
      tax: {
        total: mockTaxRisks.length,
        totalAmount: totalTaxRisk,
        overdueAmount: overdueTax,
        currentAmount: totalTaxRisk - overdueTax,
        highRisk: mockTaxRisks.filter(risk => risk.riskLevel === 'high').length
      }
    }
  }

  const analytics = calculateAnalytics()

  const generateMarkdownReport = () => {
    const totalSeverance = mockEmployees
      .filter(emp => emp.severancePay)
      .reduce((sum, emp) => sum + (emp.severancePay || 0), 0)
    
    const dismissedEmployees = mockEmployees.filter(emp => emp.status === 'dismissed_december')
    const maintainEmployees = mockEmployees.filter(emp => emp.status === 'maintain_2026')
    const inssEmployees = mockEmployees.filter(emp => emp.status === 'inss_leave')
    
    const totalMonthlySalary = dismissedEmployees.reduce((sum, emp) => sum + emp.salary, 0)
    
    return `# Relatório Executivo CEGEP - ${new Date().toLocaleDateString('pt-BR')}
**CNPJ:** 05.124.602/0001-74 - CENTRO GUAÇUANO DE EDUCAÇÃO PROFISSIONAL

## Resumo Executivo

### 📊 Situação dos Colaboradores (Dados Oficiais)
- **Total de colaboradores analisados:** ${analytics.employees.total}
- **Demissões confirmadas 15/12/2024:** ${dismissedEmployees.length} funcionários
- **Economia mensal:** R$ ${totalMonthlySalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- **Total de verbas rescisórias:** R$ ${totalSeverance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- **Colaboradores mantidos até 2026:** ${maintainEmployees.length}
- **Afastados INSS:** ${inssEmployees.length}

### 💰 Situação Fiscal (PERT Oficial)
- **Parcelamento PERT nº:** 625278925
- **Saldo devedor:** R$ ${analytics.tax.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- **Parcelas pagas:** 95 de 145 (66% concluído)
- **Parcelas restantes:** 50
- **Valor mensal:** R$ 9.829,85
- **Status:** ATIVO (EM DIA)
- **Previsão término:** Janeiro/2029

### 📅 Cronograma Atualizado
1. **15 Dezembro 2024:** 
   - Demissão de 14 colaboradores
   - Pagamento de R$ ${totalSeverance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} em verbas rescisórias
   
2. **2025-2026:** 
   - Manter 2 colaboradores essenciais (Maria Quaresma + Eliane)
   - Planejar aposentadoria da Maria Quaresma
   - Monitorar situação dos afastados INSS
   
3. **2029:** 
   - Conclusão do parcelamento PERT
   - Regularização fiscal completa

### 📉 Impacto Financeiro Anual
- **Economia com demissões:** R$ ${(totalMonthlySalary * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- **Investimento em verbas:** R$ ${totalSeverance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- **Payback:** ${Math.round(totalSeverance / totalMonthlySalary)} meses
- **ROI anual:** ${Math.round((totalMonthlySalary * 12) / totalSeverance * 100)}%

### 🗓️ Detalhamento das Demissões (15/12/2024)

**Administrativa CEGEP (10):**
- Ademar de Oliveira Viotto - R$ 21.422,87
- Aline da Silva Barbosa - R$ 13.960,11
- Amilton Fernando Lourenço - R$ 26.180,04
- Carla Regina Bruno - R$ 24.955,10
- Evandro Ricardo Sabino - R$ 18.690,19
- Fátima Helena Cheregati - R$ 9.914,13
- Henrique Francisco Seixas - R$ 29.172,34
- Juliano Luiz do Amaral - R$ 32.061,98
- Maria do Carmo da C. Marques - R$ 12.394,83
- Vera Lucia Pereira da Silva - R$ 11.598,32

**Ex-FEG (4):**
- Bruno Ferreira dos Santos - R$ 15.587,12
- Josue Benedito - R$ 12.344,37
- Joyce Isis Jordão - R$ 10.068,39
- Cristiane Rodrigues (INSS) - Em análise

### ⚠️ Pontos de Atenção
- **Maria Quaresma:** Única analista RH - aposentadoria iminente
- **Eliane:** Manter para continuidade operacional
- **Darlene:** Contrato suspenso - acompanhar retorno
- **Parcelamento PERT:** 50 parcelas x R$ 9.829,85 = R$ 491.492,50 restantes

---
**Documento baseado em:**
- Relação oficial de Funcionários ADM
- Extrato PERT 625278925 (27/11/2025)
- Decisão executiva: 14 demissões em 15/12/2024

Relatório gerado automaticamente em ${new Date().toLocaleString('pt-BR')}`
  }

  const downloadReport = () => {
    const report = generateMarkdownReport()
    const blob = new Blob([report], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `relatorio-executivo-cegep-${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    const report = generateMarkdownReport()
    navigator.clipboard.writeText(report)
    alert('Relatório copiado para a área de transferência!')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Executivo</h2>
          <p className="text-gray-600 mt-1">Análise completa dos riscos trabalhistas e fiscais</p>
          <p className="text-sm text-gray-500">Última atualização: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FileText size={16} />
            Copiar
          </button>
          <button
            onClick={downloadReport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download size={16} />
            Exportar .md
          </button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Demissões Dezembro</p>
              <p className="text-3xl font-bold">{analytics.employees.dismissed}</p>
              <p className="text-red-100 text-sm">R$ {analytics.employees.dismissedTotal.toLocaleString('pt-BR')}/mês</p>
            </div>
            <TrendingDown className="text-red-200" size={32} />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">FUNCAMP Pendente</p>
              <p className="text-3xl font-bold">{analytics.employees.pending}</p>
              <p className="text-yellow-100 text-sm">R$ {analytics.employees.pendingTotal.toLocaleString('pt-BR')}/mês</p>
            </div>
            <Clock className="text-yellow-200" size={32} />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Economia Total</p>
              <p className="text-3xl font-bold">R$ {Math.round(analytics.employees.totalSavings/1000)}K</p>
              <p className="text-green-100 text-sm">{analytics.employees.dismissed + analytics.employees.pending} colaboradores</p>
            </div>
            <TrendingUp className="text-green-200" size={32} />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Risco Fiscal</p>
              <p className="text-3xl font-bold">R$ {Math.round(analytics.tax.totalAmount/1000)}K</p>
              <p className="text-purple-100 text-sm">{analytics.tax.total} obrigações</p>
            </div>
            <AlertTriangle className="text-purple-200" size={32} />
          </div>
        </div>
      </div>

      {/* Análise Detalhada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Riscos Trabalhistas */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="text-blue-600" size={24} />
            Análise Trabalhista
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-3">
                <XCircle className="text-red-600" size={20} />
                <span className="font-medium text-red-900">Demissões Confirmadas</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600">{analytics.employees.dismissed}</p>
                <p className="text-sm text-red-500">15 dezembro</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                <Clock className="text-yellow-600" size={20} />
                <span className="font-medium text-yellow-900">Decisão Pendente</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-yellow-600">{analytics.employees.pending}</p>
                <p className="text-sm text-yellow-500">FUNCAMP</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" size={20} />
                <span className="font-medium text-green-900">Manter até 2026</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">{analytics.employees.maintain}</p>
                <p className="text-sm text-green-500">Essenciais</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <Users className="text-gray-600" size={20} />
                <span className="font-medium text-gray-900">Afastados INSS</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-600">{analytics.employees.inss}</p>
                <p className="text-sm text-gray-500">Licença</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Impacto Financeiro</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-700">Economia Mensal:</p>
                <p className="font-bold text-blue-900">R$ {analytics.employees.totalSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-blue-700">Economia Anual:</p>
                <p className="font-bold text-blue-900">R$ {(analytics.employees.totalSavings * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Riscos Fiscais */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <DollarSign className="text-green-600" size={24} />
            Análise Fiscal
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" size={20} />
                <span className="font-medium text-green-900">Em Situação Regular</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">R$ {analytics.tax.currentAmount.toLocaleString('pt-BR')}</p>
                <p className="text-sm text-green-500">Em dia</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-red-600" size={20} />
                <span className="font-medium text-red-900">Obrigações Vencidas</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600">R$ {analytics.tax.overdueAmount.toLocaleString('pt-BR')}</p>
                <p className="text-sm text-red-500">Urgente</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-orange-600" size={20} />
                <span className="font-medium text-orange-900">Alto Risco</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-orange-600">{analytics.tax.highRisk}</p>
                <p className="text-sm text-orange-500">Itens</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">Status dos Parcelamentos</h4>
            <div className="space-y-2">
              {mockTaxRisks.filter(risk => risk.installmentInfo).map(risk => (
                <div key={risk.id} className="flex justify-between items-center">
                  <span className="text-sm text-purple-700">{risk.description.split(' ')[0]}</span>
                  <div className="text-sm">
                    <span className="font-medium text-purple-900">{risk.installmentInfo!.current}/{risk.installmentInfo!.total}</span>
                    <span className="text-purple-600 ml-2">({Math.round((risk.installmentInfo!.current / risk.installmentInfo!.total) * 100)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline de Ações */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Calendar className="text-indigo-600" size={24} />
          Cronograma de Ações Prioritárias
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">1</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-red-900">15 de Dezembro de 2024</h4>
              <p className="text-red-700">Demissão de {analytics.employees.dismissed} colaboradores (professores e administrativos)</p>
              <p className="text-sm text-red-600">Economia: R$ {analytics.employees.dismissedTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-900">Até Janeiro de 2026</h4>
              <p className="text-yellow-700">Aguardar decisão FUNCAMP sobre absorção de {analytics.employees.pending} colaboradores FEG</p>
              <p className="text-sm text-yellow-600">Valor envolvido: R$ {analytics.employees.pendingTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">3</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Imediatamente</h4>
              <p className="text-blue-700">Coletar informações pendentes: datas de contratação, documentação trabalhista</p>
              <p className="text-sm text-blue-600">Necessário para cálculo preciso de verbas rescisórias</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">4</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-purple-900">Regularização Fiscal</h4>
              <p className="text-purple-700">Resolver obrigações vencidas no valor de R$ {analytics.tax.overdueAmount.toLocaleString('pt-BR')}</p>
              <p className="text-sm text-purple-600">Evitar multas e juros adicionais</p>
            </div>
          </div>
        </div>
      </div>

      {/* Informações Complementares */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h4 className="font-semibold text-amber-900 flex items-center gap-2 mb-4">
            <AlertTriangle size={20} className="text-amber-600" />
            Informações Pendentes
          </h4>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>• Datas de contratação de todos os colaboradores</li>
            <li>• Documentação trabalhista completa</li>
            <li>• Situação atual dos parcelamentos fiscais</li>
            <li>• Data prevista de aposentadoria - Maria Quaresma</li>
            <li>• Provisões existentes para passivo trabalhista</li>
          </ul>
        </div>
        
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <h4 className="font-semibold text-emerald-900 flex items-center gap-2 mb-4">
            <CheckCircle size={20} className="text-emerald-600" />
            Status Confirmado
          </h4>
          <ul className="space-y-2 text-sm text-emerald-800">
            <li>• Colaboradores registrados conforme CLT</li>
            <li>• Prestação de contas regular ao MP</li>
            <li>• Controle de ponto implementado</li>
            <li>• Pagamentos em dia (declarado pela presidência)</li>
            <li>• Sistema de gestão de riscos operacional</li>
          </ul>
        </div>
      </div>
    </div>
  )
}