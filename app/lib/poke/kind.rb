# frozen_string_literal: true

module Poke
  module Kind
    def self.initialize
      Poke::Api.kinds.each(&:save!)
    end

    def self.parse(kind_string)
      return [] unless kind_string

      parsed_string = kind_string.split('/')
      ::Kind.where(description: parsed_string)
    end
  end
end
