class SessionController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:login]

  def home
    render json: { message: 'AskWave backend is running' }, status: :ok
  end

  def login
    @user = User.find_by(username: params[:username])

    if @user && params[:password] == @user.password
      render json: { message: 'Login successful', username: @user.username }, status: :ok
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end

end
