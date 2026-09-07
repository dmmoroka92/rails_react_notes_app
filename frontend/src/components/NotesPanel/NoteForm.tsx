import { useForm } from "react-hook-form"
import { noteSchema, type NoteFormData } from "../../schemas/note.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import InputGroup from "../InputGroup"

function NoteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema)
  })

  function onSubmit() {
    console.log("handling submit")
  }

  return (
    <form 
      id="note-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4">
      <InputGroup 
        label={"Title"}
        htmlFor={"title"}
        error={errors.title?.message}>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm 
            outline-none transition focus:border-gray-900 
            focus:ring-1 focus:ring-gray-900"
        />
      </InputGroup>
      
      <InputGroup 
        label={"description"}
        htmlFor={"description"}
        error={errors.description?.message}>
        <textarea
          id="description"
          {...register("description")}
          rows={5}
          className="resize-none rounded-lg border border-gray-300 px-3 py-2 
            text-sm outline-none transition focus:border-gray-900 
            focus:ring-1 focus:ring-gray-900"
        />
      </InputGroup>
    </form>
  )
}

export default NoteForm