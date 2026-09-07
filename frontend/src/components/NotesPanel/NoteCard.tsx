import { formatDate } from "../../helpers"
import type { Note } from "./types"

type NoteCardProps = {
  note: Note
}

function NoteCard({ note }: NoteCardProps) {
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
        <span className="text-xl">...</span>
      </div>
    </article>
  )
}

export default NoteCard