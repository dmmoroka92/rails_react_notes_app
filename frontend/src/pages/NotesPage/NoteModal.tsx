import { useMutation } from "@tanstack/react-query"
import Modal from "../../components/Modal/Modal"
import NoteForm from "../../components/NotesPanel/NoteForm"
import { apiFetch } from "../../lib/api/apiFetch"
import type { Note } from "../../components/NotesPanel/types"
import { API_HOST } from "../../constants/api"
import type { NoteFormData } from "../../schemas/note.schema"
import queryClient from "../../lib/queryClient"
import { NOTES } from "../../constants/queryKeys"
import type { ApiResponse } from "../../types/api"
import { toast } from "sonner"

type NoteModalProps = {
  onClose: () => void
}

function NoteModal({ onClose }: NoteModalProps) {
  function createNote(data: NoteFormData) {
    return apiFetch<ApiResponse<Note>>(`${API_HOST}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        note: data
      })
    })
  }

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (response) => {
      toast.success(response.meta.message ?? "Note created successfully")
      
      queryClient.invalidateQueries({
        queryKey:[NOTES]
      })

      onClose()
    }
  })

  const { 
    isPending: isNoteCreationPending,
    error: noteCreationError 
  } = createNoteMutation

  return (
    <Modal
      title="New note"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm 
              font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="note-form"
            disabled={isNoteCreationPending}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white 
              shadow-sm transition hover:bg-gray-800 focus:outline-none 
              focus:ring-2 focus:ring-gray-400"
          >
            {isNoteCreationPending ? "Creating note..." : "Create note"}
          </button>
        </>
      }
      onClose={onClose}>
      <NoteForm
        error={noteCreationError}
        onSubmit={(data) => createNoteMutation.mutate(data)}
      />
    </Modal>
  )
}

export default NoteModal