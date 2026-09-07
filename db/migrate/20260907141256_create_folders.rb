class CreateFolders < ActiveRecord::Migration[8.0]
  def change
    create_table :folders do |t|
      t.string :title, null: false
      t.string :color, null: false, default: "blue"

      t.timestamps
    end
  end
end
