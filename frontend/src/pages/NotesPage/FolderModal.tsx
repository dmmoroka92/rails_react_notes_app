import Modal from "../../components/Modal/Modal"

type FolderModalProps = {
  onClose: () => void
}

function FolderModal({ onClose }: FolderModalProps) {
  return (
    <Modal
      title="New folder"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
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
      onClose={onClose}>
      <p>folder form here</p>
    </Modal>
  )
}

export default FolderModal