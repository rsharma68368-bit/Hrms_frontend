import { useState } from 'react'
import { Card, CardContent } from './ui/Card'
import Button from './ui/Button'
import Modal from './ui/Modal'
import Skeleton from './ui/Skeleton'
import { Trash2, Users } from 'lucide-react'

function TableSkeleton() {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="space-y-4 p-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-20 rounded-lg" />
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
          <Users className="h-7 w-7 text-muted-foreground" />
        </div>
        <p className="text-base font-medium text-foreground">No employees yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add an employee using the form on the left
        </p>
      </CardContent>
    </Card>
  )
}

export default function EmployeeTable({ employees, onDelete, loading }) {
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const handleDeleteClick = (emp) => setDeleteTarget(emp)
  const handleCloseModal = () => {
    if (!deleting) setDeleteTarget(null)
  }
  const handleConfirmDelete = () => {
    if (!deleteTarget) return
    setDeleting(true)
    const p = onDelete(deleteTarget.id)
    if (p && typeof p.then === 'function') {
      p.finally(() => {
        setDeleting(false)
        setDeleteTarget(null)
      })
    } else {
      setDeleting(false)
      setDeleteTarget(null)
    }
  }

  if (loading) return <TableSkeleton />

  if (!employees?.length) return <EmptyState />

  return (
    <>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th
                  className="h-12 px-6 text-left align-middle font-medium text-muted-foreground"
                  scope="col"
                >
                  Name
                </th>
                <th
                  className="h-12 px-6 text-left align-middle font-medium text-muted-foreground"
                  scope="col"
                >
                  Email
                </th>
                <th
                  className="h-12 px-6 text-left align-middle font-medium text-muted-foreground"
                  scope="col"
                >
                  Department
                </th>
                <th
                  className="h-12 px-6 text-right align-middle font-medium text-muted-foreground"
                  scope="col"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-border transition-colors hover:bg-muted/50"
                >
                  <td className="px-6 py-4 align-middle font-medium text-foreground">
                    {emp.name}
                  </td>
                  <td className="px-6 py-4 align-middle text-muted-foreground">
                    {emp.email}
                  </td>
                  <td className="px-6 py-4 align-middle text-muted-foreground">
                    {emp.department || '—'}
                  </td>
                  <td className="px-6 py-4 text-right align-middle">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(emp)}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`Delete ${emp.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={!!deleteTarget}
        onClose={handleCloseModal}
        title="Delete employee"
        description={
          deleteTarget
            ? `Are you sure you want to remove ${deleteTarget.name}? This cannot be undone.`
            : ''
        }
        footer={
          <>
            <Button variant="outline" onClick={handleCloseModal} disabled={deleting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </>
        }
      />
    </>
  )
}
