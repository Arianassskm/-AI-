/*
  # Initial Schema Setup for Medication Management System

  1. New Tables
    - `users` - Store user profiles and health information
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `avatar_url` (text)
      - `phone` (text)
      - `location` (text)
      - `role` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `health_records` - Store user health information
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `height` (numeric)
      - `weight` (numeric)
      - `blood_type` (text)
      - `allergies` (text[])
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `medications` - Store medication information
      - `id` (uuid, primary key)
      - `name` (text)
      - `name_en` (text)
      - `description` (text)
      - `storage_condition` (text)
      - `category` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `medication_cabinet` - Store user's medication inventory
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `medication_id` (uuid, foreign key)
      - `quantity` (numeric)
      - `expiry_date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `medication_plans` - Store medication plans
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `name` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `plan_medications` - Store medications in plans
      - `id` (uuid, primary key)
      - `plan_id` (uuid, foreign key)
      - `medication_id` (uuid, foreign key)
      - `dosage` (text)
      - `frequency` (text)
      - `duration` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `chronic_diseases` - Store chronic disease information
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `disease_type` (text)
      - `diagnosis_date` (date)
      - `medication_history` (text)
      - `medical_history` (text)
      - `current_condition` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  avatar_url text,
  phone text,
  location text,
  role text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create health_records table
CREATE TABLE IF NOT EXISTS health_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  height numeric,
  weight numeric,
  blood_type text,
  allergies text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create medications table
CREATE TABLE IF NOT EXISTS medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_en text,
  description text,
  storage_condition text,
  category text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create medication_cabinet table
CREATE TABLE IF NOT EXISTS medication_cabinet (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  medication_id uuid REFERENCES medications(id) ON DELETE CASCADE,
  quantity numeric NOT NULL DEFAULT 0,
  expiry_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create medication_plans table
CREATE TABLE IF NOT EXISTS medication_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create plan_medications table
CREATE TABLE IF NOT EXISTS plan_medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid REFERENCES medication_plans(id) ON DELETE CASCADE,
  medication_id uuid REFERENCES medications(id) ON DELETE CASCADE,
  dosage text,
  frequency text,
  duration text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chronic_diseases table
CREATE TABLE IF NOT EXISTS chronic_diseases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  disease_type text NOT NULL,
  diagnosis_date date,
  medication_history text,
  medical_history text,
  current_condition text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_cabinet ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE chronic_diseases ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view their own health records"
  ON health_records
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own health records"
  ON health_records
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Everyone can view medications"
  ON medications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their medication cabinet"
  ON medication_cabinet
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their medication cabinet"
  ON medication_cabinet
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their medication plans"
  ON medication_plans
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their medication plans"
  ON medication_plans
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their plan medications"
  ON plan_medications
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM medication_plans mp 
    WHERE mp.id = plan_id AND mp.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their plan medications"
  ON plan_medications
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM medication_plans mp 
    WHERE mp.id = plan_id AND mp.user_id = auth.uid()
  ));

CREATE POLICY "Users can view their chronic diseases"
  ON chronic_diseases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their chronic diseases"
  ON chronic_diseases
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_health_records_updated_at
  BEFORE UPDATE ON health_records
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_medications_updated_at
  BEFORE UPDATE ON medications
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_medication_cabinet_updated_at
  BEFORE UPDATE ON medication_cabinet
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_medication_plans_updated_at
  BEFORE UPDATE ON medication_plans
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_plan_medications_updated_at
  BEFORE UPDATE ON plan_medications
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_chronic_diseases_updated_at
  BEFORE UPDATE ON chronic_diseases
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();