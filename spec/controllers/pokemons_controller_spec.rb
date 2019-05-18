require 'rails_helper'

RSpec.describe "PokemonsController", type: :request do
  describe "#index returns HTTP 200 " do
    before do
      ['bulbasaur', 'ivysaur', 'venasaur'].each { |name| Pokemon.create!(name: name) }
      get '/api'
    end

    it { expect(response).to have_http_status(200) }
    it { expect(JSON.parse(response.body).count).to eq(3) }
  end
end
