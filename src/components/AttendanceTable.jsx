import { Card, CardContent } from './ui/Card'
import Badge from './ui/Badge'
import Skeleton from './ui/Skeleton'
import { CalendarDays } from 'lucide-react'

function TableSkeleton() {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="space-y-4 p-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted"
          aria-hidden
        >
          <CalendarDays className="h-7 w-7 text-muted-foreground" />
        </div>
        <p className="text-base font-medium text-foreground">
          No attendance records yet
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Mark attendance using the form on the left
        </p>
      </CardContent>
    </Card>
  )
}

export default function AttendanceTable({ records, employees = [], loading }) {
  const getName = (employeeId) =>
    employees.find((e) => e.employee_id === employeeId)?.name ?? '—'

  if (loading) return <TableSkeleton />

  if (!records?.length) return <EmptyState />

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th
                className="h-12 px-6 text-left align-middle font-medium text-muted-foreground"
                scope="col"
              >
                Employee
              </th>
              <th
                className="h-12 px-6 text-left align-middle font-medium text-muted-foreground"
                scope="col"
              >
                Date
              </th>
              <th
                className="h-12 px-6 text-left align-middle font-medium text-muted-foreground"
                scope="col"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => {
              const isPresent =
                (rec.status ?? '').toLowerCase() === 'present'
              return (
                <tr
                  key={rec.id}
                  className="border-b border-border transition-colors hover:bg-muted/50"
                >
                  <td className="px-6 py-4 align-middle font-medium text-foreground">
                    {rec.employeeName ??
                      rec.employee?.name ??
                      getName(rec.employee_id)}
                  </td>
                  <td className="px-6 py-4 align-middle text-muted-foreground">
                    {new Date(rec.date ?? rec.attendance_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <Badge variant={isPresent ? 'success' : 'destructive'}>
                      {isPresent ? 'Present' : 'Absent'}
                    </Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
