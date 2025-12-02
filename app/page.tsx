'use client'

import { useState } from 'react'
import { PlusCircle, Download, AlertTriangle, Users, Receipt, BarChart3 } from 'lucide-react'
import EmployeeManager from '@/components/EmployeeManager'
import TaxRiskManager from '@/components/TaxRiskManager'
import ReportGenerator from '@/components/ReportGenerator'
import ScenarioAnalysis from '@/components/ScenarioAnalysis'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'scenario' | 'employees' | 'tax' | 'report'>('scenario')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <AlertTriangle className="text-red-600" />
            CEGEP - Gestão de Riscos
          </h1>
          <p className="text-gray-600 mt-2">Sistema de gestão de riscos trabalhistas e fiscais</p>
        </header>

        <nav className="mb-8">
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('scenario')}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === 'scenario'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart3 size={20} />
              Análise de Cenários
            </button>
            <button
              onClick={() => setActiveTab('employees')}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === 'employees'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users size={20} />
              Gestão de Funcionários
            </button>
            <button
              onClick={() => setActiveTab('tax')}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === 'tax'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Receipt size={20} />
              Riscos Fiscais
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === 'report'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Download size={20} />
              Dashboard Executivo
            </button>
          </div>
        </nav>

        <main>
          {activeTab === 'scenario' && <ScenarioAnalysis />}
          {activeTab === 'employees' && <EmployeeManager />}
          {activeTab === 'tax' && <TaxRiskManager />}
          {activeTab === 'report' && <ReportGenerator />}
        </main>
      </div>
    </div>
  )
}