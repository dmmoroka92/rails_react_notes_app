import FoldersPanel from "../components/FoldersPanel/FoldersPanel"
import NotesPanel from "../components/NotesPanel/NotesPanel"

function NotesPage() {
  return (
    <div>
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold">Notes</h1>
      </header>

      {/* Divider */}
      <div className="my-6 h-px bg-gray-200" />

      {/* Workspace */}
      <div className="grid grid-cols-[240px_1fr] gap-8">

        {/* Folders */}
        <FoldersPanel />

        {/* Notes */}
        <NotesPanel />

      </div>
    </div>
  )
}

export default NotesPage