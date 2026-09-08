import NoteCard from "./NoteCard"

import type { Note } from "./types"

type NotesGridProps = {
  notes: Note[]
  onEditNote: (note: Note) => void
  onDeleteNote: (note: Note) => void
  isLoading?: boolean
  error?: Error | null
}

function NotesGrid({
  notes,
  onEditNote,
  onDeleteNote,
  isLoading = false,
  error = null,
  
}: NotesGridProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-40 items-center justify-center 
        rounded-xl border border-red-200 bg-red-50">
        <p className="text-sm text-red-600">{error.message}</p>
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div className="flex min-h-40 items-center justify-center 
        rounded-xl border border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">
            No notes yet
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Create your first note to get started.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid max-h-[calc(100vh-200px)] grid-cols-2 gap-6 overflow-y-auto mb-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEditNote}
          onDelete={onDeleteNote}
        />
      ))}
    </div>
  )
}

export default NotesGrid