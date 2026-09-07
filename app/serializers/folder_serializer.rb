class FolderSerializer
  include JSONAPI::Serializer
  attributes :title, :color, :created_at, :updated_at

  attribute :notes_count do |folder|
    folder.notes.count
  end
end
