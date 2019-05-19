module Poke
  module Kind
    def Kind.initialize
      Poke::Api.kinds.each do |k|
        k.save!
      end
    end

    def Kind.parse(kind_string)
      parsed_string = kind_string.split('/')
      ::Kind.where(description: parsed_string)
    end
  end
end
