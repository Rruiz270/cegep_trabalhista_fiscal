'use client'

import { useState } from 'react'
import { AlertTriangle, Calculator, DollarSign, FileText, TrendingUp, TrendingDown, Info } from 'lucide-react'

interface RiskMetric {
  title: string
  value: string | number
  risk: 'low' | 'medium' | 'high'
  description: string
  recommendation: string
}

const riskMetrics: RiskMetric[] = [
  {
    title: "Passivo Trabalhista Total",
    value: "R$ 267.659,29",
    risk: "high",
    description: "Verbas rescisórias calculadas para 14 funcionários que serão demitidos na aquisição",
    recommendation: "Provisionar valor integral para cumprimento das obrigações trabalhistas"
  },
  {
    title: "PERT - Saldo Devedor",
    value: "R$ 432.961,91",
    risk: "medium", 
    description: "50 parcelas restantes do parcelamento previdenciário. Ativo e em dia.",
    recommendation: "Avaliar pagamento à vista vs. manutenção do parcelamento"
  },
  {
    title: "Funcionários em Transição",
    value: "7 pessoas",
    risk: "medium",
    description: "Maria Quaresma (manter até 2026) + 2 decisões pendentes (certificados) + 1 INSS + 3 FEG",
    recommendation: "Definir estratégia individual para cada colaborador"
  },
  {
    title: "Adequação Regulatória",
    value: "Controlado",
    risk: "medium",
    description: "Entidade sem fins lucrativos com prestação de contas ao MP em dia. Transição planejada.",
    recommendation: "Acompanhar processo de adequação durante a transição"
  }
]

