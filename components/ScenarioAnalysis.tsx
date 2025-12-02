'use client'

import { useState } from 'react'
import { AlertTriangle, Calendar, DollarSign, Users, CheckCircle, XCircle, Clock, FileText } from 'lucide-react'

interface ScenarioCard {
  title: string
  status: 'confirmed' | 'pending' | 'critical'
  employees: number
  monthlyCost: number
  severancePay?: number
  deadline?: string
  description: string
  risks: string[]
  recommendations: string[]
}

const scenarios: ScenarioCard[] = [
  {
    title: "PROFESSORES - Demissão Confirmada",
    status: "confirmed",
    employees: 16,
    monthlyCost: 21399.83,
    deadline: "15 de Dezembro 2024",
    description: "Todos os 16 professores serão demitidos na data estabelecida. Economia mensal garantida.",
    risks: [
      "Necessário cálculo preciso de verbas rescisórias",
      "Documentação trabalhista completa",
      "Cumprimento de prazos legais"
    ],
    recommendations: [
      "Preparar toda documentação até 10/12",
      "Calcular verbas rescisórias individuais",
      "Comunicar formalmente até 01/12"
    ]
  },
  {
    title: "ADMINISTRATIVOS - Demissão Planejada",
    status: "confirmed", 
    employees: 8,
    monthlyCost: 30252.99,
    severancePay: 200349.91,
    deadline: "Dezembro 2024",
    description: "8 funcionários administrativos serão demitidos. Verbas rescisórias já calculadas.",
    risks: [
      "Alto valor de verbas rescisórias",
      "Perda de conhecimento operacional",
      "Possíveis questionamentos trabalhistas"
    ],
    recommendations: [
      "Provisionar R$ 200.349,91 para rescisões",
      "Documentar processos críticos",
      "Transferir conhecimento antes da demissão"
    ]
  },
  {
    title: "CERTIFICADOS - Decisão Crítica",
    status: "critical",
    employees: 2,
    monthlyCost: 8733.36,
    severancePay: 38915.21,
    deadline: "Decisão imediata",
    description: "Aline (Tesouraria) e Carla (Secretária) são necessárias para emissão de certificados.",
    risks: [
      "Paralização da emissão de certificados",
      "Impacto na credibilidade institucional",
      "Possíveis ações de alunos"
    ],
    recommendations: [
      "Manter até finalizar todos os certificados pendentes",
      "Treinar substitutos ou digitalizar processos",
      "Definir prazo máximo para manutenção"
    ]
  },
  {
    title: "MARIA QUARESMA - Transição 2026",
    status: "pending",
    employees: 1,
    monthlyCost: 5705.11,
    severancePay: 29309.50,
    deadline: "Início de 2026",
    description: "Única analista de RH, próxima da aposentadoria. Essencial para transição.",
    risks: [
      "Única pessoa com conhecimento de RH",
      "Aposentadoria iminente", 
      "Perda total de know-how"
    ],
    recommendations: [
      "Manter até aposentadoria em 2026",
      "Documentar todos os processos de RH",
      "Preparar sucessão ou terceirização"
    ]
  },
  {
    title: "FEG - Aguardando FUNCAMP",
    status: "pending", 
    employees: 5,
    monthlyCost: 8785.61,
    severancePay: 37999.88,
    deadline: "Até início de 2026",
    description: "5 funcionários FEG aguardam decisão da FUNCAMP sobre absorção.",
    risks: [
      "Incerteza até decisão FUNCAMP",
      "Possível demissão em massa",
      "2 funcionários afastados por INSS"
    ],
    recommendations: [
      "Acompanhar negociações FUNCAMP",
      "Provisionar verbas rescisórias",
      "Definir cronograma caso não sejam absorvidos"
    ]
  },
  {
    title: "INSS - Contratos Suspensos",
    status: "pending",
    employees: 3,
    monthlyCost: 0,
    deadline: "Indefinido",
    description: "Darlene (contrato suspenso), Cristiane e Eliane (afastadas por INSS).",
    risks: [
      "Retorno indefinido",
      "Impacto na decisão FUNCAMP",
      "Custos de INSS mantidos"
    ],
    recommendations: [
      "Monitorar status do INSS",
      "Incluir na análise FUNCAMP",
      "Avaliar possibilidade de rescisão por invalidez"
    ]
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return 'border-red-500 bg-red-50'
    case 'critical': return 'border-orange-500 bg-orange-50'
    case 'pending': return 'border-yellow-500 bg-yellow-50'
    default: return 'border-gray-500 bg-gray-50'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'confirmed': return <XCircle className="text-red-600" size={24} />
    case 'critical': return <AlertTriangle className="text-orange-600" size={24} />
    case 'pending': return <Clock className="text-yellow-600" size={24} />
    default: return <CheckCircle className="text-gray-600" size={24} />
  }
}

