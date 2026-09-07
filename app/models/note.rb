class Note < ApplicationRecord
  validates :title, :description, presence: true
end
