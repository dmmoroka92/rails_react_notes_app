import { useQuery } from "@tanstack/react-query"
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
import type { ApiResponse } from "../../types/api"

function NotesPage() {
  const [modal, setModal] = useState<ModalType | null>(null)

  const { data: notes, error, isFetching } = useQuery({
    queryKey: [NOTES],
    queryFn: fetchNotes
  })

  async function fetchNotes() {
    const response =  await apiFetch<ApiResponse<Note[]>>(`${API_HOST}/notes`)

    return response.data
  }

  function handleClose() {
    setModal(null)
  }

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
        />
      </div>

      {modal === MODAL_TYPE.Note && <NoteModal onClose={handleClose} />}

      {modal === MODAL_TYPE.Folder && <FolderModal onClose={handleClose} />}
    </div>
  )
}

export default NotesPage
