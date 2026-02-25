import { useState, useEffect } from 'react'
import { getEmployees, createEmployee, deleteEmployee } from '../api/api'
import EmployeeForm from '../components/EmployeeForm'
import EmployeeTable from '../components/EmployeeTable'

export default function Employees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchEmployees = () => {
    setLoading(true)
    setError(null)
    getEmployees()
      .then((res) => {
        const data = res.data
        const list = data?.employees ?? data?.data
        setEmployees(Array.isArray(list) ? list : [])
      })
      .catch((err) => {
        const msg = err.userMessage || err.response?.data?.message || err.message || 'Failed to load employees'
        setError(msg)
        setEmployees([])
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleAdd = (payload) => {
    setSubmitLoading(true)
    setError(null)
    createEmployee(payload)
      .then(() => fetchEmployees())
      .catch((err) => {
        setError(err.userMessage || err.response?.data?.message || err.message || 'Failed to add employee')
      })
      .finally(() => setSubmitLoading(false))
  }

  const handleDelete = (id) => {
    if (!window.confirm('Delete this employee?')) return
    setError(null)
    deleteEmployee(id)
      .then(() => fetchEmployees())
      .catch((err) => {
        setError(err.userMessage || err.response?.data?.message || err.message || 'Failed to delete employee')
      })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Employees</h1>
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <EmployeeForm onSubmit={handleAdd} loading={submitLoading} />
        </div>
        <div className="lg:col-span-2">
          <EmployeeTable employees={employees} onDelete={handleDelete} loading={loading} />
        </div>
      </div>
    </div>
  )
}
