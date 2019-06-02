# frozen_string_literal: true

class CreateKinds < ActiveRecord::Migration[5.2]
  def change
    create_table :kinds do |t|
      t.string :description
      t.string :color

      t.timestamps
    end
  end
end
