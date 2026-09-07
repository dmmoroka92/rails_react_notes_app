import Modal from "../../components/Modal/Modal"
import NoteForm from "../../components/NotesPanel/NoteForm"

type NoteModalProps = {
  onClose: () => void
}

function NoteModal({ onClose }: NoteModalProps) {
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
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white 
              shadow-sm transition hover:bg-gray-800 focus:outline-none 
              focus:ring-2 focus:ring-gray-400"
          >
            Create note
          </button>
        </>
      }
      onClose={onClose}>
      <NoteForm />
    </Modal>
  )
}

export default NoteModal