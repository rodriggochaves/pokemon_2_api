# frozen_string_literal: true

class AddImageUrlToPokemon < ActiveRecord::Migration[5.2]
  def change
    add_column :pokemons, :image_url, :string
  end
end
