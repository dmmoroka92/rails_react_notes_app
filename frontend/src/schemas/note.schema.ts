import { z } from "zod"

export const noteSchema = z.object({
  title: z.string()
          .min(1, "is required")
          .max(20, "could be 20 chars length"),
  description: z.string()
                .min(1, "is required")
                .max(200, "could be max 200 chars")
})

export type NoteFormData = z.infer<typeof noteSchema>

export type UpdateNoteData = {
  title?: string
  description?: string
  folderId?: string | null
}