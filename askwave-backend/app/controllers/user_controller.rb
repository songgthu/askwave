class UserController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def list
        @users = User.all
    end

    def new
        @user = User.new
    end

    def create
      @user = User.new(user_params)

      if check_user_existence
        render json: { error: 'Username already taken' }, status: :unprocessable_entity
      else
        if @user.save
          session[:user_id] = @user.id
          render json: { message: 'User successfully created' }, status: :created
        else
          render json: { error: 'User creation failed:', errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

    end
    


    private

    def check_user_existence
        User.exists?(username: user_params[:username])
    end

    def user_params
        params.fetch(:user, params).permit(:username, :password)
    end

    def user_summary(user)
      { username: user.username, password: user.password }
    end
end
