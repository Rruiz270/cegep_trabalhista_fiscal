'use client'

import { useState, useEffect } from 'react'
import { PlusCircle, Edit, Trash2, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { Employee } from '@/types'

const initialEmployees: Employee[] = [
  // Professores
  { id: '1', name: 'Adelino Bortolto Filho', position: 'Professor de Administração', salary: 2535.50, hireDate: '', category: 'professor', status: 'dismissed_december' },
  { id: '2', name: 'Antonio de Pádua Lelis Scanavachi', position: 'Professor de Seg. do Trabalho', salary: 1247.61, hireDate: '', category: 'professor', status: 'dismissed_december' },
  { id: '3', name: 'Bibiano Francisco Eloi Junior', position: 'Professor de Administração', salary: 1671.21, hireDate: '', category: 'professor', status: 'dismissed_december' },
  
  // Administrativos - Demissão Dezembro
  { id: '11', name: 'Ademar de Oliveira Vielto', position: 'Trabalhador da Manutenção', salary: 4427.00, hireDate: '', category: 'administrative', status: 'dismissed_december' },
  { id: '12', name: 'Armilton Fernando Lourenço', position: 'Trabalhador da Manutenção', salary: 4427.00, hireDate: '', category: 'administrative', status: 'dismissed_december' },
  
  // FEG - Pendente FUNCAMP
  { id: '21', name: 'Aline da Silva Vieiosa', position: 'Auxiliar de Serviços Gerais', salary: 4118.50, hireDate: '', category: 'feg', status: 'funcamp_pending' },
  { id: '22', name: 'Bruno Ferreira dos Santos', position: 'Oficial Administrativo Pleno', salary: 2754.73, hireDate: '', category: 'feg', status: 'funcamp_pending' },
  
  // INSS - Afastados
  { id: '31', name: 'Darlene da Silva Vieira', position: 'Oficial Administrativo Pleno', salary: 0, hireDate: '', category: 'inss', status: 'inss_leave', observations: 'Contrato suspenso' },
  { id: '32', name: 'Eliane Cristina Moraes Santangelo', position: 'Auxiliar de Serviços Gerais', salary: 0, hireDate: '', category: 'inss', status: 'inss_leave', observations: 'INSS' },
  
  // Manter até 2026
  { id: '41', name: 'Maria do Carmo Quaresma Antonio', position: 'Analista de Recursos Humanos', salary: 5705.11, hireDate: '', category: 'maintain', status: 'maintain_2026', observations: 'Aposentadoria próxima' },
  { id: '42', name: 'Vera Lucia Pereira da Silva', position: 'Auxiliar de Serviços Gerais', salary: 1980.26, hireDate: '', category: 'maintain', status: 'maintain_2026' },
]

const categoryLabels = {
  professor: 'Professor',
  administrative: 'Administrativo',
  feg: 'FEG',
  inss: 'INSS',
  maintain: 'Manter'
}

const statusLabels = {
  active: 'Ativo',
  dismissed_december: 'Demissão Dezembro',
  funcamp_pending: 'FUNCAMP Pendente',
  inss_leave: 'Afastado INSS',
  maintain_2026: 'Manter até 2026'
}

const getStatusColor = (status: Employee['status']) => {
  switch (status) {
    case 'dismissed_december': return 'text-red-600 bg-red-100'
    case 'funcamp_pending': return 'text-yellow-600 bg-yellow-100'
    case 'inss_leave': return 'text-gray-600 bg-gray-100'
    case 'maintain_2026': return 'text-green-600 bg-green-100'
    default: return 'text-blue-600 bg-blue-100'
  }
}

export default function EmployeeManager() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [showForm, setShowForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    salary: '',
    hireDate: '',
    category: 'professor' as Employee['category'],
    status: 'active' as Employee['status'],
    observations: ''
  })

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || employee.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const employeeData = {
      ...formData,
      id: editingEmployee ? editingEmployee.id : Date.now().toString(),
      salary: parseFloat(formData.salary),
    }

    if (editingEmployee) {
      setEmployees(employees.map(emp => emp.id === editingEmployee.id ? employeeData : emp))
    } else {
      setEmployees([...employees, employeeData])
    }

    setFormData({
      name: '',
      position: '',
      salary: '',
      hireDate: '',
      category: 'professor',
      status: 'active',
      observations: ''
    })
    setEditingEmployee(null)
    setShowForm(false)
  }

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee)
    setFormData({
      name: employee.name,
      position: employee.position,
      salary: employee.salary.toString(),
      hireDate: employee.hireDate,
      category: employee.category,
      status: employee.status,
      observations: employee.observations || ''
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id))
  }

  const calculateSummary = () => {
    const dismissed = employees.filter(emp => emp.status === 'dismissed_december')
    const pending = employees.filter(emp => emp.status === 'funcamp_pending')
    const maintain = employees.filter(emp => emp.status === 'maintain_2026')
    
    return {
      dismissedCount: dismissed.length,
      dismissedTotal: dismissed.reduce((sum, emp) => sum + emp.salary, 0),
      pendingCount: pending.length,
      pendingTotal: pending.reduce((sum, emp) => sum + emp.salary, 0),
      maintainCount: maintain.length,
      maintainTotal: maintain.reduce((sum, emp) => sum + emp.salary, 0)
    }
  }

  const summary = calculateSummary()

  return (
    <div className="space-y-6">
      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <h3 className="font-semibold text-gray-700">Demissões Dezembro</h3>
          <p className="text-2xl font-bold text-red-600">{summary.dismissedCount}</p>
          <p className="text-sm text-gray-500">R$ {summary.dismissedTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <h3 className="font-semibold text-gray-700">FUNCAMP Pendente</h3>
          <p className="text-2xl font-bold text-yellow-600">{summary.pendingCount}</p>
          <p className="text-sm text-gray-500">R$ {summary.pendingTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="font-semibold text-gray-700">Manter até 2026</h3>
          <p className="text-2xl font-bold text-green-600">{summary.maintainCount}</p>
          <p className="text-sm text-gray-500">R$ {summary.maintainTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</p>
        </div>
      </div>

      {/* Filtros e Ações */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar funcionário..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas as categorias</option>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusCircle size={20} />
          Novo Funcionário
        </button>
      </div>

      {/* Lista de Funcionários */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salário</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Admissão</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-500">{categoryLabels[employee.category]}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{employee.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {employee.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                      {statusLabels[employee.status]}
                    </span>
                    {employee.observations && (
                      <div className="text-xs text-gray-500 mt-1">{employee.observations}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.hireDate || 'Não informado'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
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
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingEmployee ? 'Editar Funcionário' : 'Novo Funcionário'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Cargo"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Salário"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="date"
                value={formData.hireDate}
                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Employee['category'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Employee['status'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                {Object.entries(statusLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
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
                  {editingEmployee ? 'Atualizar' : 'Salvar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingEmployee(null)
                    setFormData({
                      name: '',
                      position: '',
                      salary: '',
                      hireDate: '',
                      category: 'professor',
                      status: 'active',
                      observations: ''
                    })
                  }}
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