import { useState } from "react"
import FoldersPanel from "../components/FoldersPanel/FoldersPanel"
import { MODAL_TYPE, type ModalType } from "../components/Modal/types"
import NotesPanel from "../components/NotesPanel/NotesPanel"
import Modal from "../components/Modal/Modal"

function NotesPage() {
  const [modal, setModal] = useState<ModalType | null>(null)

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
        <NotesPanel onNewNote={() => setModal(MODAL_TYPE.Note)} />
      </div>

      {modal === MODAL_TYPE.Note && (
        <Modal
          title="New note"
          footer={
            <>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm 
                  font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 
                  focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white 
                  shadow-sm transition hover:bg-gray-800 focus:outline-none 
                  focus:ring-2 focus:ring-gray-400"
              >
                Create note
              </button>
            </>
          }
          onClose={handleClose}>
          <p>folder form here</p>
        </Modal>
      )}

      {modal === MODAL_TYPE.Folder && (
        <Modal
          title="New folder"
          footer={
            <>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 
                  transition hover:bg-gray-100 hover:text-gray-900"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium 
                  text-white transition hover:bg-gray-800"
              >
                Create folder
              </button>
            </>
          }
          onClose={handleClose}>
          <p>folder form here</p>
        </Modal>
      )}
    </div>
  )
}

export default NotesPage