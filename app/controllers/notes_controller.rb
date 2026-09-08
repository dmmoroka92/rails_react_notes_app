class NotesController < ApplicationController
  include Paginable

  before_action :set_note, only: %i[update destroy]

  def index
    notes = Note.unfiled.page(params[:page])
    notes = notes.where("title LIKE ?", "%#{params[:q]}%") if params[:q].present?

    render json: NoteSerializer.new(
                  notes,
                  meta: {
                    pagination: pagination_meta(notes)
                  }  
                ).serializable_hash,
           status: :ok
  end

  def create
    note = Note.new(note_params)

    if note.save
      render json: NoteSerializer.new(
                     note,
                     meta: { message: "Note created successfully." }
                   ).serializable_hash,
             status: :ok
    else
      render json: { errors: note.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @note.update(note_params)
      render json: NoteSerializer.new(
        @note,
        meta: { message: "Note updated successfully." }
      ).serializable_hash,
      status: :ok
    else
      render json: { errors: @note.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @note.destroy
      render json: {
        meta: { message: "Note was destroyed successfully." }
      }, status: :ok
    else
      render json: { errors: @note.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def note_params
    params.require(:note).permit(:title, :description, :folder_id)
  end

  def set_note
    @note = Note.find(params[:id])
  end
end
