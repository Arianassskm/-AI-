/*
  # Add medication knowledge base
  
  1. New Tables
    - medication_knowledge: 存储药品知识库信息
    - medication_aliases: 存储药品别名
    - medication_categories: 存储药品分类
    
  2. Changes
    - 添加知识关联到medications表
    
  3. Security
    - 启用RLS
    - 添加访问策略
*/

-- Create medication_knowledge table
CREATE TABLE IF NOT EXISTS medication_knowledge (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id uuid REFERENCES medications(id) ON DELETE CASCADE,
  generic_name text,
  brand_names text[],
  manufacturer text,
  approval_number text,
  ingredients jsonb,
  indications text[],
  contraindications text[],
  dosage_forms text[],
  usage_instructions text,
  side_effects text[],
  precautions text[],
  storage_conditions text,
  validity_period text,
  interaction_warnings jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create medication_aliases table
CREATE TABLE IF NOT EXISTS medication_aliases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id uuid REFERENCES medications(id) ON DELETE CASCADE,
  alias text NOT NULL,
  alias_type text CHECK (alias_type IN ('common', 'chemical', 'abbreviation')),
  language text DEFAULT 'zh-CN',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (medication_id, alias, language)
);

-- Create medication_categories table
CREATE TABLE IF NOT EXISTS medication_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  parent_id uuid REFERENCES medication_categories(id),
  description text,
  icon text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create medication_category_mappings table
CREATE TABLE IF NOT EXISTS medication_category_mappings (
  medication_id uuid REFERENCES medications(id) ON DELETE CASCADE,
  category_id uuid REFERENCES medication_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (medication_id, category_id)
);

-- Enable RLS
ALTER TABLE medication_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_category_mappings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view medication knowledge"
  ON medication_knowledge
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage medication knowledge"
  ON medication_knowledge
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Everyone can view medication aliases"
  ON medication_aliases
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Everyone can view medication categories"
  ON medication_categories
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Everyone can view category mappings"
  ON medication_category_mappings
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX idx_medication_knowledge_medication ON medication_knowledge(medication_id);
CREATE INDEX idx_medication_aliases_medication ON medication_aliases(medication_id);
CREATE INDEX idx_medication_aliases_alias ON medication_aliases(alias);
CREATE INDEX idx_category_mappings_medication ON medication_category_mappings(medication_id);
CREATE INDEX idx_category_mappings_category ON medication_category_mappings(category_id);

-- Create triggers
CREATE TRIGGER update_medication_knowledge_updated_at
  BEFORE UPDATE ON medication_knowledge
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_medication_aliases_updated_at
  BEFORE UPDATE ON medication_aliases
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_medication_categories_updated_at
  BEFORE UPDATE ON medication_categories
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();