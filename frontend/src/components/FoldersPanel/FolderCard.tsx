import { useState } from "react"

import type { Folder } from "./types"

type FolderCardProps = {
  folder: Folder
  onEdit: (folder: Folder) => void
  onDelete: (folder: Folder) => void
}

const MAX_VISIBLE_NOTE_THUMBNAILS = 4

const NOTE_THUMBNAIL_ROTATIONS = [
  "-rotate-6",
  "rotate-3",
  "-rotate-3",
  "rotate-2",
]

function FolderCard({ folder, onEdit, onDelete }: FolderCardProps) {
  const visibleNoteThumbnailsNum = Math.min(
    folder.notesCount,
    MAX_VISIBLE_NOTE_THUMBNAILS,
  )

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <div className="relative h-48 w-full">
      <div
        className={`absolute inset-x-0 bottom-0 h-40 rounded-2xl
         bg-${folder.color}-500 shadow-md`}
      >
        {/* Folder tab */}
        <div
          className={`absolute -top-4 left-0 h-7 w-28 rounded-t-xl 
            bg-${folder.color}-500`}
        />

        {/* Notes inside folder */}
        {Array.from({ length: visibleNoteThumbnailsNum }).map((_, index) => {
          const rotation =
            NOTE_THUMBNAIL_ROTATIONS[
              index % NOTE_THUMBNAIL_ROTATIONS.length
            ]

          return (
            <div
              key={index}
              className={`
                absolute top-[12px] z-10 h-10 w-12 ${rotation}
                rounded-sm bg-white p-1.5 shadow-sm
              `}
              style={{
                left: `${32 + index * 48}px`,
              }}
            >
              <div className="space-y-1">
                <div className="h-1 w-6 rounded-full bg-gray-200" />
                <div className="h-1 w-8 rounded-full bg-gray-200" />
                <div className="h-1 w-5 rounded-full bg-gray-100" />
              </div>
            </div>
          )
        })}

        {/* Folder front */}
        <div
          className={`
            absolute inset-x-0 bottom-0 z-20 h-28 rounded-2xl
            border-t border-${folder.color}-700/40 bg-${folder.color}-500
            px-5 pb-5 pt-4
          `}
        >
          <div className="flex h-full items-end justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                {folder.title}
              </h3>

              <p className="text-sm text-white/80">
                {folder.notesCount} notes
              </p>
            </div>

            {/* Actions */}
            <div className="relative">
              <button
                type="button"
                className="text-2xl leading-none text-white/80 hover:text-white"
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                ...
              </button>

              {isMenuOpen && (
                <div
                  className="
                    absolute bottom-full right-0 z-20 mb-2 w-32
                    overflow-hidden rounded-xl border border-gray-200
                    bg-white py-1 shadow-lg
                  "
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false)
                      onEdit(folder)
                    }}
                    className="
                      w-full px-4 py-2 text-left text-sm
                      text-gray-700 hover:bg-gray-100
                    "
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false)
                      onDelete(folder)
                    }}
                    className="
                      w-full px-4 py-2 text-left text-sm
                      text-red-600 hover:bg-red-50
                    "
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FolderCard