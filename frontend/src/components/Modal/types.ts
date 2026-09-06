export const MODAL_TYPE = {
  Note: "note",
  Folder: "folder",
} as const;

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE]