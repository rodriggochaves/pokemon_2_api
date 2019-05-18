require "rails_helper"

RSpec.describe Poke::Api do
  before(:all) do
    @real_endpoint = ENV['POKEMON_API']
    ENV['POKEMON_API'] = 'https://pokeapi.co/api/v2'
  end

  after do
    ENV['POKEMON_API'] = @real_endpoint
  end

  it "#query_kanto_pokedex returns all 151 names" do
    response = File.read('spec/lib/poke/mocks/pokedex_kanto.json')
    stub_request(:get, "https://pokeapi.co/api/v2/pokedex/kanto").to_return(body: response)

    pokemon_names = described_class.query_kanto_pokedex
    expect(pokemon_names.count).to eq(151)
  end
end
