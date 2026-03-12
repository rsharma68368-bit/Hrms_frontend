const variantStyles = {
  default: 'bg-primary/10 text-primary border-transparent',
  secondary: 'bg-secondary text-secondary-foreground border-transparent',
  success: 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-400 border-transparent',
  destructive: 'bg-destructive/12 text-destructive border-transparent',
  outline: 'text-foreground border-border',
}

function Badge({ className = '', variant = 'default', ...props }) {
  return (
    <span
      className={`
        inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium
        transition-colors duration-200
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    />
  )
}

export default Badge
