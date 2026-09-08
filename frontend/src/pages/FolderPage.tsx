import { useNavigate, useParams } from "react-router"

import type { FolderWithNotes } from "../components/FoldersPanel/types"
import { API_HOST } from "../constants/api"
import { apiFetch } from "../lib/api/apiFetch"

import { useQuery } from "@tanstack/react-query"
import { formatDate } from "../helpers"

function FolderPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  async function fetchFolder(slug: string) {
    const response = await apiFetch<FolderWithNotes>(
      `${API_HOST}/folders/${slug}`,
    )

    return response.data
  }

  const {
    data: folder,
    error,
    isPending,
  } = useQuery({
    queryKey: ["folder", slug],
    queryFn: () => fetchFolder(slug!),
  })

  if (isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading folder...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-2">
        <p className="text-sm font-medium text-red-600">
          Failed to load folder.
        </p>

        <p className="text-sm text-gray-500">
          {error.message}
        </p>
      </div>
    )
  }

  const isEmpty = folder.notes.length === 0

  return (
    <div className="flex flex-col gap-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="w-fit text-sm font-medium text-gray-500 
          transition hover:text-gray-900"
      >
        ← Back to notes
      </button>

      {/* Folder info */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center 
            rounded-xl bg-purple-100">
            <span className="text-3xl">📁</span>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {folder.title}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {folder.notesCount} notes
            </p>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Notes
          </h2>
        </div>

        {isEmpty ? (
          <div className="flex min-h-48 flex-col items-center justify-center
            rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="mb-3 text-4xl">
              📝
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              No notes in this folder
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Move a note here to see it in this folder.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {folder.notes.map((note) => (
              <article
                key={note.id}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  {note.title}
                </h3>

                <p className="whitespace-pre-wrap text-sm text-gray-500">
                  {note.description}
                </p>

                <p className="mt-4 text-xs font-medium text-gray-400">
                  {formatDate(note.createdAt)}
                </p>
              </article>

            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default FolderPage
