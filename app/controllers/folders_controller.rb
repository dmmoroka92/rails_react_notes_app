class FoldersController < ApplicationController
  include Paginable

  before_action :set_folder, only: %i[show update destroy]

  def index
    @folders = Folder.all

    render json: FolderSerializer.new(@folders).serializable_hash, status: :ok
  end

  def show
    notes = @folder.notes.page(params[:page]).per(10)
    notes = notes.where("title LIKE ?", "%#{params[:q]}%") if params[:q].present?
    
    render json: FolderSerializer.new(
                    @folder,
                    meta: {
                      pagination: pagination_meta(notes)
                    },
                    params: { notes: notes },
                    include: [:notes]
                  ).serializable_hash,
           status: :ok
  end

  def create
    folder = Folder.new(folder_params)

    if folder.save
      render json: FolderSerializer.new(
                      folder,
                      meta: { message: "Folder created successfully." }
                    ).serializable_hash,
             status: :ok
    else

    end
  end

  def update
    if @folder.update(folder_params)
      render json: FolderSerializer.new(
                     @folder,
                     meta: { message: "Folder updated successfully." }
                   ).serializable_hash,
             status: :ok
    else
      render json: { errors: @folder.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @folder.destroy
      render json: {
        meta: { message: "Folder was destroyed successfully." }
      }, status: :ok
    else
      render json: { errors: @folder.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def folder_params
    params.require(:folder).permit(:title, :color)
  end

  def set_folder
    @folder = Folder.find_by!(slug: params[:slug])
  end
end