export default function ScenarioAnalysis() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioCard | null>(null)
  
  const totalEmployees = scenarios.reduce((sum, s) => sum + s.employees, 0)
  const totalMonthlyCost = scenarios.reduce((sum, s) => sum + s.monthlyCost, 0) 
  const totalSeverance = scenarios.reduce((sum, s) => sum + (s.severancePay || 0), 0)
  const confirmedSavings = scenarios.filter(s => s.status === 'confirmed').reduce((sum, s) => sum + s.monthlyCost, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Análise de Cenários CEGEP</h2>
        <p className="text-gray-600">Mapa de riscos e decisões por categoria de funcionários</p>
        <p className="text-sm text-gray-500 mt-2">
          Atualizado em {new Date().toLocaleDateString('pt-BR')} - Base: Documentos oficiais
        </p>
      </div>

      {/* Resumo Executivo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Geral</h3>
          <p className="text-3xl font-bold text-blue-600">{totalEmployees}</p>
          <p className="text-sm text-gray-500">funcionários analisados</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Economia Confirmada</h3>
          <p className="text-3xl font-bold text-red-600">R$ {Math.round(confirmedSavings/1000)}K</p>
          <p className="text-sm text-gray-500">por mês</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Verbas Rescisórias</h3>
          <p className="text-3xl font-bold text-orange-600">R$ {Math.round(totalSeverance/1000)}K</p>
          <p className="text-sm text-gray-500">investimento necessário</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Payback</h3>
          <p className="text-3xl font-bold text-green-600">{Math.round(totalSeverance/confirmedSavings)}</p>
          <p className="text-sm text-gray-500">meses</p>
        </div>
      </div>

      {/* Cenários */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {scenarios.map((scenario, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${getStatusColor(scenario.status)}`}
            onClick={() => setSelectedScenario(scenario)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(scenario.status)}
                <h3 className="font-bold text-gray-900 text-sm">{scenario.title}</h3>
              </div>
              <span className="text-2xl font-bold text-gray-700">{scenario.employees}</span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Custo mensal:</span>
                <span className="font-semibold">R$ {scenario.monthlyCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              {scenario.severancePay && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Verbas rescisórias:</span>
                  <span className="font-semibold text-orange-600">R$ {scenario.severancePay.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              {scenario.deadline && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Prazo:</span>
                  <span className="font-semibold text-red-600">{scenario.deadline}</span>
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-700 mb-3">{scenario.description}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{scenario.risks.length} riscos identificados</span>
              <button className="text-blue-600 text-sm hover:text-blue-800">Ver detalhes →</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalhes */}
      {selectedScenario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedScenario.title}</h2>
              <button
                onClick={() => setSelectedScenario(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Informações Gerais</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Funcionários:</strong> {selectedScenario.employees}</p>
                  <p><strong>Custo mensal:</strong> R$ {selectedScenario.monthlyCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  {selectedScenario.severancePay && (
                    <p><strong>Verbas rescisórias:</strong> R$ {selectedScenario.severancePay.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  )}
                  {selectedScenario.deadline && (
                    <p><strong>Prazo:</strong> {selectedScenario.deadline}</p>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Impacto Financeiro</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Economia anual:</strong> R$ {(selectedScenario.monthlyCost * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  {selectedScenario.severancePay && (
                    <>
                      <p><strong>Payback:</strong> {Math.round(selectedScenario.severancePay / selectedScenario.monthlyCost)} meses</p>
                      <p><strong>ROI anual:</strong> {Math.round(((selectedScenario.monthlyCost * 12) / selectedScenario.severancePay - 1) * 100)}%</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Descrição</h3>
              <p className="text-gray-600">{selectedScenario.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <AlertTriangle size={18} />
                  Riscos Identificados
                </h3>
                <ul className="space-y-2">
                  {selectedScenario.risks.map((risk, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle size={18} />
                  Recomendações
                </h3>
                <ul className="space-y-2">
                  {selectedScenario.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Timeline de Ações */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Calendar className="text-indigo-600" size={24} />
          Cronograma de Decisões Críticas
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
            <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-red-900">URGENTE - Até 01/12/2024</h4>
              <p className="text-red-700">Decisão sobre Aline e Carla: Manter para certificados ou demitir com os demais?</p>
              <p className="text-sm text-red-600">Impacto: R$ 8.733,36/mês + credibilidade institucional</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-orange-900">15 de Dezembro de 2024</h4>
              <p className="text-orange-700">Demissão confirmada: 16 professores + administrativos selecionados</p>
              <p className="text-sm text-orange-600">Economia garantida: R$ 51.652,82/mês</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
            <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-900">Até Janeiro de 2026</h4>
              <p className="text-yellow-700">Resolução FUNCAMP: 5 funcionários FEG serão absorvidos ou demitidos</p>
              <p className="text-sm text-yellow-600">Valor envolvido: R$ 8.785,61/mês</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">4</span>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Início de 2026</h4>
              <p className="text-blue-700">Maria Quaresma: Aposentadoria e sucessão no RH</p>
              <p className="text-sm text-blue-600">Preparar transição de conhecimento e processos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}