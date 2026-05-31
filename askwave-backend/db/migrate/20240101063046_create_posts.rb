class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
        t.string :title
        t.text :content
        t.string :owner
        t.string :category
        t.datetime :date_posted
        t.integer :total_likes, default: 0
        t.integer :total_comments, default: 0

      t.timestamps
    end
  end
end