'use client'

import { useState, useEffect } from 'react'
import { Download, FileText, Calendar, AlertTriangle, DollarSign, Users, TrendingDown, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Employee, TaxRisk } from '@/types'

export default function ReportGenerator() {
  const [reportType, setReportType] = useState<'complete' | 'employees' | 'tax'>('complete')
  const [reportData, setReportData] = useState('')
  
  // Mock data - em produção, isso viria do estado global ou context
  const mockEmployees: Employee[] = [
    // PROFESSORES (16 total)
    { id: '1', name: 'Adelino Bortolto Filho', position: 'Professor de Administração', salary: 2535.50, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '2', name: 'Antonio de Pádua Lelis Scanavachi', position: 'Professor de Seg. do Trabalho', salary: 1247.61, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '3', name: 'Bibiano Francisco Eloi Junior', position: 'Professor de Administração', salary: 1671.21, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '4', name: 'Carlos Eduardo de Oliveira', position: 'Professor de Eletrônica', salary: 2451.80, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '5', name: 'Denison Xavier', position: 'Professor de Eletrônica', salary: 1571.21, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '6', name: 'Eriel Fernando dos Santos', position: 'Professor', salary: 1467.02, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '7', name: 'Frederico Gomes Rodrigues', position: 'Professor de Edificações', salary: 1904.77, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '8', name: 'Guilherme Magano Lanza', position: 'Professor', salary: 1467.02, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '9', name: 'Igor Vespucci Laurindo', position: 'Professor de Edificações', salary: 1029.20, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '10', name: 'Iauê Peduto Conceição', position: 'Professor de Edificações', salary: 1014.09, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '11', name: 'João Paulo Gomes Diplom', position: 'Professor de Seg. do Trabalho', salary: 1659.53, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '12', name: 'Luis Henrique de Campos', position: 'Professor d Eletrônica', salary: 2429.20, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '13', name: 'Luiz Donizeti Duarte', position: 'Professor de Edificações', salary: 1587.02, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '14', name: 'Manuel Rodrigues', position: 'Professor de Administração', salary: 780.59, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '15', name: 'Rafaela Nunes Ferreira', position: 'Professora de Administração', salary: 1014.09, hireDate: '', category: 'professor', status: 'dismissed_december' },
    { id: '16', name: 'Tristana Cezaretto', position: 'Professora de Psicologia', salary: 1467.02, hireDate: '', category: 'professor', status: 'dismissed_december' },
    
    // ADMINISTRATIVOS
    { id: '17', name: 'Maria do Carmo Quaresma Antonio', position: 'Analista de Recursos Humanos', salary: 5705.11, hireDate: '', category: 'maintain', status: 'maintain_2026' },
    { id: '18', name: 'Aline da Silva Vieiosa', position: 'Auxiliar de Serviços Gerais', salary: 4118.50, hireDate: '', category: 'feg', status: 'funcamp_pending' },
    { id: '19', name: 'Bruno Ferreira dos Santos', position: 'Oficial Administrativo Pleno', salary: 2754.73, hireDate: '', category: 'feg', status: 'funcamp_pending' },
    { id: '20', name: 'Darlene da Silva Vieira', position: 'Oficial Administrativo Pleno', salary: 0, hireDate: '', category: 'inss', status: 'inss_leave', observations: 'Contrato suspenso' },
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
    },
    {
      id: '2',
      type: 'tax_obligation',
      description: 'IRRF - Retenções Pendentes',
      amount: 12500.00,
      dueDate: '2024-12-20',
      status: 'overdue',
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
    return `# Relatório Executivo CEGEP - ${new Date().toLocaleDateString('pt-BR')}

## Resumo Executivo

### 📊 Situação dos Colaboradores
- **Total:** ${analytics.employees.total} colaboradores
- **Demissões confirmadas:** ${analytics.employees.dismissed} (15/12/2024)
- **Economia mensal:** R$ ${analytics.employees.totalSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

### 💰 Situação Fiscal
- **Riscos identificados:** ${analytics.tax.total}
- **Valor total:** R$ ${analytics.tax.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- **Vencidos:** R$ ${analytics.tax.overdueAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

### ⚠️ Ações Prioritárias
1. Finalizar demissões programadas para dezembro
2. Aguardar decisão FUNCAMP sobre ${analytics.employees.pending} colaboradores
3. Regularizar obrigações fiscais vencidas
4. Coletar informações pendentes para cálculo de verbas rescisórias

---
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