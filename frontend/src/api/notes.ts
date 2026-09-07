import type { Note } from "../components/NotesPanel/types"
import { API_HOST } from "../constants/api"
import { apiFetch } from "../lib/api/apiFetch"
import type { NoteFormData } from "../schemas/note.schema"
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

export function updateNote(noteId: string, data: NoteFormData) {
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