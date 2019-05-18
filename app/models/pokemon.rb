class Pokemon < ApplicationRecord
  has_and_belongs_to_many :kind
  belongs_to :evolve_from, class_name: 'Pokemon', foreign_key: 'evolve_from_id'

end
