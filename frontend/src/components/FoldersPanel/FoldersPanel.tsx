import FolderCard from "./FolderCard"
import FoldersHeader from "./FoldersHeader"

import type { Folder } from "./types"

type FoldersPanelProps = {
  isLoading: boolean
  error: Error | null
  folders: Folder[]
  onNewFolder: () => void
  onEditFolder: (folder: Folder) => void
  onDeleteFolder: (folder: Folder) => void
  onNoteDrop: (noteId: string, slug: string) => void
}

function FoldersPanel({
  isLoading,
  error,
  folders,
  onNewFolder,
  onEditFolder,
  onDeleteFolder,
  onNoteDrop
}: FoldersPanelProps) {
  return (
    <aside>
      <FoldersHeader onNewFolder={onNewFolder} />

      <div className="flex max-h-[calc(100vh-200px)] flex-col gap-3 overflow-y-auto">
        {isLoading && (
          <>
            <div className="h-32 animate-pulse rounded-2xl bg-gray-200" />
            <div className="h-32 animate-pulse rounded-2xl bg-gray-200" />
            <div className="h-32 animate-pulse rounded-2xl bg-gray-200" />
          </>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">
              Failed to load folders.
            </p>
          </div>
        )}

        {!isLoading && !error && folders.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white px-4 py-6 text-center">
            <p className="text-sm text-gray-500">
              No folders yet.
            </p>
          </div>
        )}

        {!isLoading &&
          !error &&
          folders.map((folder) => (
            <FolderCard
              key={folder.id}
              folder={folder}
              onEdit={onEditFolder}
              onDelete={onDeleteFolder}
              onNoteDrop={onNoteDrop}
            />
          ))}
      </div>
    </aside>
  )
}

export default FoldersPanel
