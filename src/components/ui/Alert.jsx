import { AlertCircle, AlertTriangle, Info } from 'lucide-react'

const variantStyles = {
  default: 'bg-muted text-foreground border-border',
  destructive:
    'bg-destructive/10 text-destructive border-destructive/20',
  success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
}

const variantIcons = {
  default: Info,
  destructive: AlertCircle,
  success: Info,
  warning: AlertTriangle,
}

function Alert({ className = '', variant = 'default', title, children, ...props }) {
  const Icon = variantIcons[variant]
  return (
    <div
      role="alert"
      className={`
        relative w-full rounded-lg border p-4
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      <div className="flex gap-3">
        <Icon className="h-5 w-5 shrink-0 mt-0.5" aria-hidden />
        <div className="flex-1 space-y-1">
          {title && (
            <h5 className="font-medium leading-none tracking-tight">{title}</h5>
          )}
          {children && (
            <div className="text-sm [&_p]:leading-relaxed">{children}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Alert
