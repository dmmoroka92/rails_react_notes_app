import FolderCard from "./FolderCard"
import FoldersHeader from "./FoldersHeader"

type FoldersPanelProps = {
  onNewFolder: () => void
}

function FoldersPanel({ onNewFolder }: FoldersPanelProps) {
  return (
    <aside>
      <FoldersHeader onNewFolder={onNewFolder} />

      <div className="flex max-h-[calc(100vh-200px)] flex-col gap-3 overflow-y-auto">
        <FolderCard />
        <FolderCard />
        <FolderCard />
      </div>
    </aside>
  )
}

export default FoldersPanel