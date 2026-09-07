import { createBrowserRouter } from "react-router"
import NotesPage from "../pages/NotesPage/NotesPage"
import AppLayout from "../layouts/AppLayout"
import FolderPage from "../pages/FolderPage"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <NotesPage />
      },
      {
        path: "/folders/:slug",
        element: <FolderPage />
      }
    ]
  }
])

export default router