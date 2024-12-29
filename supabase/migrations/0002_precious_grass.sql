/*
  # Add medication records table
  
  1. New Tables
    - `medication_records`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `plan_medication_id` (uuid, references plan_medications)
      - `taken_at` (timestamptz)
      - `status` (text) - 记录状态：completed(已服用), missed(未服用), delayed(延迟服用)
      - `notes` (text) - 可选的备注信息
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on medication_records table
    - Add policies for authenticated users to manage their own records
    
  3. Changes
    - Add updated_at trigger for medication_records
*/

-- Create medication_records table
CREATE TABLE IF NOT EXISTS medication_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  plan_medication_id uuid REFERENCES plan_medications(id) ON DELETE CASCADE,
  taken_at timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('completed', 'missed', 'delayed')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE medication_records ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own medication records"
  ON medication_records
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own medication records"
  ON medication_records
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_medication_records_updated_at
  BEFORE UPDATE ON medication_records
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX idx_medication_records_user_id ON medication_records(user_id);
CREATE INDEX idx_medication_records_plan_medication_id ON medication_records(plan_medication_id);
CREATE INDEX idx_medication_records_taken_at ON medication_records(taken_at);