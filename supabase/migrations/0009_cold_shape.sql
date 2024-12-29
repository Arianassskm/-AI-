/*
  # Add medication images support
  
  1. New Tables
    - medication_images: 存储药品相关图片
    - image_annotations: 存储图片标注信息
    
  2. Changes
    - 添加图片关联到medications表
    
  3. Security
    - 启用RLS
    - 添加访问策略
*/

-- Create medication_images table
CREATE TABLE IF NOT EXISTS medication_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id uuid REFERENCES medications(id) ON DELETE CASCADE,
  image_type text NOT NULL CHECK (image_type IN ('package', 'instruction', 'component', 'other')),
  image_url text NOT NULL,
  storage_path text NOT NULL,
  is_primary boolean DEFAULT false,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create image_annotations table
CREATE TABLE IF NOT EXISTS image_annotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_id uuid REFERENCES medication_images(id) ON DELETE CASCADE,
  annotation_type text NOT NULL CHECK (annotation_type IN ('text', 'barcode', 'region')),
  content text NOT NULL,
  bounding_box jsonb,
  confidence numeric CHECK (confidence BETWEEN 0 AND 1),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE medication_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_annotations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view medication images"
  ON medication_images
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage medication images"
  ON medication_images
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Everyone can view image annotations"
  ON image_annotations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage image annotations"
  ON image_annotations
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Create indexes
CREATE INDEX idx_medication_images_medication ON medication_images(medication_id);
CREATE INDEX idx_image_annotations_image ON image_annotations(image_id);

-- Create triggers
CREATE TRIGGER update_medication_images_updated_at
  BEFORE UPDATE ON medication_images
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_image_annotations_updated_at
  BEFORE UPDATE ON image_annotations
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();