class Note < ApplicationRecord
  paginates_per 4

  belongs_to :folder, optional: true

  validates :title, :description, presence: true

  scope :unfiled, -> { where(folder_id: nil) }
end
