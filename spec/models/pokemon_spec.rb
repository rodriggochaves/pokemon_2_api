require "rails_helper"

RSpec.describe Pokemon, type: :model do
  before { Poke::Kind.initialize }

  it "can has two types" do
    pokemon = Pokemon.spawn(name: 'bulbasaur', kind: ['grass', 'poison'])
    expect(pokemon.kind.map(&:description)).to eq(['grass', 'poison'])
  end
end
