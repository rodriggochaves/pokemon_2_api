require 'rails_helper'

RSpec.describe "PokemonsController", type: :request do
  before(:each) do
    response = File.read('spec/lib/poke/mocks/kind.json')
    stub_request(:get, "https://pokeapi.co/api/v2/type").to_return(body: response)
    Poke::Kind.initialize
  end


  describe "#index returns HTTP 200 " do
    before do
      ['bulbasaur', 'ivysaur', 'venasaur'].each { |name| Pokemon.create!(name: name) }
      get '/api'
    end

    it { expect(response).to have_http_status(200) }
    it { expect(JSON.parse(response.body).count).to eq(3) }
  end

  describe 'POST /api/pokemons can create a new pokemon' do
    subject do
      post '/api/pokemons', params: {
        name: 'Mega Charizard',
        kind: 'fire/flying',
        poke_index: 6,
      }
    end

    it 'have HTTP 200' do
      subject
      expect(response).to have_http_status(200)
    end

    it 'store in db' do
      expect { subject }.to change{ Pokemon.count }.by(1)
    end
  end

  describe 'PATCH /api/pokemons/:id can update a pokemon' do
    let(:charizard) do
      Pokemon.create!({
        name: 'Mega Charizard',
        kind: [Kind['fire']],
        poke_index: 6,
      })
    end

    subject do
      patch "/api/pokemons/#{charizard.id}", params: {
        kind: 'fire/flying',
      }
    end

    it 'have HTTP 200' do
      subject
      expect(response).to have_http_status(200)
    end

    it 'update the kind' do
      subject
      charizard.reload
      expect(charizard.kind).to match_array([Kind['fire'], Kind['flying']])
    end
  end
end
