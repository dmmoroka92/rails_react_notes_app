import { createBrowserRouter } from "react-router"
import NotesPage from "../pages/NotesPage"
import AppLayout from "../layouts/AppLayout"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <NotesPage />
      }
    ]
  }
])

export default router