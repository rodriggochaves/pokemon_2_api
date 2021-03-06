# frozen_string_literal: true

class KindsController < ApplicationController
  def index
    kinds = Kind.all
    render json: kinds, status: :ok
  end
end
