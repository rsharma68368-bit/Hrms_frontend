import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import Button from './Button'

function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className = '',
}) {
  const handleEscape = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose?.()
    },
    [onClose]
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, handleEscape])

  if (!open) return null

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-desc' : undefined}
    >
      <div
        className="fixed inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        aria-hidden
      />
      <div
        className={`
          relative z-50 w-full max-w-lg rounded-xl border border-border bg-card p-6
          shadow-soft-lg transition-all duration-200
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            {title && (
              <h2
                id="modal-title"
                className="text-lg font-semibold leading-tight tracking-tight"
              >
                {title}
              </h2>
            )}
            {description && (
              <p id="modal-desc" className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0 -mr-2 -mt-1"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        {children && <div className="mt-4">{children}</div>}
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  )

  return createPortal(content, document.body)
}

export default Modal
