# frozen_string_literal: true

class PokemonsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[create destroy update]

  def home; end

  def index
    @pokemons = Pokemon.all
    render 'index.json'
  end

  def show
    @pokemon = Pokemon.find(params[:id])
    render 'show.json'
  end

  def create
    @pokemon = Pokemon.new(pokemon_params)
    if @pokemon.save
      update_pokemon_image
      render json: @pokemon, status: 200
    else
      render json: @pokemon.errors, status: 422
    end
  rescue StandardError
    render json: 'Cloudinary is off', status: 500
  end

  def update
    @pokemon = Pokemon.find(params[:id])
    update_pokemon_image
    @pokemon.update(pokemon_params)
    render json: @pokemon, status: 200
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    head :ok
  end

  private

  def pokemon_params
    {
      kind: Poke::Kind.parse(params[:kind])
    }.merge(params.permit(:name, :poke_index, :evolve_from_id))
  end

  def update_pokemon_image
    return unless params[:image] && params[:image] != 'undefined'

    response = Cloudinary::Uploader.upload(params[:image], folder: 'pokemons')
    @pokemon.update(image_url: response['url'])
  end
end
