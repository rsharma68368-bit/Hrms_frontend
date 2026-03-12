import { useState, useEffect } from 'react'
import { getEmployees, createEmployee, deleteEmployee } from '../api/api'
import EmployeeForm from '../components/EmployeeForm'
import EmployeeTable from '../components/EmployeeTable'
import Alert from '../components/ui/Alert'

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
        const msg =
          err.userMessage ||
          err.response?.data?.message ||
          err.message ||
          'Failed to load employees'
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
        setError(
          err.userMessage ||
            err.response?.data?.message ||
            err.message ||
            'Failed to add employee'
        )
      })
      .finally(() => setSubmitLoading(false))
  }

  const handleDelete = (id) => {
    setError(null)
    return deleteEmployee(id)
      .then(() => fetchEmployees())
      .catch((err) => {
        setError(
          err.userMessage ||
            err.response?.data?.message ||
            err.message ||
            'Failed to delete employee'
        )
      })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Employees
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your team and add new members
        </p>
      </div>
      {error && (
        <Alert variant="destructive">{error}</Alert>
      )}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <EmployeeForm onSubmit={handleAdd} loading={submitLoading} />
        </div>
        <div className="lg:col-span-2">
          <EmployeeTable
            employees={employees}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}
