json.array! @pokemons do |pokemon|
  json.id pokemon.id
  json.name pokemon.name
  json.kind1 pokemon.kind1
  json.kind2 pokemon.kind2
  json.poke_index pokemon.poke_index
  json.evolve_from_id pokemon.evolve_from_id
  json.image_url pokemon.image_url
  json.evolutions pokemon.evolutions do |evolution|
    json.id evolution.id
    json.name evolution.name
  end
end
