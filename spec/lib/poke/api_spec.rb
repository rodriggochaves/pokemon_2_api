require "rails_helper"

RSpec.describe Poke::Api do
  before(:each) do
    @real_endpoint = ENV['POKEMON_API']
    ENV['POKEMON_API'] = 'https://pokeapi.co/api/v2'
    response = File.read('spec/lib/poke/mocks/kind.json')
    stub_request(:get, "https://pokeapi.co/api/v2/type").to_return(body: response)
    Poke::Kind.initialize
  end

  after do
    ENV['POKEMON_API'] = @real_endpoint
  end

  describe "#find returns a pokemon" do
    before do
      response = File.read('spec/lib/poke/mocks/pokemon_1.json')
      stub_request(:get, "https://pokeapi.co/api/v2/pokemon/1").to_return(body: response)
    end

    subject(:pokemon) { described_class.find(1) }

    it { expect(pokemon.name).to eq("bulbasaur") }
    it { expect(pokemon.poke_index).to eq(1) }
  end

  it "#query_kanto_pokedex returns all 151 names" do
    response = File.read('spec/lib/poke/mocks/pokedex_kanto.json')
    stub_request(:get, "https://pokeapi.co/api/v2/pokedex/kanto").to_return(body: response)

    pokemon_names = described_class.query_kanto_pokedex
    expect(pokemon_names.count).to eq(151)
  end

  it '#query_evolves_from_species returns nil if dont exists' do
    response = File.read('spec/lib/poke/mocks/pokemon_species_1.json')
    stub_request(:get, "https://pokeapi.co/api/v2/pokemon-species/bulbasaur").to_return(body: response)

    base_species = described_class.query_evolves_from_species('bulbasaur')
    expect(base_species).to eq(nil)
  end

  it '#query_evolves_from_species returns the name of the base pokemon' do
    response = File.read('spec/lib/poke/mocks/pokemon_species_2.json')
    stub_request(:get, "https://pokeapi.co/api/v2/pokemon-species/ivysaur").to_return(body: response)

    base_species = described_class.query_evolves_from_species('ivysaur')
    expect(base_species).to eq('bulbasaur')
  end

  describe '#kinds returns all kinds' do
    before(:each) do
      response = File.read('spec/lib/poke/mocks/kind.json')
      stub_request(:get, "https://pokeapi.co/api/v2/type").to_return(body: response)
    end

    subject { described_class.kinds }

    it { expect(subject.count).to eq(20) }
    it { expect(subject.map(&:class).inject(true) { |acc, klass| acc && klass == Kind }).to eq(true) }
  end
end
