# frozen_string_literal: true

module Poke
  module Api
    def self.query_kanto_pokedex
      response = RestClient.get("#{ENV['POKEMON_API']}/pokedex/kanto")
      parsed_response = JSON.parse(response.body)
      pokemons = parsed_response['pokemon_entries'].map do |entry|
        entry['pokemon_species']['name']
      end
    end

    def self.find(index)
      response = RestClient.get("#{ENV['POKEMON_API']}/pokemon/#{index}")
      parsed_response = JSON.parse(response.body)
      pokemon_data = {
        name: parsed_response['name'],
        kind: extract_kind(parsed_response),
        poke_index: extract_poke_index(parsed_response),
        image_url: parsed_response['sprites']['front_default']
      }
      Pokemon.new(pokemon_data)
    end

    def self.extract_kind(response)
      response['types'].map do |t|
        description = t['type']['name']
        ::Kind[description]
      end
    end

    def self.extract_poke_index(response)
      response['game_indices']
        .find { |index| index['version']['name'] == 'firered' }['game_index']
    end

    def self.query_evolves_from_species(name)
      response = RestClient.get("#{ENV['POKEMON_API']}/pokemon-species/#{name}")
      parsed_response = JSON.parse(response.body)
      if parsed_response['evolves_from_species']
        parsed_response['evolves_from_species']['name']
      end
    end

    def self.kinds
      response = RestClient.get("#{ENV['POKEMON_API']}/type")
      parsed_response = JSON.parse(response.body)

      parsed_response['results'].map { |k| ::Kind.new(description: k['name']) }
    end
  end
end
