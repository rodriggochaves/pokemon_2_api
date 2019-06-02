# frozen_string_literal: true

class CreateJoinTableKindPokemon < ActiveRecord::Migration[5.2]
  def change
    create_join_table :kinds, :pokemons do |t|
      t.index %i[kind_id pokemon_id]
      t.index %i[pokemon_id kind_id]
    end
  end
end
