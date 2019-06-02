# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Pokemon, type: :model do
  before do
    response = File.read('spec/lib/poke/mocks/kind.json')
    stub_request(:get, 'https://pokeapi.co/api/v2/type').to_return(body: response)
    Poke::Kind.initialize
  end

  it 'can has two types' do
    pokemon = Pokemon.spawn(name: 'bulbasaur', kind: %w[grass poison])
    expect(pokemon.kind.map(&:description)).to match_array(%w[grass poison])
  end

  it '#evolve_from returns a pokemon 1 step behind in evolution tree' do
    bulbasaur = Pokemon.create(name: 'bulbasaur')
    ivysaur = Pokemon.create(name: 'ivysaur', evolve_from: bulbasaur)

    expect(ivysaur.evolve_from).to eq(bulbasaur)
  end

  it '#evolve_from can return nil with is first pokemon' do
    bulbasaur = Pokemon.create(name: 'bulbasaur')

    expect(bulbasaur.evolve_from).to eq(nil)
  end

  it '#parsed_kind returns the kind as a string' do
    bulbasaur = Pokemon.create(name: 'bulbasaur', kind: [Kind['grass'], Kind['poison']])

    expect(bulbasaur.parsed_kind).to eq('grass/poison')
  end
end
