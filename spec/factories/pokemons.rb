FactoryBot.define do
  factory :bulbasaur, class: Pokemon do
    name { "bulbasaur" }
    kind { [Kind['grass'], Kind['poison']] }
  end

  factory :ivysaur, class: Pokemon do
    name { "ivysaur" }
    kind { [Kind['grass'], Kind['poison']] }
  end

  factory :venosaur, class: Pokemon do
    name { "venosaur" }
    kind { [Kind['grass'], Kind['poison']] }
  end
end
