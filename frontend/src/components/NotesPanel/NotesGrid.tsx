import NoteCard from "./NoteCard"

function NotesGrid() {
  return (
    <div className="grid max-h-[calc(100vh-200px)] grid-cols-2 gap-6 overflow-y-auto">
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
    </div>
  )
}

export default NotesGrid