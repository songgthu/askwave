class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.text :content
      t.string :owner
      t.string :original_post

      t.timestamps
    end
  end
end
