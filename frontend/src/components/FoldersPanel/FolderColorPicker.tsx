import type { UseFormRegister } from "react-hook-form"
import { FOLDER_COLORS } from "../../constants/app"
import type { FolderFormData } from "../../schemas/folder.schema"

type FolderColorPickerProps = {
  register: UseFormRegister<FolderFormData>
}

function FolderColorPicker({ register }: FolderColorPickerProps) {
 return (
    <fieldset>
       <div className="flex gap-3">
        {
                  
          Object.values(FOLDER_COLORS).map(color => {
            return (
              <label className="cursor-pointer">
                <input
                  id={`color-${color}`}
                  type="radio"
                  value={color}
                  {...register("color")}
                  className="peer sr-only"
                />
                <span className={
                  [
                    "block h-8 w-8 rounded-full ring-offset-2",
                    "transition peer-checked:ring-2 peer-checked:ring-gray-900",
                    "hover:scale-110",
                    `bg-${color}-500`
                  ].join(" ")
                } />
              </label>
            )
          })
        }
      </div>
    </fieldset>
 )
}

export default FolderColorPicker