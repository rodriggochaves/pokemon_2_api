# frozen_string_literal: true

class CreatePokemons < ActiveRecord::Migration[5.2]
  def change
    create_table :pokemons do |t|
      t.string :name
      t.integer :poke_index

      t.timestamps
    end
  end
end
