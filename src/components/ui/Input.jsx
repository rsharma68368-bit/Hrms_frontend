import { forwardRef } from 'react'

const Input = forwardRef(
  (
    {
      className = '',
      type = 'text',
      ...props
    },
    ref
  ) => {
    return (
      <input
        type={type}
        ref={ref}
        className={`
          flex h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm
          placeholder:text-muted-foreground
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          transition-colors duration-200
          ${className}
        `}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
