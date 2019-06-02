# frozen_string_literal: true

class Pokemon < ApplicationRecord
  has_and_belongs_to_many :kind
  belongs_to :evolve_from, class_name: 'Pokemon', foreign_key: 'evolve_from_id', optional: true

  class << self
    def spawn(attrs)
      kind = ::Kind.where(description: attrs[:kind])
      new(attrs.merge(kind: kind))
    end
  end

  def parsed_kind
    kind.map(&:description).sort.join('/')
  end

  def kind1
    kind.map(&:description).min_by { |m| m }
  end

  def kind2
    kind.map(&:description).max_by { |m| m }
  end

  def evolutions
    next_evolution = Pokemon.where(evolve_from_id: id)
    next_evolution + Pokemon.where(evolve_from_id: next_evolution)
  end
end
