'use client'

import { useState } from 'react'
import { PlusCircle, Edit, Trash2, AlertTriangle, Calendar, Receipt } from 'lucide-react'
import { TaxRisk } from '@/types'

const initialTaxRisks: TaxRisk[] = [
  {
    id: '1',
    type: 'installment',
    description: 'PERT - Programa Especial de Regularização Tributária',
    amount: 432961.91,
    dueDate: '2029-01-31',
    status: 'current',
    riskLevel: 'medium',
    installmentInfo: {
      current: 95,
      total: 145,
      monthlyAmount: 9829.85
    },
    observations: 'Parcelamento nº 625278925 - ATIVO (EM DIA) - Negociação: 29/09/2017 - 50 parcelas restantes'
  },
  {
    id: '2',
    type: 'tax_obligation',
    description: 'Saldo Devedor PERT - Contribuições Previdenciárias',
    amount: 432961.91,
    dueDate: '2029-01-31',
    status: 'current',
    riskLevel: 'high',
    observations: 'Valor total do parcelamento - Atualizado em 27/11/2025 - CNPJ: 05.124.602/0001-74'
  },
  {
    id: '3',
    type: 'installment',
    description: 'Últimas Parcelas Pagas PERT (2025)',
    amount: 46838.54,
    dueDate: '2025-11-28',
    status: 'current',
    riskLevel: 'low',
    installmentInfo: {
      current: 5,
      total: 5,
      monthlyAmount: 9367.71
    },
    observations: 'Parcelas 91-95 pagas em 2025 - Valores: R$ 9.539,89 + R$ 9.615,02 + R$ 9.683,11 + R$ 9.754,72 + R$ 9.829,85'
  }
]

const typeLabels = {
  installment: 'Parcelamento',
  debt: 'Dívida',
  tax_obligation: 'Obrigação Fiscal',
  other: 'Outros'
}

const statusLabels = {
  current: 'Em dia',
  overdue: 'Vencido',
  resolved: 'Resolvido'
}

const riskLevelLabels = {
  low: 'Baixo',
  medium: 'Médio',
  high: 'Alto'
}

const getStatusColor = (status: TaxRisk['status']) => {
  switch (status) {
    case 'current': return 'text-green-600 bg-green-100'
    case 'overdue': return 'text-red-600 bg-red-100'
    case 'resolved': return 'text-gray-600 bg-gray-100'
    default: return 'text-blue-600 bg-blue-100'
  }
}

