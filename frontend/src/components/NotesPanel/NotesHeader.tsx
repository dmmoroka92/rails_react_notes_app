type NotesHeaderProps = {
  onNewNote: () => void
}

function NotesHeader({ onNewNote }: NotesHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold">Notes</h2>

      <button
        type="button"
        onClick={onNewNote}
        className="rounded-xl bg-gray-900 px-4 py-2 text-sm 
          font-medium text-white hover:bg-gray-800"
      >
        + New note
      </button>
    </div>
  )
}

export default NotesHeader