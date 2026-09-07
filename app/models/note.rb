class Note < ApplicationRecord
  validates :title, :description, presence: true

  belongs_to :folder, optional: true
end
