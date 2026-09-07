import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { noteSchema, type NoteFormData } from "../../schemas/note.schema"
import InputGroup from "../InputGroup"

type NoteFormProps = {
  onSubmit: (data: NoteFormData) => void
  error: Error | null
}

function NoteForm({
  onSubmit,
  error,
}: NoteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
  })

  return (
    <form
      id="note-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-sm text-red-600">
            {error.message}
          </p>
        </div>
      )}

      <InputGroup
        label="Title"
        htmlFor="title"
        error={errors.title?.message}
      >
        <input
          id="title"
          type="text"
          {...register("title")}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
        />
      </InputGroup>

      <InputGroup
        label="Description"
        htmlFor="description"
        error={errors.description?.message}
      >
        <textarea
          id="description"
          {...register("description")}
          rows={5}
          className="resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
        />
      </InputGroup>
    </form>
  )
}


export default NoteForm