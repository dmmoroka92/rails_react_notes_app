export const MODAL_TYPE = {
  Note: "note",
  Folder: "folder",
  Confirm: "confirm"
} as const;

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE]