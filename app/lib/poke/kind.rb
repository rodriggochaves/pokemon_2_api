module Poke
  module Kind
    def Kind.initialize
      Poke::Api.kinds.each do |k|
        k.save!
      end
    end
  end
end
