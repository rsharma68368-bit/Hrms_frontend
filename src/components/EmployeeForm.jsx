import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import Input from './ui/Input'
import Label from './ui/Label'
import Button from './ui/Button'
import { UserPlus } from 'lucide-react'

export default function EmployeeForm({ onSubmit, loading }) {
  const [employeeId, setEmployeeId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!employeeId.trim() || !name.trim() || !email.trim()) return
    onSubmit({
      employee_id: employeeId.trim(),
      name: name.trim(),
      email: email.trim(),
      department: department.trim(),
    })
    setEmployeeId('')
    setName('')
    setEmail('')
    setDepartment('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" aria-hidden />
          Add Employee
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input
              id="employeeId"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="e.g. E001"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@company.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Engineering"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Adding...' : 'Add Employee'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
