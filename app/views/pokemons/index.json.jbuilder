json.array! @pokemons do |pokemon|
  json.id pokemon.id
  json.name pokemon.name
  json.kind pokemon.parsed_kind
  json.poke_index pokemon.poke_index
  json.evolve_from_id pokemon.evolve_from_id
  json.image_url pokemon.image_url
end
