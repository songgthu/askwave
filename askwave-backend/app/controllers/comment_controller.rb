class CommentController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:publish, :delete]

    def list
      encoded_title = params[:title]
      decoded_title = URI.decode_www_form_component(encoded_title)
      @comments = Comment.where(original_post: decoded_title)
      render json: @comments
    end


    def new
        @comment = Comment.new
    end

    def publish
      @comment = Comment.new(comment_params)
      if @comment.save
          post = Post.find_by(title: @comment.original_post)
          post&.increment!(:total_comments)
          render json: { message: 'Comment successfully created' }, status: :created
      else
          render json: { error: 'Comment creation failed:', errors: @comment.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def delete
      id = params[:id]
  
      if id.present?
        @comment = Comment.find_by(id: id)
  
        if @comment
          unless allowed_to_delete_comment?(@comment)
            render json: { error: 'Not authorized to delete this comment' }, status: :forbidden
            return
          end

          original_post = @comment.original_post
          @comment.destroy
          post = Post.find_by(title: original_post)
          post&.decrement!(:total_comments) if post&.total_comments.to_i&.positive?
          render json: { message: 'Comment deleted successfully' }, status: :ok
        else
          render json: { error: 'Comment not found' }, status: :not_found
        end
      else
        render json: { error: 'Id is required parameters' }, status: :unprocessable_entity
      end
    end

    private

    def comment_params
        params.fetch(:comment, params).permit(:content, :owner, :original_post)
    end

    def allowed_to_delete_comment?(comment)
      post = Post.find_by(title: comment.original_post)
      params[:owner].present? && (comment.owner == params[:owner] || post&.owner == params[:owner])
    end


end
