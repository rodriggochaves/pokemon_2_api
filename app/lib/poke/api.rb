module Poke
  module Api
    def Api.query_kanto_pokedex
      response = RestClient.get("#{ENV['POKEMON_API']}/pokedex/kanto")
      parsed_response = JSON.parse(response.body)
      pokemons = parsed_response["pokemon_entries"].map do |entry|
        entry["pokemon_species"]["name"]
      end
    end

    def Api.find(index)
      response = RestClient.get("#{ENV['POKEMON_API']}/pokemon/#{index}")
      parsed_response = JSON.parse(response.body)
      pokemon_data = {
        name: parsed_response['name'],
        kind: extract_kind(parsed_response),
        poke_index: extract_poke_index(parsed_response)
      }
      Pokemon.new(pokemon_data)
    end

    def Api.extract_kind(response)
      response['types'].map { |t| t['type']['name'] }.join('/')
    end

    def Api.extract_poke_index(response)
      response["game_indices"]
        .find{ |index| index["version"]["name"] == 'firered' }['game_index']
    end
  end
end
