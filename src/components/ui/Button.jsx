import { forwardRef } from 'react'

const variantStyles = {
  default:
    'bg-primary text-primary-foreground shadow-soft hover:opacity-95 active:scale-[0.98]',
  destructive:
    'bg-destructive text-destructive-foreground shadow-soft hover:opacity-95 active:scale-[0.98]',
  outline:
    'border-2 border-border bg-card hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
}

const sizeStyles = {
  sm: 'h-8 px-3 text-sm rounded-md',
  default: 'h-10 px-4 text-sm font-medium rounded-lg',
  lg: 'h-12 px-6 text-base font-medium rounded-lg',
  icon: 'h-10 w-10 rounded-lg',
}

const Button = forwardRef(
  (
    {
      className = '',
      variant = 'default',
      size = 'default',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center gap-2 whitespace-nowrap
          transition-all duration-200 ease-out
          disabled:pointer-events-none disabled:opacity-50
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
