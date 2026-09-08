import { useContext, useState } from "react"
import NoteCard from "./NoteCard"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { API_HOST } from "../../constants/api"
import { FOLDERS, NOTES } from "../../constants/queryKeys"
import NoteSelectionContext from "../../contexts/NotesSelectionContext"
import { apiFetch } from "../../lib/api/apiFetch"
import queryClient from "../../lib/queryClient"
import { routes } from "../../routes"
import type { ApiResponse } from "../../types/api"
import type { Note } from "./types"
import { MODAL_TYPE, type ModalType } from "../Modal/types"
import ConfirmModal from "../ConfirmModal"
import { deleteNotes } from "../../api/notes"

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
  const context = useContext(NoteSelectionContext)

  if (!context) {
    throw new Error("Note must be used inside NoteSelectionContextProvider")
  }

  const { selectedNoteIds, clearSelection, selectAll } = context
  const [modal, setModal] = useState<ModalType | null>(null)
  
  function toggleSelectAll() {
    const noteIds = notes.map(note => note.id)

    const allSelected = 
      noteIds.length > 0 && 
      noteIds.every((noteId) => selectedNoteIds.includes(noteId))

    allSelected ? clearSelection() : selectAll(noteIds)
  }

  function archiveNotes(noteIds: string[]) {
    return apiFetch<ApiResponse<void>>(`${API_HOST}${routes.archiveNotes}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        noteIds
      })
    })
  }

  const deleteNotesMutation = useMutation({
    mutationFn: (noteIds: string[]) => deleteNotes(noteIds),

    onSuccess: (response) => {
      toast.success(response.meta?.message ?? "Notes were deleted")

      queryClient.invalidateQueries({
        queryKey: [NOTES]
      })

      setModal(null)
      clearSelection()
    }
  })

  const archiveNotesMutation = useMutation({
    mutationFn: (noteIds: string[]) => archiveNotes(noteIds),

    onSuccess: (response) => {
      toast.success(response.meta?.message ?? "Notes were archived")

      queryClient.invalidateQueries({
        queryKey: [NOTES]
      })

      queryClient.invalidateQueries({
        queryKey: [FOLDERS]
      })

      clearSelection()
    }
  })

  if (isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="flex min-h-40 items-center justify-center
          rounded-xl border border-red-200 bg-red-50"
      >
        <p className="text-sm text-red-600">{error.message}</p>
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div
        className="flex min-h-40 items-center justify-center
          rounded-xl border border-gray-200 bg-gray-50"
      >
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
    <div className="mb-4">
      {/* Select all */}
      <div className="mb-4 flex items-center">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            onClick={toggleSelectAll}
            className="h-4 w-4 cursor-pointer rounded-full border-gray-300"
          />

          <span className="text-sm font-medium text-gray-600">
            Select all
          </span>
        </label>
      </div>

      {/* Bulk actions */}
      {
        selectedNoteIds.length > 1 && (
          <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Actions */}
            <div className="flex items-center justify-center gap-6 border-b border-gray-200 px-4 py-3">
              <span className="text-sm font-medium text-gray-600">
                {selectedNoteIds.length} selected
              </span>

              <button
                type="button"
                onClick={() => archiveNotesMutation.mutate(selectedNoteIds)}
                className="rounded-lg px-4 py-2 text-sm font-medium
                  text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              >
                Archive
              </button>

              <span className="h-5 w-px bg-gray-200" />

              <button
                type="button"
                onClick={() => setModal(MODAL_TYPE.ConfirmNote)}
                className="rounded-lg px-4 py-2 text-sm font-medium
                  text-red-600 transition hover:bg-red-50 hover:text-red-700"
              >
                Delete
              </button>
            </div>

            {/* Drag area */}
            <div
              className="flex cursor-grab items-center justify-center gap-2
                px-4 py-3 text-sm text-gray-500 transition hover:bg-gray-50"
            >
              <span aria-hidden="true">⋮⋮</span>
              <span>Drag into a folder to assign notes</span>
            </div>
          </div>
        )
      }

      {/* Notes */}
      <div className="grid max-h-[calc(100vh-200px)] grid-cols-2 gap-6 overflow-y-auto">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={onEditNote}
            onDelete={onDeleteNote}
          />
        ))}
      </div>

      {modal === MODAL_TYPE.ConfirmNote && (
        <ConfirmModal
          title="Delete notes"
          message="Are you sure you want to delete notes?"
          onConfirm={() => deleteNotesMutation.mutate(selectedNoteIds)}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}

export default NotesGrid
