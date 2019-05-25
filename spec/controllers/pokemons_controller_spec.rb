require 'rails_helper'

RSpec.describe "PokemonsController", type: :request do
  before(:each) do
    response = File.read('spec/lib/poke/mocks/kind.json')
    stub_request(:get, "https://pokeapi.co/api/v2/type").to_return(body: response)
    Poke::Kind.initialize
  end

  describe "#index returns HTTP 200 " do
    before do
      # improve this with factories
      [['bulbasaur', 1], ['ivysaur', 2], ['venasaur', 3]].each do |poke|
        Pokemon.create!(name: poke[0], kind: [Kind['grass'], Kind['poison']], poke_index: poke[1],
                        image_url: "http://image.com")
      end
      get '/api'
    end

    it { expect(response).to have_http_status(200) }
    it { expect(JSON.parse(response.body).count).to eq(3) }
    it "follows interface" do
      parsed = JSON.parse(response.body)
      bulbasaur = Pokemon.find_by(name: 'bulbasaur')
      expect(parsed[0]).to eq({
        id: bulbasaur.id,
        name: 'bulbasaur',
        kind: 'grass/poison',
        poke_index: 1,
        evolve_from_id: nil,
        image_url: 'http://image.com'
      }.stringify_keys)
    end
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

  describe 'GET /api/pokemons/:id' do
    let(:bulbasaur) { create(:bulbasaur) }
    let(:ivysaur) { create(:ivysaur) }
    let(:venosaur) { create(:venosaur) }

    before do
      ivysaur.update(evolve_from: bulbasaur)
      venosaur.update(evolve_from: ivysaur)
    end

    subject { get "/api/pokemons/#{bulbasaur.id}" }

    it do 
      subject
      expect(response).to have_http_status(200)
    end

    it 'returns name' do 
      subject
      response_body = JSON.parse(response.body)
      expect(response_body['name']).to eq('bulbasaur')
    end

    it 'returns kind' do 
      subject
      response_body = JSON.parse(response.body)
      expect(response_body['kind']).to eq('grass/poison')
    end

    it 'returns evolutions' do
      subject
      response_body = JSON.parse(response.body)
      expect(response_body['evolutions'].map { |p| p['id'] }).to eq([ivysaur.id, venosaur.id])
    end
  end

  describe 'DELETE /api/pokemons/:id' do
    it "returns HTTP 200 when everything goes right" do
      pokemon = Pokemon.create(name: "bulbasaur")

      delete "/api/pokemons/#{pokemon.id}"
      expect(response).to have_http_status(200)
    end

    it "returns HTTP 200 when everything goes right" do
      pokemon = Pokemon.create(name: "bulbasaur")

      delete "/api/pokemons/#{pokemon.id}"
      expect { Pokemon.find(pokemon.id) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
