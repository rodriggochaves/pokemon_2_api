class Pokemon < ApplicationRecord
  has_and_belongs_to_many :kind
  belongs_to :evolve_from, class_name: 'Pokemon', foreign_key: 'evolve_from_id', optional: true

  class << self

    def spawn attrs
      kind = ::Kind.where(description: attrs[:kind])
      new(attrs.merge({kind: kind}))
    end

  end

  def parsed_kind
    kind.map(&:description).sort_by{ |m| m }.join('/')
  end
end
