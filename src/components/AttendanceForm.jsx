import { useState } from 'react'

export default function AttendanceForm({ employees, onSubmit, loading }) {
  const [employeeId, setEmployeeId] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [status, setStatus] = useState('present')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!employeeId) return
    onSubmit({ employeeId, date, status })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Mark Attendance</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="employee" className="block text-sm font-medium text-gray-700 mb-1">
            Employee
          </label>
          <select
            id="employee"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.email})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="status"
                value="present"
                checked={status === 'present'}
                onChange={() => setStatus('present')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Present</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="status"
                value="absent"
                checked={status === 'absent'}
                onChange={() => setStatus('absent')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Absent</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Mark Attendance'}
        </button>
      </div>
    </form>
  )
}