const getRiskColor = (riskLevel: TaxRisk['riskLevel']) => {
  switch (riskLevel) {
    case 'low': return 'text-green-600 bg-green-100'
    case 'medium': return 'text-yellow-600 bg-yellow-100'
    case 'high': return 'text-red-600 bg-red-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

export default function TaxRiskManager() {
  const [taxRisks, setTaxRisks] = useState<TaxRisk[]>(initialTaxRisks)
  const [showForm, setShowForm] = useState(false)
  const [editingRisk, setEditingRisk] = useState<TaxRisk | null>(null)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const [formData, setFormData] = useState({
    type: 'installment' as TaxRisk['type'],
    description: '',
    amount: '',
    dueDate: '',
    status: 'current' as TaxRisk['status'],
    riskLevel: 'medium' as TaxRisk['riskLevel'],
    observations: '',
    installmentCurrent: '',
    installmentTotal: '',
    installmentMonthly: ''
  })

  const filteredRisks = taxRisks.filter(risk => {
    const matchesType = selectedType === 'all' || risk.type === selectedType
    const matchesStatus = selectedStatus === 'all' || risk.status === selectedStatus
    return matchesType && matchesStatus
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const riskData: TaxRisk = {
      id: editingRisk ? editingRisk.id : Date.now().toString(),
      type: formData.type,
      description: formData.description,
      amount: parseFloat(formData.amount),
      dueDate: formData.dueDate,
      status: formData.status,
      riskLevel: formData.riskLevel,
      observations: formData.observations || undefined,
      installmentInfo: formData.type === 'installment' && formData.installmentTotal ? {
        current: parseInt(formData.installmentCurrent),
        total: parseInt(formData.installmentTotal),
        monthlyAmount: parseFloat(formData.installmentMonthly)
      } : undefined
    }

    if (editingRisk) {
      setTaxRisks(taxRisks.map(risk => risk.id === editingRisk.id ? riskData : risk))
    } else {
      setTaxRisks([...taxRisks, riskData])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      type: 'installment',
      description: '',
      amount: '',
      dueDate: '',
      status: 'current',
      riskLevel: 'medium',
      observations: '',
      installmentCurrent: '',
      installmentTotal: '',
      installmentMonthly: ''
    })
    setEditingRisk(null)
    setShowForm(false)
  }

  const handleEdit = (risk: TaxRisk) => {
    setEditingRisk(risk)
    setFormData({
      type: risk.type,
      description: risk.description,
      amount: risk.amount.toString(),
      dueDate: risk.dueDate,
      status: risk.status,
      riskLevel: risk.riskLevel,
      observations: risk.observations || '',
      installmentCurrent: risk.installmentInfo?.current.toString() || '',
      installmentTotal: risk.installmentInfo?.total.toString() || '',
      installmentMonthly: risk.installmentInfo?.monthlyAmount.toString() || ''
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setTaxRisks(taxRisks.filter(risk => risk.id !== id))
  }

  const calculateSummary = () => {
    const current = taxRisks.filter(risk => risk.status === 'current')
    const overdue = taxRisks.filter(risk => risk.status === 'overdue')
    const highRisk = taxRisks.filter(risk => risk.riskLevel === 'high')
    const totalAmount = taxRisks.reduce((sum, risk) => sum + risk.amount, 0)
    
    return {
      currentCount: current.length,
      overdueCount: overdue.length,
      highRiskCount: highRisk.length,
      totalAmount
    }
  }

  const summary = calculateSummary()

  return (
    <div className="space-y-6">
      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="font-semibold text-gray-700">Total</h3>
          <p className="text-2xl font-bold text-blue-600">{taxRisks.length}</p>
          <p className="text-sm text-gray-500">R$ {summary.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="font-semibold text-gray-700">Em Dia</h3>
          <p className="text-2xl font-bold text-green-600">{summary.currentCount}</p>
          <p className="text-sm text-gray-500">Situação regular</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <h3 className="font-semibold text-gray-700">Vencidos</h3>
          <p className="text-2xl font-bold text-red-600">{summary.overdueCount}</p>
          <p className="text-sm text-gray-500">Requer atenção</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
          <h3 className="font-semibold text-gray-700">Alto Risco</h3>
          <p className="text-2xl font-bold text-orange-600">{summary.highRiskCount}</p>
          <p className="text-sm text-gray-500">Prioridade máxima</p>
        </div>
      </div>

      {/* Filtros e Ações */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os tipos</option>
            {Object.entries(typeLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os status</option>
            {Object.entries(statusLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusCircle size={20} />
          Novo Risco Fiscal
        </button>
      </div>

      {/* Lista de Riscos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risco</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRisks.map((risk) => (
                <tr key={risk.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{risk.description}</div>
                    {risk.installmentInfo && (
                      <div className="text-xs text-gray-500">
                        Parcela {risk.installmentInfo.current}/{risk.installmentInfo.total} - 
                        R$ {risk.installmentInfo.monthlyAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                      </div>
                    )}
                    {risk.observations && (
                      <div className="text-xs text-gray-600 mt-1">{risk.observations}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {typeLabels[risk.type]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {risk.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(risk.dueDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(risk.status)}`}>
                      {statusLabels[risk.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(risk.riskLevel)}`}>
                      {riskLevelLabels[risk.riskLevel]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(risk)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(risk.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingRisk ? 'Editar Risco Fiscal' : 'Novo Risco Fiscal'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as TaxRisk['type'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                {Object.entries(typeLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              
              <input
                type="text"
                placeholder="Descrição"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              
              <input
                type="number"
                step="0.01"
                placeholder="Valor"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as TaxRisk['status'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                {Object.entries(statusLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              
              <select
                value={formData.riskLevel}
                onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value as TaxRisk['riskLevel'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                {Object.entries(riskLevelLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>

              {formData.type === 'installment' && (
                <div className="space-y-2 border-t pt-4">
                  <h3 className="font-medium text-gray-700">Informações do Parcelamento</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      placeholder="Parcela atual"
                      value={formData.installmentCurrent}
                      onChange={(e) => setFormData({ ...formData, installmentCurrent: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Total parcelas"
                      value={formData.installmentTotal}
                      onChange={(e) => setFormData({ ...formData, installmentTotal: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Valor mensal"
                      value={formData.installmentMonthly}
                      onChange={(e) => setFormData({ ...formData, installmentMonthly: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
              
              <textarea
                placeholder="Observações"
                value={formData.observations}
                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  {editingRisk ? 'Atualizar' : 'Salvar'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}