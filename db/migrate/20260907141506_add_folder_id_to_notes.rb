class AddFolderIdToNotes < ActiveRecord::Migration[8.0]
  def change
    add_reference :notes, :folder, null: true, foreign_key: true
  end
end
