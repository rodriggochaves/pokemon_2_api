class CreatePokemons < ActiveRecord::Migration[5.2]
  def change
    create_table :pokemons do |t|
      t.string :name
      t.string :kind
      t.integer :poke_index

      t.timestamps
    end
  end
end