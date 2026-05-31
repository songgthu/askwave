class Comment < ApplicationRecord
    validates :content, presence: true
    validates :owner, presence: true
    validates :original_post, presence: true
end