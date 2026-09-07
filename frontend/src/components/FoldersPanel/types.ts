import { FOLDER_COLORS } from "../../constants/app"
import type { Note } from "../NotesPanel/types"

export type FolderColor =
  (typeof FOLDER_COLORS)[keyof typeof FOLDER_COLORS]

export type Folder = {
  id: string
  title: string
  slug: string
  color: FolderColor
  notesCount: number
}

export type FolderWithNotes = Folder & {
  notes: Note[]
}