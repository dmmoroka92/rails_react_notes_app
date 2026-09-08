import React, { useContext, useState } from "react"

import { formatDate } from "../../helpers"

import type { Note } from "./types"
import NoteSelectionContext from "../../contexts/NotesSelectionContext"

type NoteCardProps = {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (note: Note) => void
}

const NoteCard = React.memo(function NoteCard({
  note,
  onEdit,
  onDelete,
}: NoteCardProps) {
  const context = useContext(NoteSelectionContext)

  if (!context) {
    throw new Error("Note must be used inside NoteSelectionContextProvider")
  }
  
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const { isNoteSelected, toggleSelect } = context
  

  function handleDragStart(event: React.DragEvent) {
    event.dataTransfer.setData("text/plain", note.id)
  }

  return (
    <article
      draggable
      onDragStart={handleDragStart}
      className="relative rounded-3xl bg-white p-6 shadow-sm"
    >
      <div className="mb-3 flex items-center gap-2">
        {/* Drag handle */}
        <div
          className="cursor-grab rounded-lg p-1 text-gray-300
            transition hover:bg-gray-100 hover:text-gray-500
            active:cursor-grabbing"
          aria-label="Drag note"
        >
          <span aria-hidden="true">⋮⋮</span>
        </div>

        {/* Checkbox */}
        <label className="cursor-pointer">
          <input
            type="checkbox"
            checked={isNoteSelected(note.id)}
            onChange={() => toggleSelect(note.id)}
            className="h-4 w-4 cursor-pointer rounded-full border-gray-300"
          />
        </label>

        {/* Title */}
        <h3 className="truncate text-xl font-bold">
          {note.title}
        </h3>
      </div>

      <p className="line-clamp-4 text-sm leading-relaxed text-gray-500">
        {note.description}
      </p>

      <div
        className="mt-6 flex items-center justify-between text-sm
          font-medium text-gray-400"
      >
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
            <div
              className="absolute bottom-full right-0 z-20 mb-2 w-32
                overflow-hidden rounded-xl border border-gray-200
                bg-white py-1 shadow-lg"
            >
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
})

export default NoteCard
