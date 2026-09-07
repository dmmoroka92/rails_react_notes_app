class NoteSerializer
  include JSONAPI::Serializer
  
  attributes :title, :description, :created_at, :updated_at
end
