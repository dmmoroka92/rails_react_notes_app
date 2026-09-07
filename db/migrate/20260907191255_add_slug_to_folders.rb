class AddSlugToFolders < ActiveRecord::Migration[8.0]
  def change
    add_column :folders, :slug, :string

    Folder.reset_column_information

    Folder.find_each do |folder|
      folder.update_columns(slug: folder.title.parameterize)
    end

    change_column_null :folders, :slug, false

    add_index :folders, :slug, unique: true
  end
end