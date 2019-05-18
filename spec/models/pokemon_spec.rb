require "rails_helper"

RSpec.describe Pokemon, type: :model do
  before { Poke::Kind.initialize }

  it "can has two types" do
    pokemon = Pokemon.spawn(name: 'bulbasaur', kind: ['grass', 'poison'])
    expect(pokemon.kind.map(&:description)).to eq(['grass', 'poison'])
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
end
