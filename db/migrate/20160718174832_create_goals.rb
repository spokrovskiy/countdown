class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.timestamp :created_at
      t.timestamp :created_at
      t.timestamp :updated_at
      t.timestamp :due_time
      t.integer :user_id
      t.integer :subtask_id
    end
  end
end
