import { useState, useEffect } from 'react'
import { getEmployees, getAttendance, markAttendance } from '../api/api'
import AttendanceForm from '../components/AttendanceForm'
import AttendanceTable from '../components/AttendanceTable'
import Alert from '../components/ui/Alert'

export default function Attendance() {
  const [employees, setEmployees] = useState([])
  const [records, setRecords] = useState([])
  const [loadingEmployees, setLoadingEmployees] = useState(true)
  const [loadingRecords, setLoadingRecords] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoadingEmployees(true)
    getEmployees()
      .then((res) => {
        const data = res.data?.data ?? res.data
        const list = data?.employees ?? data
        const arr = Array.isArray(list) ? list : []
        setEmployees(arr)
      })
      .catch(() => setEmployees([]))
      .finally(() => setLoadingEmployees(false))
  }, [])

  const fetchRecords = () => {
    setLoadingRecords(true)
    setError(null)
    getAttendance()
      .then((res) => {
        const data = res.data
        const list = data?.attendance ?? data?.data
        setRecords(Array.isArray(list) ? list : [])
      })
      .catch((err) => {
        setError(
          err.userMessage ||
            err.response?.data?.message ||
            err.message ||
            'Failed to load attendance'
        )
        setRecords([])
      })
      .finally(() => setLoadingRecords(false))
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  const handleMark = (payload) => {
    setSubmitLoading(true)
    setError(null)
    const apiPayload = {
      employee_id: payload.employeeId,
      date: payload.date,
      status: payload.status === 'present' ? 'Present' : 'Absent',
    }
    markAttendance(apiPayload)
      .then(() => fetchRecords())
      .catch((err) => {
        setError(
          err.userMessage ||
            err.response?.data?.message ||
            err.message ||
            'Failed to mark attendance'
        )
      })
      .finally(() => setSubmitLoading(false))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Attendance
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Mark and view daily attendance
        </p>
      </div>
      {error && (
        <Alert variant="destructive">{error}</Alert>
      )}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AttendanceForm
            employees={employees}
            onSubmit={handleMark}
            loading={submitLoading}
          />
        </div>
        <div className="lg:col-span-2">
          <AttendanceTable
            records={records}
            employees={employees}
            loading={loadingRecords}
          />
        </div>
      </div>
    </div>
  )
}
