class CreateJoinTableKindPokemon < ActiveRecord::Migration[5.2]
  def change
    create_join_table :kinds, :pokemons do |t|
      t.index [:kind_id, :pokemon_id]
      t.index [:pokemon_id, :kind_id]
    end
  end
end
