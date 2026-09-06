function FolderCard() {
  const folderNotes = [
    { id: 1, rotation: "-rotate-6" },
    { id: 2, rotation: "rotate-3" },
    { id: 3, rotation: "-rotate-3" },
    { id: 4, rotation: "rotate-2" },
  ]
  
  return (
    <div className="relative h-48 w-full">
      <div className="absolute inset-x-0 bottom-0 h-40 rounded-2xl 
        bg-purple-500 shadow-md">

        {/* Folder tab */}
        <div className="absolute -top-4 left-0 h-7 w-28 rounded-t-xl bg-purple-500" />

        {/* Notes inside folder */}
        {folderNotes.slice(0, 4).map((note, index) => (
          <div
            key={note.id}
            className={`absolute top-[12px] z-10 h-10 w-12 ${note.rotation} rounded-sm bg-white p-1.5 shadow-sm`}
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
        ))}

        {/* Folder front */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-28 rounded-2xl border-t border-purple-700/40 bg-purple-500 px-5 pb-5 pt-4">

          <div className="flex h-full items-end justify-between">

            <div>
              <h3 className="text-xl font-bold text-white">
                Work
              </h3>

              <p className="text-sm text-white/80">
                12 notes
              </p>
            </div>

            <button
              type="button"
              className="text-2xl leading-none text-white/80 hover:text-white"
            >
              ...
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}

export default FolderCard