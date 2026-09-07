import { useMutation } from "@tanstack/react-query"
import FolderForm from "../../components/FoldersPanel/FolderForm"
import type { Folder } from "../../components/FoldersPanel/types"
import Modal from "../../components/Modal/Modal"
import { createFolder, updateFolder } from "../../api/folders"
import { toast } from "sonner"
import queryClient from "../../lib/queryClient"
import { FOLDERS } from "../../constants/queryKeys"
import type { FolderFormData } from "../../schemas/folder.schema"

type FolderModalProps = {
  folder: Folder
  onClose: () => void
}

type UpdateFolderParams = {
  folderId: string
  data: FolderFormData
}

function FolderModal({ folder, onClose }: FolderModalProps) {
  const createFolderMutation = useMutation({
    mutationFn: createFolder,
    onSuccess: (response) => {
      toast.success(response.meta?.message ?? "Folder created successfully")

      queryClient.invalidateQueries({
        queryKey: [FOLDERS]
      })

      onClose()
    }
  })

  const updateFolderMutation = useMutation({
    mutationFn: ({ folderId, data }: UpdateFolderParams) =>
      updateFolder(folderId, data),
  
    onSuccess: (response) => {
      toast.success(
        response.meta?.message ?? "Folder updated successfully"
      )
  
      queryClient.invalidateQueries({
        queryKey: [FOLDERS],
      })
  
      onClose()
    },
  })

  const {
    isPending: isCreatePending,
    error: createError
  } = createFolderMutation
  const {
    isPending: isUpdatePending,
    error: updateError
  } = updateFolderMutation
  const isEditMode = folder !== null
  const isNoteMutationPending = isCreatePending || isUpdatePending
  const folderMutationError = createError ?? updateError
  const submitLabel = isNoteMutationPending
  ? isEditMode
    ? "Updating folder..."
    : "Creating folder..."
  : isEditMode
    ? "Update folder"
    : "Create folder"

  return (
    <Modal
      title={folder ? "Update folder" : "New folder"}
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
            form="folder-form"
            disabled={isCreatePending}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium 
              text-white transition hover:bg-gray-800"
          >
            {submitLabel}
          </button>
        </>
      }
      onClose={onClose}
    >  
      <FolderForm
        folder={folder}
        onSubmit={(data) => {
          if (isEditMode) {
            updateFolderMutation.mutate({ folderId: folder.id, data })
          } else {
            createFolderMutation.mutate(data)
          }
        }}
        error={folderMutationError} 
      />
    </Modal>
  )
}

export default FolderModal