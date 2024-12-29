/*
  # Add Health Trends Tables

  1. New Tables
    - `health_trends`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `date` (date)
      - `blood_pressure_systolic` (integer)
      - `blood_pressure_diastolic` (integer)
      - `blood_sugar` (numeric)
      - `heart_rate` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `health_trends` table
    - Add policies for authenticated users to manage their own data
*/

-- Create health_trends table
CREATE TABLE IF NOT EXISTS health_trends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  date date NOT NULL,
  blood_pressure_systolic integer,
  blood_pressure_diastolic integer,
  blood_sugar numeric,
  heart_rate integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_blood_pressure CHECK (
    blood_pressure_systolic >= 0 AND 
    blood_pressure_diastolic >= 0 AND 
    blood_pressure_systolic > blood_pressure_diastolic
  ),
  CONSTRAINT valid_blood_sugar CHECK (blood_sugar >= 0),
  CONSTRAINT valid_heart_rate CHECK (heart_rate >= 0)
);

-- Enable Row Level Security
ALTER TABLE health_trends ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own health trends"
  ON health_trends
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own health trends"
  ON health_trends
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_health_trends_user_date ON health_trends(user_id, date);

-- Create updated_at trigger
CREATE TRIGGER update_health_trends_updated_at
  BEFORE UPDATE ON health_trends
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Add unique constraint to prevent duplicate records for the same day
ALTER TABLE health_trends
  ADD CONSTRAINT unique_user_date_health_trends UNIQUE (user_id, date);