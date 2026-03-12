import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import Label from './ui/Label'
import Input from './ui/Input'
import Select from './ui/Select'
import Button from './ui/Button'
import { CalendarCheck } from 'lucide-react'

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5" aria-hidden />
          Mark Attendance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employee">Employee</Label>
            <Select
              id="employee"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            >
              <option value="">Select employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.employee_id}>
                  {emp.name} ({emp.email})
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex gap-4 pt-1">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="present"
                  checked={status === 'present'}
                  onChange={() => setStatus('present')}
                  className="h-4 w-4 border-input text-primary focus:ring-ring"
                />
                <span className="text-sm font-medium">Present</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="absent"
                  checked={status === 'absent'}
                  onChange={() => setStatus('absent')}
                  className="h-4 w-4 border-input text-primary focus:ring-ring"
                />
                <span className="text-sm font-medium">Absent</span>
              </label>
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Mark Attendance'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
