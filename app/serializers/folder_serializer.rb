class FolderSerializer
  include JSONAPI::Serializer
  attributes :title, :color, :slug, :created_at, :updated_at

  attribute :notes_count do |folder|
    folder.notes.count
  end

  has_many :notes
end
