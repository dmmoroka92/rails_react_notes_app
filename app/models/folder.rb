class Folder < ApplicationRecord
  COLORS = %w[
    blue
    red
    yellow
    purple
    green
  ].freeze

  validates :title, presence: true
  validates :color, inclusion: { in: COLORS }

  has_many :notes, dependent: :destroy
end
