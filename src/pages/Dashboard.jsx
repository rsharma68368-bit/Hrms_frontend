import { useState, useEffect } from 'react'
import { getDashboardStats } from '../api/api'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import Skeleton from '../components/ui/Skeleton'
import Alert from '../components/ui/Alert'
import { Users, UserCheck, UserX } from 'lucide-react'

const statConfig = [
  {
    key: 'totalEmployees',
    label: 'Total Employees',
    icon: Users,
    color: 'text-primary',
    bg: 'bg-primary/8',
  },
  {
    key: 'presentToday',
    label: 'Present Today',
    icon: UserCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
  },
  {
    key: 'absentToday',
    label: 'Absent Today',
    icon: UserX,
    color: 'text-amber-600',
    bg: 'bg-amber-500/10',
  },
]

function StatCard({ label, value, icon: Icon, color, bg }) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-soft-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${bg} ${color}`}
          aria-hidden
        >
          <Icon className="h-5 w-5" />
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight text-foreground">
          {value}
        </p>
      </CardContent>
    </Card>
  )
}

function StatSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-9 rounded-lg" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16" />
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
  })
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
          const msg =
            err.userMessage ||
            err.response?.data?.message ||
            err.message ||
            'Failed to load stats'
          setError(msg)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Overview
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Key metrics at a glance
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <StatSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Overview
          </h2>
        </div>
        <Alert variant="destructive" title="Error">
          {error}
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Overview
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Key metrics at a glance
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statConfig.map((config) => (
          <StatCard
            key={config.key}
            label={config.label}
            value={stats[config.key]}
            icon={config.icon}
            color={config.color}
            bg={config.bg}
          />
        ))}
      </div>
    </div>
  )
}
