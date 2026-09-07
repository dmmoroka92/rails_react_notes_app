import { z } from "zod"

export const noteSchema = z.object({
  title: z.string().min(1, "is required"),
  description: z.string().min(1, "is required")
})

export type NoteFormData = z.infer<typeof noteSchema>

export type UpdateNoteData = {
  title?: string
  description?: string
  folderId?: string | null
}