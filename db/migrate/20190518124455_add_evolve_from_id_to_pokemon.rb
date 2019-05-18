class AddEvolveFromIdToPokemon < ActiveRecord::Migration[5.2]
  def change
    add_column :pokemons, :evolve_from_id, :integer
  end
end
