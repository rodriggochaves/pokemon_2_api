json.array! @pokemons do |pokemon|
  json.id pokemon.id
  json.name pokemon.name
  json.kind pokemon.kind.map(&:description).sort_by{ |m| m }.join('/')
  json.poke_index pokemon.poke_index
  json.evolve_from_id pokemon.evolve_from_id
  json.image_url pokemon.image_url
end
