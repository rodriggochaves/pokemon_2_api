require "rails_helper"

RSpec.describe Poke::Api do
  it "#find returns a pokemon" do
    response = File.read('spec/lib/poke/mocks/pokemon_1.json')
    stub_request(:get, "https://pokeapi.co/api/v2/pokemon/1").to_return(body: response)

    pokemon = described_class.find(1)
    expect(pokemon.name).to eq("bulbasaur")
  end
end
