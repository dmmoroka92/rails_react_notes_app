import NotesHeader from "./NotesHeader"
import NotesGrid from "./NotesGrid"
import type { Note } from "./types"

type NotesPanelProps = {
  isLoading?: boolean
  error?: Error | null
  notes: Note[]
  onNewNote: () => void
}

function NotesPanel({
  notes,
  onNewNote,
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
      />
    </section>
  )
}

export default NotesPanel