import NotesHeader from "./NotesHeader"
import NotesGrid from "./NotesGrid"
import type { Note } from "./types"

type NotesPanelProps = {
  isLoading?: boolean
  error?: Error | null
  notes: Note[]
  onNewNote: () => void
  onEditNote: (note: Note) => void
  onDeleteNote: (note: Note) => void
}

function NotesPanel({
  notes,
  onNewNote,
  onEditNote,
  onDeleteNote,
  isLoading = false,
  error = null 
}: NotesPanelProps) {
  return (
    <section>
      <NotesHeader onNewNote={onNewNote} />
      <NotesGrid
        notes={notes}
        isLoading={isLoading}
        error={error}
        onEditNote={onEditNote}
        onDeleteNote={onDeleteNote}
      />
    </section>
  )
}

export default NotesPanel