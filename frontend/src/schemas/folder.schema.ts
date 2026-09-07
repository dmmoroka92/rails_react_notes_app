import { z } from "zod"
import { FOLDER_COLORS } from "../constants/app"

export const folderSchema = z.object({
  title: z.string().min(1, "is required"),
  color: z.enum(Object.values(FOLDER_COLORS), "is required")
})

export type FolderFormData = z.infer<typeof folderSchema>