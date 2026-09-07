import { useForm } from "react-hook-form";
import InputGroup from "../InputGroup";
import { folderSchema, type FolderFormData } from "../../schemas/folder.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Folder } from "./types";
import { FOLDER_COLORS } from "../../constants/app";
import FolderColorPicker from "./FolderColorPicker";

type FolderFormProps = {
  folder: Folder | null,
  onSubmit: (data: FolderFormData) => void,
  error: Error | null
}

function FolderForm({ folder, onSubmit, error }: FolderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FolderFormData>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      title: folder?.title ?? "",
      color: folder?.color ?? FOLDER_COLORS.blue
    }
  })

  return (
    <form
      id="folder-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
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
          className="rounded-lg border border-gray-300 px-3 py-2
            text-sm outline-none transition focus:border-gray-900 
            focus:ring-1 focus:ring-gray-900"
        />
      </InputGroup>

      <InputGroup
        label="Color"
        htmlFor="color-red"
        error={errors.color?.message}
      >
        <FolderColorPicker register={register} />
      </InputGroup>
    </form>
  )
}

export default FolderForm