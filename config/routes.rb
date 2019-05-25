Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'pokemons#home'
  get 'pokemon/:id' => redirect(path: '/')

  scope :api do
    get '/' => 'pokemons#index'
    get '/pokemons/:id' => 'pokemons#show'
    post '/pokemons' => 'pokemons#create'
    patch '/pokemons/:id' => 'pokemons#update'

    get '/kinds' => 'kinds#index'
  end
end
