import Modal from "./Modal/Modal"

type ConfirmModalProps = {
  title: string
  message: string
  onConfirm: () => void
  onClose: () => void
}

function ConfirmModal({ 
  title, 
  message, 
  onConfirm, 
  onClose 
}: ConfirmModalProps) {
  return (
    <Modal
      title={title}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium
              text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium 
              text-white transition hover:bg-red-700 focus:outline-none 
              focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </>
      }
    >
      <p>{message}</p>
    </Modal>
  )
}

export default ConfirmModal