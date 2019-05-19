Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'pokemons#home'

  scope :api do
    get '/' => 'pokemons#index'
    post '/pokemons' => 'pokemons#create'
  end
end
