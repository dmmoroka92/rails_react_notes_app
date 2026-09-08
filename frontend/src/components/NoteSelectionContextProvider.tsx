import { useState, type ReactNode } from "react"
import NoteSelectionContext from "../contexts/NotesSelectionContext"

type NoteSelectionContextProviderProps = {
  children: ReactNode
}

function NoteSelectionContextProvider({ children }: NoteSelectionContextProviderProps) {
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([])

  function toggleSelect(noteId: string) {
    setSelectedNoteIds((currentIds) => {
      if (currentIds.includes(noteId)) {
        return currentIds.filter((id) => id !== noteId)
      }

      return [...currentIds, noteId]
    })
  }

  function clearSelection() {
    setSelectedNoteIds([])
  }

  function selectAll(noteIds: string[]) {
    setSelectedNoteIds(noteIds)
  }

  function isNoteSelected(noteId: string) {
    return selectedNoteIds.includes(noteId)
  }

  return (
    <NoteSelectionContext.Provider value={{
      selectedNoteIds,
      toggleSelect,
      clearSelection,
      selectAll,
      isNoteSelected
    }}>
      {children}
    </NoteSelectionContext.Provider>
  )
}

export default NoteSelectionContextProvider

