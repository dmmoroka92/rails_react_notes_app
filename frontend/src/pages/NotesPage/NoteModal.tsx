import { useMutation } from "@tanstack/react-query"
import Modal from "../../components/Modal/Modal"
import NoteForm from "../../components/NotesPanel/NoteForm"
import type { Note } from "../../components/NotesPanel/types"
import type { NoteFormData } from "../../schemas/note.schema"
import queryClient from "../../lib/queryClient"
import { NOTES } from "../../constants/queryKeys"
import { toast } from "sonner"
import { createNote, updateNote } from "../../api/notes"

type NoteModalProps = {
  note: Note
  onClose: () => void
}

type UpdateNoteParams = {
  noteId: string
  data: NoteFormData
}

function NoteModal({ note, onClose }: NoteModalProps) {
  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (response) => {
      toast.success(response.meta.message ?? "Note created successfully")
      
      queryClient.invalidateQueries({
        queryKey: [NOTES]
      })

      onClose()
    }
  })

  const updateNoteMutation = useMutation({
    mutationFn: ({ noteId, data }: UpdateNoteParams) =>
      updateNote(noteId, data),
  
    onSuccess: (response) => {
      toast.success(
        response.meta?.message ?? "Note updated successfully"
      )
  
      queryClient.invalidateQueries({
        queryKey: [NOTES],
      })
  
      onClose()
    },
  })

  const { 
    isPending: isCreatePending,
    error: createError 
  } = createNoteMutation
  const {
    isPending: isUpdatePending,
    error: updateError
  } = updateNoteMutation
  const isEditMode = note !== null
  const isNoteMutationPending = isCreatePending || isUpdatePending
  const noteMutationError = createError ?? updateError
  const submitLabel = isNoteMutationPending
  ? isEditMode
    ? "Updating note..."
    : "Creating note..."
  : isEditMode
    ? "Update note"
    : "Create note"
  
  return (
    <Modal
      title={isEditMode ? "Update note" : "New note"}
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
            disabled={isNoteMutationPending}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white 
              shadow-sm transition hover:bg-gray-800 focus:outline-none 
              focus:ring-2 focus:ring-gray-400"
          >
            {submitLabel}
          </button>
        </>
      }
      onClose={onClose}>
      <NoteForm
        note={note}
        error={noteMutationError}
        onSubmit={(data) => {
          if (isEditMode) {
            updateNoteMutation.mutate({ noteId: note.id, data })
          } else {
            createNoteMutation.mutate(data)
          }
        }}
      />
    </Modal>
  )
}

export default NoteModal