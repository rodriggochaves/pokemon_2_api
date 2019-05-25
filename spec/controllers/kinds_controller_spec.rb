require 'rails_helper'

RSpec.describe "KindsController", type: :request do
  before(:each) do
    response = File.read('spec/lib/poke/mocks/kind.json')
    stub_request(:get, "https://pokeapi.co/api/v2/type").to_return(body: response)
    Poke::Kind.initialize
  end

  it "GET /api/kinds returns all kinds" do
    get "/api/kinds"
    parsed_response = JSON.parse(response.body)
    expect(parsed_response.length).to eq(20)
  end
end