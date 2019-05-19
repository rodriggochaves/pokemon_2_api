class PokemonsController < ApplicationController
  def home; end

  def index
    @pokemons = Pokemon.all
    render json: @pokemons
  end

  def create
    pokemon = Pokemon.new(pokemon_params)
    pokemon.save!
    render json: pokemon, status: 200
  end

  def update
    pokemon = Pokemon.find(params[:id])
    pokemon.update(pokemon_params)
    render json: pokemon, status: 200
  end

  private def pokemon_params
    {
      kind: Poke::Kind.parse(params[:kind])
    }.merge(params.permit(:name, :poke_index))
  end
end
