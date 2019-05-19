require 'rails_helper'

RSpec.describe Poke::Kind do
  before(:each) do
    response = File.read('spec/lib/poke/mocks/kind.json')
    stub_request(:get, "https://pokeapi.co/api/v2/type").to_return(body: response)
    Poke::Kind.initialize
  end

  it '#parse with one valid type' do
    kinds = Poke::Kind.parse("fire")
    expect(kinds).to include(Kind["fire"])
  end

  it '#parse with two valid types' do
    kinds = Poke::Kind.parse("fire/flying")
    expect(kinds).to include(Kind["fire"], Kind["flying"])
  end
end
