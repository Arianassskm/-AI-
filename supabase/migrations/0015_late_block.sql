/*
  # Add guide templates and generated guides tables

  1. New Tables
    - guide_templates: Stores base templates for different medication types
    - generated_guides: Stores AI-generated personalized guides
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create guide_templates table
CREATE TABLE IF NOT EXISTS guide_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('injection', 'inhaler', 'nebulizer', 'suction')),
  title text NOT NULL,
  description text NOT NULL,
  base_steps jsonb NOT NULL,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create generated_guides table
CREATE TABLE IF NOT EXISTS generated_guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id uuid REFERENCES medications(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('injection', 'inhaler', 'nebulizer', 'suction')),
  user_context jsonb NOT NULL,
  guide_content jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE guide_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_guides ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view guide templates"
  ON guide_templates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their own generated guides"
  ON generated_guides
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_guide_templates_type ON guide_templates(type);
CREATE INDEX idx_generated_guides_medication ON generated_guides(medication_id);
CREATE INDEX idx_generated_guides_user ON generated_guides(user_id);

-- Create triggers
CREATE TRIGGER update_guide_templates_updated_at
  BEFORE UPDATE ON guide_templates
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_generated_guides_updated_at
  BEFORE UPDATE ON generated_guides
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();