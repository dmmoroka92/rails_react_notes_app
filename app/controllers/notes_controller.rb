class NotesController < ApplicationController
  def index
    @notes = Note.all

    render json: NoteSerializer.new(@notes).serializable_hash, status: :ok
  end

  def create
    note = Note.new(note_params)

    if note.save
      render json: NoteSerializer.new(note)
                                 .serializable_hash(
                                   message: "Note created successfully."
                                 ), status: :ok
    else
      render json: { errors: note.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def note_params
    params.require(:note).permit(:title, :description)
  end
end
