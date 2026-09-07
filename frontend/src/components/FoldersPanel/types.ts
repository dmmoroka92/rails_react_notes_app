import { FOLDER_COLORS } from "../../constants/app"

export type FolderColor =
  (typeof FOLDER_COLORS)[keyof typeof FOLDER_COLORS]

export type Folder = {
  id: string
  title: string
  color: FolderColor
  notesCount: number
}