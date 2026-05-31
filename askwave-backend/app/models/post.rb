class Post < ApplicationRecord
    validates :title, presence: true, uniqueness: true
    validates :content, presence: true
    validates :owner, presence: true
    validates :category, presence: true
    validates :total_likes, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :total_comments, presence: true, numericality: { greater_than_or_equal_to: 0 }
end