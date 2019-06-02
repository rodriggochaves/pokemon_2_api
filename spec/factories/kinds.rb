# frozen_string_literal: true

FactoryBot.define do
  factory :fire, class: Kind do
    description { 'fire' }
    color { '#FF0000' }
  end

  factory :grass, class: Kind do
    description { 'grass' }
    color { '#FF0000' }
  end

  factory :poison, class: Kind do
    description { 'poison' }
    color { '#FF0000' }
  end
end
