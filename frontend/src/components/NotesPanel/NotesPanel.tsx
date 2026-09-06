import NotesHeader from "./NotesHeader"
import NotesGrid from "./NotesGrid"

type NotesPanelProps = {
  onNewNote: () => void
}

function NotesPanel({ onNewNote }: NotesPanelProps) {
  return (
    <section>
      <NotesHeader onNewNote={onNewNote} />
      <NotesGrid />
    </section>
  )
}

export default NotesPanel