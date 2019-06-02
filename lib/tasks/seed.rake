# frozen_string_literal: true

namespace :seed do
  desc 'TODO'
  task query_151: :environment do
    Poke::Api.find(1)
  end
end
