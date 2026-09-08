class Note < ApplicationRecord
  paginates_per 4

  belongs_to :folder, optional: true

  validates :title, :description, presence: true

  scope :active,    -> { where(archived_at: nil) }
  scope :archived,  -> { where.not(archived_at: nil) }
  scope :unfiled,   -> { where(folder_id: nil) }
end
