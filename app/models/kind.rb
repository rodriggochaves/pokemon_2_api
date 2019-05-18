class Kind < ApplicationRecord
  has_and_belongs_to_many :pokemon

  class << self
    def [] description
      Kind.find_by(description: description)
    end
  end
end
