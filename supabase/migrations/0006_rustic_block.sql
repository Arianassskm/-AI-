/*
  # Medication Reminders Schema Update

  1. Changes
    - Add medication_interaction_records table for tracking drug interactions
    - Add medication_guide_records table for tracking usage guides
    - Add indexes for better query performance

  2. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

-- Create medication_interaction_records table
CREATE TABLE IF NOT EXISTS medication_interaction_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  medication_one_id uuid REFERENCES medications(id) ON DELETE CASCADE,
  medication_two_id uuid REFERENCES medications(id) ON DELETE CASCADE,
  interaction_type text NOT NULL CHECK (interaction_type IN ('contraindicated', 'monitor', 'minor')),
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create medication_guide_records table
CREATE TABLE IF NOT EXISTS medication_guide_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  medication_id uuid REFERENCES medications(id) ON DELETE CASCADE,
  guide_type text NOT NULL CHECK (guide_type IN ('video', 'text', 'interactive')),
  content text NOT NULL,
  viewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE medication_interaction_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_guide_records ENABLE ROW LEVEL SECURITY;

-- Create policies for medication_interaction_records
CREATE POLICY "Users can view their own interaction records"
  ON medication_interaction_records
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own interaction records"
  ON medication_interaction_records
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for medication_guide_records
CREATE POLICY "Users can view their own guide records"
  ON medication_guide_records
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own guide records"
  ON medication_guide_records
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_interaction_records_user ON medication_interaction_records(user_id);
CREATE INDEX idx_interaction_records_meds ON medication_interaction_records(medication_one_id, medication_two_id);
CREATE INDEX idx_guide_records_user ON medication_guide_records(user_id);
CREATE INDEX idx_guide_records_medication ON medication_guide_records(medication_id);

-- Create updated_at triggers
CREATE TRIGGER update_interaction_records_updated_at
  BEFORE UPDATE ON medication_interaction_records
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_guide_records_updated_at
  BEFORE UPDATE ON medication_guide_records
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();