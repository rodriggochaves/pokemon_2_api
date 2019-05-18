# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_18_124455) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "kinds", force: :cascade do |t|
    t.string "description"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "kinds_pokemons", id: false, force: :cascade do |t|
    t.bigint "kind_id", null: false
    t.bigint "pokemon_id", null: false
    t.index ["kind_id", "pokemon_id"], name: "index_kinds_pokemons_on_kind_id_and_pokemon_id"
    t.index ["pokemon_id", "kind_id"], name: "index_kinds_pokemons_on_pokemon_id_and_kind_id"
  end

  create_table "pokemons", force: :cascade do |t|
    t.string "name"
    t.integer "poke_index"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "evolve_from_id"
  end

end
