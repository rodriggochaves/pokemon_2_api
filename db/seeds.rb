# frozen_string_literal: true

Poke::Kind.initialize

Poke::Api.query_kanto_pokedex.map do |pokemon|
  pokemon = Poke::Api.find(pokemon)
  evolve_from = Poke::Api.query_evolves_from_species(pokemon.name)
  if evolve_from
    base = Pokemon.find_by(name: evolve_from)
    pokemon.evolve_from = base
  end
  puts "Creating #{pokemon.name}"
  pokemon.save!
end
