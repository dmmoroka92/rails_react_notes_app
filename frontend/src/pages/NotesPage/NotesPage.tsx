import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { deleteNote } from "../../api/notes"
import ConfirmModal from "../../components/ConfirmModal"
import FoldersPanel from "../../components/FoldersPanel/FoldersPanel"
import type { Folder } from "../../components/FoldersPanel/types"
import {
  MODAL_TYPE,
  type ModalType
} from "../../components/Modal/types"
import NotesPanel from "../../components/NotesPanel/NotesPanel"
import type { Note } from "../../components/NotesPanel/types"
import { API_HOST } from "../../constants/api"
import { FOLDERS, NOTES } from "../../constants/queryKeys"
import { apiFetch } from "../../lib/api/apiFetch"
import queryClient from "../../lib/queryClient"
import FolderModal from "./FolderModal"
import NoteModal from "./NoteModal"
import { deleteFolder } from "../../api/folders"

function NotesPage() {
  const [modal, setModal] = useState<ModalType | null>(null)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null)

  function handleFolderEdit(folder: Folder) {
    setSelectedFolder(folder)
    setModal(MODAL_TYPE.Folder)
  }

  function handleFolderDelete(folder: Folder) {
    setSelectedFolder(folder)
    setModal(MODAL_TYPE.Confirm)
  }

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

  const { 
    data: folders, 
    error: foldersFetchError, 
    isFetching: isFoldersFetching
  } = useQuery({
    queryKey: [FOLDERS],
    queryFn: fetchFolders
  })

  async function fetchNotes() {
    const response =  await apiFetch<Note[]>(`${API_HOST}/notes`)

    return response.data
  }

  async function fetchFolders() {
    const response = await apiFetch<Folder[]>(`${API_HOST}/folders`)

    return response.data
  }

  function handleClose() {
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
    }
  })

  const deleteFolderMutation = useMutation({
    mutationFn: (folderId: string) => deleteFolder(folderId),

    onSuccess: (response) => {
      toast.success(response.meta?.message ?? "Note was deleted.")

      queryClient.invalidateQueries({
        queryKey: [FOLDERS],
      })


      handleClose()
    }
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
        <FoldersPanel
          isLoading={isFoldersFetching}
          error={foldersFetchError}
          folders={folders}
          onNewFolder={() => setModal(MODAL_TYPE.Folder)}
          onEditFolder={handleFolderEdit}
          onDeleteFolder={handleFolderDelete}
        />

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

      {modal === MODAL_TYPE.Folder && <FolderModal folder={selectedFolder} onClose={handleClose} />}

      {modal === MODAL_TYPE.Confirm && (
        <ConfirmModal
          title="Delete note"
          message="Are you sure you want to delete note?"
          onConfirm={() => deleteNoteMutation.mutate(selectedNote.id)}
          onClose={handleClose}
        />
      )}

      {modal === MODAL_TYPE.Confirm && (
        <ConfirmModal
          title="Delete folder"
          message="All notes in this folder will also be deleted. Are you sure?"
          onConfirm={() => deleteFolderMutation.mutate(selectedFolder.id)}
          onClose={handleClose}
        />
      )}
    </div>
  )
}

export default NotesPage
