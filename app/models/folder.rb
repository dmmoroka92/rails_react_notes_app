class Folder < ApplicationRecord
  COLORS = %w[
    blue
    red
    yellow
    purple
    green
  ].freeze

  has_many :notes, dependent: :destroy

  validates :title, presence: true
  validates :color, inclusion: { in: COLORS }

  before_create :generate_slug

  private

  def generate_slug
    self.slug = title.parameterize
  end
end