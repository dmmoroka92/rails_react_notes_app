import { useState } from "react"
import { formatDate } from "../../helpers"
import type { Note } from "./types"

type NoteCardProps = {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (note: Note) => void
}

function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-3 text-xl font-bold">
        {note.title}
      </h3>

      <p className="line-clamp-4 text-sm leading-relaxed text-gray-500">
        {note.description}
      </p>

      <div className="mt-6 flex items-center justify-between text-sm 
        font-medium text-gray-400">
        <span>{formatDate(note.createdAt)}</span>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-lg px-2 py-1 text-xl leading-none text-gray-400
              transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Note actions"
            aria-expanded={isMenuOpen}
          >
            ...
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 bottom-full z-20 mb-2 w-32
              overflow-hidden rounded-xl border border-gray-200 
              bg-white py-1 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  onEdit(note)
                }}
                className="w-full px-4 py-2 text-left text-sm 
                  text-gray-700 hover:bg-gray-100"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  onDelete(note)
                }}
                className="w-full px-4 py-2 text-left text-sm 
                  text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default NoteCard
