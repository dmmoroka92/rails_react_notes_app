import NotesHeader from "./NotesHeader"
import NotesGrid from "./NotesGrid"
import type { Note } from "./types"
import type { Pagination } from "../../types/api"
import PaginationControls from "../Pagination/PaginationControls"

type NotesPanelProps = {
  isLoading?: boolean
  error?: Error | null
  notes: Note[]
  onNewNote: () => void
  onEditNote: (note: Note) => void
  onDeleteNote: (note: Note) => void
  paginationMeta?: Pagination
  onPageChange: (pageNum: number) => void
}

function NotesPanel({
  notes,
  onNewNote,
  onEditNote,
  onDeleteNote,
  paginationMeta,
  onPageChange,
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

      {paginationMeta?.totalPages > 1 && (
        <PaginationControls
          meta={paginationMeta}
          onPageChange={onPageChange}
        />
      )}
    </section>
  )
}

export default NotesPanel