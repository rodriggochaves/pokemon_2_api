# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'PokemonsController', type: :request do
  before(:each) do
    response = File.read('spec/lib/poke/mocks/kind.json')
    stub_request(:get, 'https://pokeapi.co/api/v2/type').to_return(body: response)
    Poke::Kind.initialize
  end

  describe 'GET /api returns all pokemon' do
    before do
      bulbasaur = create(:bulbasaur)
      ivysaur = create(:ivysaur)
      venosaur = create(:venosaur)

      ivysaur.update(evolve_from: bulbasaur)
      venosaur.update(evolve_from: ivysaur)

      get '/api'
    end

    it { expect(response).to have_http_status(200) }
    it { expect(JSON.parse(response.body).count).to eq(3) }

    describe 'the response body' do
      let(:body) { JSON.parse(response.body) }
      let(:bulbasaur) { Pokemon.find_by(name: 'bulbasaur') }

      it { expect(body.first['id']).to eq(bulbasaur.id) }
      it { expect(body.first['name']).to eq('bulbasaur') }
      it { expect(body.first['kind1']).to eq('grass') }
      it { expect(body.first['kind2']).to eq('poison') }
      it { expect(body.first['poke_index']).to eq(1) }
      it { expect(body.first['evolve_from']).to eq(nil) }
      it { expect(body.first['image_url']).to eq('http://image.com/bulbasaur') }
      it { expect(body.first['evolutions'][0]['name']).to eq('ivysaur') }
      it { expect(body.first['evolutions'][1]['name']).to eq('venosaur') }
    end
  end

  describe 'POST /api/pokemons can create a new pokemon' do
    before(:each) do
      allow(Cloudinary::Uploader).to receive(:upload).and_return('url' => 'https://image.com/123')
    end

    let(:charizard) { Pokemon.create(name: 'Charizard') }

    subject do
      post '/api/pokemons', params: {
        name: 'Mega Charizard',
        kind: 'fire/flying',
        poke_index: 6,
        evolve_from_id: charizard.id,
        image: 'some image'
      }
    end

    it 'have HTTP 200' do
      subject
      expect(response).to have_http_status(200)
    end

    it 'store in db' do
      expect { subject }.to change { Pokemon.count }.by(2)
    end

    it 'saves evolution base' do
      subject
      new_pokemon = Pokemon.last
      expect(new_pokemon.evolve_from).to eq(charizard)
    end

    it 'saves the pokemon image url' do
      subject
      new_pokemon = Pokemon.last
      expect(new_pokemon.image_url).to eq('https://image.com/123')
    end
  end

  it 'POST /api/pokemons with invalid parameter' do
    post '/api/pokemons', params: {
      kind: 'fire/flying',
      poke_index: 6
    }
    expect(response).to have_http_status(422)
  end

  it 'POST /api/pokemons when cloudinary get an error' do
    allow(Cloudinary::Uploader).to receive(:upload).and_raise(StandardError)
    post '/api/pokemons', params: {
      name: 'Mega Charizard',
      kind: 'fire/flying',
      poke_index: 6,
      image: 'some image'
    }
    expect(response).to have_http_status(500)
  end

  describe 'PATCH /api/pokemons/:id can update a pokemon' do
    let(:charizard) do
      Pokemon.create!(
        name: 'Mega Charizard',
        kind: [Kind['fire']],
        poke_index: 6,
        image_url: 'https://image.com/charizard'
      )
    end

    subject do
      patch "/api/pokemons/#{charizard.id}", params: {
        kind: 'fire/flying'
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

    it 'can change the pokemon image' do
      new_image_url = 'https://image.com/hd/charizard'
      allow(Cloudinary::Uploader).to receive(:upload).and_return('url' => new_image_url)
      patch "/api/pokemons/#{charizard.id}", params: { image: new_image_url }
      expect(charizard.reload.image_url).to eq(new_image_url)
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
    it 'returns HTTP 200 when everything goes right' do
      pokemon = Pokemon.create(name: 'bulbasaur')

      delete "/api/pokemons/#{pokemon.id}"
      expect(response).to have_http_status(200)
    end

    it 'returns HTTP 200 when everything goes right' do
      pokemon = Pokemon.create(name: 'bulbasaur')

      delete "/api/pokemons/#{pokemon.id}"
      expect { Pokemon.find(pokemon.id) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
