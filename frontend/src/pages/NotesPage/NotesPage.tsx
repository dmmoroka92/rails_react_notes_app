import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import FoldersPanel from "../../components/FoldersPanel/FoldersPanel"
import {
  MODAL_TYPE,
  type ModalType
} from "../../components/Modal/types"
import NotesPanel from "../../components/NotesPanel/NotesPanel"
import type { Note } from "../../components/NotesPanel/types"
import { API_HOST } from "../../constants/api"
import { NOTES } from "../../constants/queryKeys"
import { apiFetch } from "../../lib/api/apiFetch"
import FolderModal from "./FolderModal"
import NoteModal from "./NoteModal"
import ConfirmModal from "../../components/ConfirmModal"
import { deleteNote } from "../../api/notes"
import { toast } from "sonner"
import queryClient from "../../lib/queryClient"

function NotesPage() {
  const [modal, setModal] = useState<ModalType | null>(null)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  function handleNoteEdit(note: Note) {
    setSelectedNote(note)
    setModal(MODAL_TYPE.Note)
  }

  function handleNoteDelete(note: Note) {
    setSelectedNote(note)
    setModal(MODAL_TYPE.Confirm)
  }

  const { data: notes, error, isFetching } = useQuery({
    queryKey: [NOTES],
    queryFn: fetchNotes
  })

  async function fetchNotes() {
    const response =  await apiFetch<Note[]>(`${API_HOST}/notes`)

    return response.data
  }

  function handleClose() {
    console.log("handling close modal...")
    setModal(null)
    setSelectedNote(null)
  }

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),

    onSuccess: (response) => {
      toast.success(response.meta?.message ?? "Note was deleted.")

      queryClient.invalidateQueries({
        queryKey: [NOTES],
      })


      handleClose()
    },
    
    onError: (error) => {
      console.error("Delete note failed:", error)
      toast.error("Failed to delete note.")
    },
  })

  return (
    <div>
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold">Notes</h1>
      </header>

      {/* Divider */}
      <div className="my-6 h-px bg-gray-200" />
      {/* Workspace */}
      <div className="grid grid-cols-[240px_1fr] gap-8">
        {/* Folders */}
        <FoldersPanel onNewFolder={() => setModal(MODAL_TYPE.Folder)} />

        {/* Notes */}
        <NotesPanel
          isLoading={isFetching}
          error={error}
          notes={notes ?? []}
          onNewNote={() => setModal(MODAL_TYPE.Note)}
          onEditNote={handleNoteEdit}
          onDeleteNote={handleNoteDelete}
        />
      </div>

      {modal === MODAL_TYPE.Note && <NoteModal note={selectedNote} onClose={handleClose} />}

      {modal === MODAL_TYPE.Folder && <FolderModal onClose={handleClose} />}

      {modal === MODAL_TYPE.Confirm && (
        <ConfirmModal
          title="Delete note"
          message="Are you sure you want to delete note?"
          onConfirm={() => deleteNoteMutation.mutate(selectedNote.id)}
          onClose={handleClose}
        />
      )}
    </div>
  )
}

export default NotesPage
