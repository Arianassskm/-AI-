/*
  # Medication Recognition System Tables

  1. New Tables
    - medication_recognition_records: 存储药品识别的记录
    - medication_features: 存储药品特征数据
    - medication_package_features: 存储药品包装特征

  2. Security
    - 为所有表启用 RLS
    - 添加用户访问策略
    - 添加管理员访问策略

  3. Indexes
    - 创建识别记录索引
    - 创建特征搜索索引
*/

-- Create medication_recognition_records table
CREATE TABLE IF NOT EXISTS medication_recognition_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  medication_id uuid REFERENCES medications(id),
  image_url text NOT NULL,
  recognition_type text NOT NULL CHECK (recognition_type IN ('ocr', 'barcode', 'image')),
  confidence_score numeric CHECK (confidence_score BETWEEN 0 AND 1),
  raw_text text[],
  processed_result jsonb,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create medication_features table
CREATE TABLE IF NOT EXISTS medication_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id uuid REFERENCES medications(id) ON DELETE CASCADE,
  feature_type text NOT NULL CHECK (feature_type IN ('text', 'barcode', 'image')),
  feature_value text NOT NULL,
  confidence_score numeric CHECK (confidence_score BETWEEN 0 AND 1),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (medication_id, feature_type, feature_value)
);

-- Create medication_package_features table
CREATE TABLE IF NOT EXISTS medication_package_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id uuid REFERENCES medications(id) ON DELETE CASCADE,
  package_type text NOT NULL CHECK (package_type IN ('box', 'bottle', 'blister', 'tube')),
  color_scheme text[],
  text_layout jsonb,
  barcode_position jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE medication_recognition_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_package_features ENABLE ROW LEVEL SECURITY;

-- Create policies for medication_recognition_records
CREATE POLICY "Users can view their own recognition records"
  ON medication_recognition_records
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create recognition records"
  ON medication_recognition_records
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policies for medication_features
CREATE POLICY "Everyone can view medication features"
  ON medication_features
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage medication features"
  ON medication_features
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Create policies for medication_package_features
CREATE POLICY "Everyone can view package features"
  ON medication_package_features
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage package features"
  ON medication_package_features
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Create indexes
CREATE INDEX idx_recognition_records_user ON medication_recognition_records(user_id);
CREATE INDEX idx_recognition_records_medication ON medication_recognition_records(medication_id);
CREATE INDEX idx_recognition_records_status ON medication_recognition_records(status);
CREATE INDEX idx_medication_features_medication ON medication_features(medication_id);
CREATE INDEX idx_medication_features_type_value ON medication_features(feature_type, feature_value);
CREATE INDEX idx_package_features_medication ON medication_package_features(medication_id);

-- Create updated_at triggers
CREATE TRIGGER update_recognition_records_updated_at
  BEFORE UPDATE ON medication_recognition_records
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_medication_features_updated_at
  BEFORE UPDATE ON medication_features
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_package_features_updated_at
  BEFORE UPDATE ON medication_package_features
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();