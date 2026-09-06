import { useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"

type ModalProps = {
  title: string
  children: ReactNode
  footer: ReactNode
  onClose: () => void
}

function Modal({ title, children, footer, onClose }: ModalProps) {
  const modalRoot = document.getElementById("modal-root")

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  if (!modalRoot) return null

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose()
  }

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={handleBackdropClick}>
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
          {footer}
        </div>

      </div>
    </div>,
    modalRoot
  )
}

export default Modal