import { useState, useEffect } from 'react'
import { getDashboardStats } from '../api/api'

export default function Dashboard() {
  const [stats, setStats] = useState({ totalEmployees: 0, presentToday: 0, absentToday: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    getDashboardStats()
      .then((res) => {
        if (!cancelled) {
          const data = res.data?.data ?? res.data
          setStats({
            totalEmployees: data?.totalEmployees ?? data?.total_employees ?? 0,
            presentToday: data?.presentToday ?? data?.present_today ?? 0,
            absentToday: data?.absentToday ?? data?.absent_today ?? 0,
          })
        }
      })
      .catch((err) => {
        if (!cancelled) {
          const msg = err.userMessage || err.response?.data?.message || err.message || 'Failed to load stats'
          setError(msg)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    )
  }

  const cards = [
    { label: 'Total Employees', value: stats.totalEmployees, bg: 'bg-white', border: 'border-gray-200' },
    { label: 'Present Today', value: stats.presentToday, bg: 'bg-white', border: 'border-gray-200' },
    { label: 'Absent Today', value: stats.absentToday, bg: 'bg-white', border: 'border-gray-200' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`${card.bg} rounded-lg border ${card.border} p-6 shadow-sm`}
          >
            <p className="text-sm font-medium text-gray-500">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
