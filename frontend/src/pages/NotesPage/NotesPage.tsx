import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { deleteFolder } from "../../api/folders"
import { deleteNote, updateNote } from "../../api/notes"
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
import { useSearch } from "../../hooks/useSearch"

type AssignNoteToFolderParams = {
  noteId: string
  folderId: string
}

function NotesPage() {
  const [modal, setModal] = useState<ModalType | null>(null)
  const [notesPage, setNotesPage] = useState<number>(1)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null)
  const {
    search,
    debouncedSearch,
    setSearch
  } = useSearch()

  const assignNoteMutation = useMutation({
    mutationFn: ({ noteId, folderId }: AssignNoteToFolderParams) =>
      updateNote(noteId, { folderId }),
  
    onSuccess: (response) => {
      toast.success(response.meta?.message ?? "Note was assigned to folder")

      queryClient.invalidateQueries({
        queryKey: [NOTES],
      })
  
      queryClient.invalidateQueries({
        queryKey: [FOLDERS],
      })
    },
  })

  function handleDropNote(noteId: string, folderId: string) {
    assignNoteMutation.mutate({
      noteId,
      folderId
    })
  }

  function handleFolderEdit(folder: Folder) {
    setSelectedFolder(folder)
    setModal(MODAL_TYPE.Folder)
  }

  function handleFolderDelete(folder: Folder) {
    setSelectedFolder(folder)
    setModal(MODAL_TYPE.ConfirmFolder)
  }

  function handleNoteEdit(note: Note) {
    setSelectedNote(note)
    setModal(MODAL_TYPE.Note)
  }

  function handleNoteDelete(note: Note) {
    setSelectedNote(note)
    setModal(MODAL_TYPE.ConfirmNote)
  }

  function handleNotesPageChange(page: number) {
    setNotesPage(page)
  }

  const { data: fetchNotesResponse, error, isFetching } = useQuery({
    queryKey: [NOTES, debouncedSearch, notesPage],
    queryFn: () => fetchNotes(notesPage, debouncedSearch)
  })

  const notes = fetchNotesResponse?.data
  const notesPagination = fetchNotesResponse?.meta?.pagination

  const { 
    data: folders, 
    error: foldersFetchError, 
    isFetching: isFoldersFetching
  } = useQuery({
    queryKey: [FOLDERS],
    queryFn: fetchFolders
  })

  async function fetchNotes(pageNum: number = 1, searchQuery: string = "") {
    const params = new URLSearchParams({
      page: String(pageNum),
      q: searchQuery,
    })
    
    const response =  await apiFetch<Note[]>(`${API_HOST}/notes?${params}`)

    return response
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
    mutationFn: (slug: string) => deleteFolder(slug),

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
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Notes</h1>

        <input
          type="search"
          placeholder="Search notes..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-64 rounded-lg border border-gray-200 bg-white px-4
            py-2 text-sm outline-none transition focus:border-gray-400
            focus:ring-2 focus:ring-gray-200"
        />
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
          onNoteDrop={handleDropNote}
        />

        {/* Notes */}
        <NotesPanel
          isLoading={isFetching}
          error={error}
          notes={notes ?? []}
          onNewNote={() => setModal(MODAL_TYPE.Note)}
          onEditNote={handleNoteEdit}
          onDeleteNote={handleNoteDelete}
          paginationMeta={notesPagination}
          onPageChange={handleNotesPageChange}
        />
      </div>

      {modal === MODAL_TYPE.Note && <NoteModal note={selectedNote} onClose={handleClose} />}

      {modal === MODAL_TYPE.Folder && <FolderModal folder={selectedFolder} onClose={handleClose} />}

      {modal === MODAL_TYPE.ConfirmNote && (
        <ConfirmModal
          title="Delete note"
          message="Are you sure you want to delete note?"
          onConfirm={() => deleteNoteMutation.mutate(selectedNote.id)}
          onClose={handleClose}
        />
      )}

      {modal === MODAL_TYPE.ConfirmFolder && (
        <ConfirmModal
          title="Delete folder"
          message="All notes in this folder will also be deleted. Are you sure?"
          onConfirm={() => deleteFolderMutation.mutate(selectedFolder.slug)}
          onClose={handleClose}
        />
      )}
    </div>
  )
}

export default NotesPage
