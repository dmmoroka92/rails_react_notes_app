import type { Note } from "../components/NotesPanel/types"
import { API_HOST } from "../constants/api"
import { apiFetch } from "../lib/api/apiFetch"
import type { NoteFormData, UpdateNoteData } from "../schemas/note.schema"
import type { ApiResponse } from "../types/api"

export function createNote(data: NoteFormData) {
  return apiFetch<ApiResponse<Note>>(`${API_HOST}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      note: data
    })
  })
}

export function updateNote(noteId: string, data: UpdateNoteData) {
  return apiFetch<ApiResponse<Note>>(`${API_HOST}/notes/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      note: data
    })
  })
}

export function deleteNote(noteId: string) {
  return apiFetch<void>(`${API_HOST}/notes/${noteId}`, {
    method: "DELETE"
  })
}

export function deleteNotes(noteIds: string[]) {
  const params = new URLSearchParams()

  noteIds.forEach((noteId) => {
    params.append("note_ids[]", noteId)
  })

  return apiFetch<void>(`${API_HOST}/notes?${params}`, {
    method: "DELETE"
  })
}