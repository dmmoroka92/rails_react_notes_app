import { createContext } from "react"

type NoteSelectionContextValue = {
  selectedNoteIds: string[]
  toggleSelect: (noteId: string) => void
  clearSelection: () => void
  selectAll: (noteIds: string[]) => void
  isNoteSelected: (noteId: string) => boolean
}

const NoteSelectionContext = createContext<NoteSelectionContextValue | null>(null)

export default NoteSelectionContext