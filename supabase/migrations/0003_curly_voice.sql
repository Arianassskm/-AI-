/*
  # Add Health Trends Tracking

  1. New Tables
    - `step_records`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `date` (date)
      - `steps` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `step_records` table
    - Add policies for authenticated users to manage their own records

  3. Indexes
    - Add index on user_id and date for better query performance
*/

-- Create step_records table
CREATE TABLE IF NOT EXISTS step_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  date date NOT NULL,
  steps integer NOT NULL CHECK (steps >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE step_records ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own step records"
  ON step_records
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own step records"
  ON step_records
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_step_records_user_date ON step_records(user_id, date);

-- Create updated_at trigger
CREATE TRIGGER update_step_records_updated_at
  BEFORE UPDATE ON step_records
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Add unique constraint to prevent duplicate records for the same day
ALTER TABLE step_records
  ADD CONSTRAINT unique_user_date UNIQUE (user_id, date);