import { useState, useEffect } from 'react'
import { getEmployees, getAttendance, markAttendance } from '../api/api'
import AttendanceForm from '../components/AttendanceForm'
import AttendanceTable from '../components/AttendanceTable'

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
        setEmployees(Array.isArray(data) ? data : [])
      })
      .catch(() => setEmployees([]))
      .finally(() => setLoadingEmployees(false))
  }, [])

  const fetchRecords = () => {
    setLoadingRecords(true)
    setError(null)
    getAttendance()
      .then((res) => {
        const data = res.data?.data ?? res.data
        setRecords(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || 'Failed to load attendance')
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
    markAttendance(payload)
      .then(() => fetchRecords())
      .catch((err) => {
        setError(err.response?.data?.message || err.message || 'Failed to mark attendance')
      })
      .finally(() => setSubmitLoading(false))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Attendance</h1>
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <AttendanceForm
            employees={employees}
            onSubmit={handleMark}
            loading={submitLoading}
          />
        </div>
        <div className="lg:col-span-2">
          <AttendanceTable records={records} loading={loadingRecords} />
        </div>
      </div>
    </div>
  )
}
