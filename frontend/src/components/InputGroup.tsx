import type { ReactNode } from "react"

type InputGroupProps = {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}

function InputGroup({
  label,
  htmlFor,
  error,
  children
}: InputGroupProps ) {
  const hasError = Boolean(error)

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className={`text-sm font-medium ${
          hasError ? "text-red-600" : "text-gray-700"
        }`}
      >
        {label}
      </label>
    
      {children}
    
      {hasError && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default InputGroup