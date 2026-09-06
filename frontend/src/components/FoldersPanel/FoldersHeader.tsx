type FoldersHeaderProps = {
  onNewFolder: () => void
}

function FoldersHeader({ onNewFolder }: FoldersHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold">Folders</h2>

      <button
        type="button"
        onClick={onNewFolder}
        className="rounded-lg px-3 py-1.5 text-sm font-medium 
          text-gray-600 hover:bg-gray-200"
      >
        + New
      </button>
    </div>
  )
}

export default FoldersHeader