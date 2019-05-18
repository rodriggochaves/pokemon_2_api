class PokemonsController < ApplicationController
  def home; end

  def index
    @pokemons = Pokemon.all
    render json: @pokemons
  end
end
