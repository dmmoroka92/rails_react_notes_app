import { Outlet } from "react-router"
import { Toaster } from "sonner"

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />

      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout