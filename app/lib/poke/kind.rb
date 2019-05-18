module Poke
  module Kind
    def Kind.initialize
      kinds = [
        { description: 'grass', color: '#FF0000' },
        { description: 'poison', color: '#FF0000' },
      ]

      kinds.map { |k| ::Kind.create!(k) }
    end
  end
end
