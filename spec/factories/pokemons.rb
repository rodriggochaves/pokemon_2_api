# frozen_string_literal: true

FactoryBot.define do
  factory :bulbasaur, class: Pokemon do
    name { 'bulbasaur' }
    kind { [Kind['grass'], Kind['poison']] }
    poke_index { 1 }
    image_url { 'http://image.com/bulbasaur' }
  end

  factory :ivysaur, class: Pokemon do
    name { 'ivysaur' }
    kind { [Kind['grass'], Kind['poison']] }
    poke_index { 2 }
    image_url { 'http://image.com/ivysaur' }
  end

  factory :venosaur, class: Pokemon do
    name { 'venosaur' }
    kind { [Kind['grass'], Kind['poison']] }
    poke_index { 3 }
    image_url { 'http://image.com/venosaur' }
  end
end