export default function RiskAssessment() {
  const [selectedMetric, setSelectedMetric] = useState<RiskMetric | null>(null)
  const [showPERTAnalysis, setShowPERTAnalysis] = useState(false)

  // Cálculo do pagamento à vista do PERT
  const pertBalance = 432961.91
  const remainingInstallments = 50
  const monthlyInstallment = 9829.85
  const totalIfContinuing = remainingInstallments * monthlyInstallment
  const potentialSavings = totalIfContinuing - pertBalance

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'border-green-500 bg-green-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'high': return 'border-red-500 bg-red-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <TrendingDown className="text-green-600" size={24} />
      case 'medium': return <AlertTriangle className="text-yellow-600" size={24} />
      case 'high': return <TrendingUp className="text-red-600" size={24} />
      default: return <Info className="text-gray-600" size={24} />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Análise de Riscos - Aquisição CEGEP</h2>
        <p className="text-gray-600">Avaliação de passivos e riscos para aquisição da entidade sem fins lucrativos</p>
        <p className="text-sm text-gray-500 mt-2">
          Base: Documentos oficiais | Atualizado em {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>

      {/* Resumo de Riscos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {riskMetrics.map((metric, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${getRiskColor(metric.risk)}`}
            onClick={() => setSelectedMetric(metric)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getRiskIcon(metric.risk)}
                <h3 className="font-bold text-gray-900 text-sm">{metric.title}</h3>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
              <p className="text-sm text-gray-600 mt-2">{metric.description}</p>
            </div>
            
            <button className="text-blue-600 text-sm hover:text-blue-800">Ver detalhes →</button>
          </div>
        ))}
      </div>

      {/* Análise PERT Detalhada */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Calculator className="text-blue-600" size={24} />
            Análise PERT - Pagamento à Vista vs. Parcelamento
          </h3>
          <button
            onClick={() => setShowPERTAnalysis(!showPERTAnalysis)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {showPERTAnalysis ? 'Ocultar' : 'Ver'} Cálculos
          </button>
        </div>

        {showPERTAnalysis && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-4">Cenário 1: Manter Parcelamento</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>50 parcelas restantes:</span>
                  <span className="font-semibold">R$ {monthlyInstallment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</span>
                </div>
                <div className="flex justify-between">
                  <span>Total a pagar:</span>
                  <span className="font-semibold text-blue-700">R$ {totalIfContinuing.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Prazo:</span>
                  <span>Janeiro 2029</span>
                </div>
                <div className="mt-4 p-3 bg-white rounded border">
                  <p className="text-xs text-gray-600">
                    <strong>Riscos:</strong> Inflação, mudanças na legislação, obrigações mensais por 4 anos
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-4">Cenário 2: Pagamento à Vista</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Saldo devedor atual:</span>
                  <span className="font-semibold">R$ {pertBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Possível desconto:</span>
                  <span className="text-green-600">A negociar</span>
                </div>
                <div className="flex justify-between">
                  <span>Economia potencial:</span>
                  <span className="font-semibold text-green-700">R$ {potentialSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Liberação:</span>
                  <span>Imediata</span>
                </div>
                <div className="mt-4 p-3 bg-white rounded border">
                  <p className="text-xs text-gray-600">
                    <strong>Vantagens:</strong> Economia de juros, liberdade de obrigações, simplificação
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <h5 className="font-semibold text-amber-900 mb-2">Recomendação</h5>
          <p className="text-sm text-amber-800">
            Negociar desconto para pagamento à vista junto à Receita Federal. A economia potencial de 
            R$ {potentialSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} justifica a análise. 
            Considerar também o benefício de eliminar a obrigação mensal e riscos futuros.
          </p>
        </div>
      </div>

      {/* Matriz de Riscos */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <FileText className="text-indigo-600" size={24} />
          Matriz de Riscos da Aquisição
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-orange-700">Pontos de Atenção</h4>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded border border-orange-200">
                <h5 className="font-medium text-orange-900">Passivos Trabalhistas</h5>
                <p className="text-sm text-orange-700">R$ 267.659,29 em verbas rescisórias identificadas</p>
              </div>
              <div className="p-3 bg-orange-50 rounded border border-orange-200">
                <h5 className="font-medium text-orange-900">Adequação Regulatória</h5>
                <p className="text-sm text-orange-700">Processo de transição da estrutura jurídica</p>
              </div>
              <div className="p-3 bg-orange-50 rounded border border-orange-200">
                <h5 className="font-medium text-orange-900">Due Diligence</h5>
                <p className="text-sm text-orange-700">Levantamento completo em andamento</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-blue-700">Decisões Estratégicas</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <h5 className="font-medium text-blue-900">PERT</h5>
                <p className="text-sm text-blue-700">R$ 432.961,91 - Avaliar pagamento à vista</p>
              </div>
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <h5 className="font-medium text-blue-900">Transição RH</h5>
                <p className="text-sm text-blue-700">7 funcionários para definição estratégica</p>
              </div>
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <h5 className="font-medium text-blue-900">Certificações</h5>
                <p className="text-sm text-blue-700">Planejar continuidade operacional</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-green-700">Situação Favorável</h4>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded border border-green-200">
                <h5 className="font-medium text-green-900">Situação Fiscal</h5>
                <p className="text-sm text-green-700">PERT em dia, sem pendências ativas</p>
              </div>
              <div className="p-3 bg-green-50 rounded border border-green-200">
                <h5 className="font-medium text-green-900">Documentação</h5>
                <p className="text-sm text-green-700">Controles trabalhistas atualizados</p>
              </div>
              <div className="p-3 bg-green-50 rounded border border-green-200">
                <h5 className="font-medium text-green-900">Prestação de Contas</h5>
                <p className="text-sm text-green-700">Regular ao Ministério Público</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cronograma de Adequações */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Cronograma de Adequações Pós-Aquisição</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 border-l-4 border-red-500 bg-red-50">
            <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-red-900">Imediato - Provisão de Recursos</h4>
              <p className="text-red-700">Garantir R$ 267.659,29 para verbas rescisórias + análise PERT</p>
              <p className="text-sm text-red-600">Crítico para cumprimento das obrigações trabalhistas</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 border-l-4 border-yellow-500 bg-yellow-50">
            <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-900">Primeira Semana - Due Diligence Completa</h4>
              <p className="text-yellow-700">Auditoria de todos os passivos, contratos e obrigações regulatórias</p>
              <p className="text-sm text-yellow-600">Incluir análise de adequação à nova natureza jurídica</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 border-l-4 border-blue-500 bg-blue-50">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">30 Dias - Reestruturação Organizacional</h4>
              <p className="text-blue-700">Implementar nova estrutura, definir funcionários-chave, adequar processos</p>
              <p className="text-sm text-blue-600">Focar na continuidade operacional durante a transição</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedMetric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedMetric.title}</h2>
              <button
                onClick={() => setSelectedMetric(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-gray-800 mb-2">{selectedMetric.value}</p>
                <p className="text-gray-600">{selectedMetric.description}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Recomendação</h3>
                <p className="text-sm text-gray-600">{selectedMetric.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}