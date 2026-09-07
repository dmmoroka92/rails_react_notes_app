import type { Folder } from "../components/FoldersPanel/types";
import { API_HOST } from "../constants/api";
import { apiFetch } from "../lib/api/apiFetch";
import type { FolderFormData } from "../schemas/folder.schema";
import type { ApiResponse } from "../types/api";

export function createFolder(data: FolderFormData) {
  return apiFetch<ApiResponse<Folder>>(`${API_HOST}/folders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      folder: data
    })
  })
}

export function updateFolder(slug: string, data: FolderFormData) {
  return apiFetch<ApiResponse<Folder>>(`${API_HOST}/folders/${slug}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      folder: data
    })
  })
}

export function deleteFolder(slug: string) {
  return apiFetch<void>(`${API_HOST}/folders/${slug}`, {
    method: "DELETE"
  })
}