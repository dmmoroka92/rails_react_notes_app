export const MODAL_TYPE = {
  Note: "note",
  Folder: "folder",
  ConfirmNote: "confirmNote",
  ConfirmFolder: "conformFolder"
} as const;

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE]