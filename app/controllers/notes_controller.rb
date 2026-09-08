class NotesController < ApplicationController
  include Paginable

  before_action :set_note, only: %i[update destroy], if: -> { params[:id].present? }

  def index
    notes = Note.unfiled.active.page(params[:page])
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
    if params[:note_ids].present?
      destroy_multiple
    else
      destroy_one
    end
  end

  def archive
    notes = Note.where(id: params[:note_ids])
  
    if notes.empty?
      return render json: {
        meta: {
          message: "No notes found."
        }
      }, status: :not_found
    end
  
    notes.update_all(archived_at: Time.current)
  
    render json: {
      meta: {
        message: "Notes were archived successfully."
      }
    }, status: :ok
  end

  private

  def note_params
    params.require(:note).permit(:title, :description, :folder_id)
  end

  def set_note
    @note = Note.find(params[:id])
  end

  def destroy_one
    if @note.destroy
      render json: {
        meta: { message: "Note was destroyed successfully." }
      }, status: :ok
    else
      render json: {
        errors: @note.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
  
  def destroy_multiple
    notes = Note.where(id: params[:note_ids])
  
    if notes.empty?
      return render json: {
        meta: { message: "No notes found." }
      }, status: :not_found
    end
  
    notes.destroy_all
  
    render json: {
      meta: { message: "Notes were destroyed successfully." }
    }, status: :ok
  end
end
