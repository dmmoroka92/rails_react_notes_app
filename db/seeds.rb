Note.delete_all

for i in 0...1_000 do
  Note.create(
    title: "title ##{i + 1}",
    description: "description for note: ##{i + 1}"
  )
end
