/*
  # Add medication knowledge indexes and constraints

  1. New Indexes
    - Add GIN indexes for jsonb and array columns
    - Add trigram indexes for text search
    - Add composite indexes for common queries
  
  2. Constraints
    - Add check constraints for data validation
    - Add unique constraints for data integrity
*/

-- Add GIN indexes for jsonb and array columns
CREATE INDEX IF NOT EXISTS idx_medication_knowledge_ingredients ON medication_knowledge USING GIN (ingredients);
CREATE INDEX IF NOT EXISTS idx_medication_knowledge_indications ON medication_knowledge USING GIN (indications);
CREATE INDEX IF NOT EXISTS idx_medication_knowledge_brand_names ON medication_knowledge USING GIN (brand_names);
CREATE INDEX IF NOT EXISTS idx_medication_knowledge_interaction ON medication_knowledge USING GIN (interaction_warnings);

-- Add trigram indexes for fuzzy search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS idx_medication_aliases_alias_trgm ON medication_aliases USING GIN (alias gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_medications_name_trgm ON medications USING GIN (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_medication_knowledge_generic_trgm ON medication_knowledge USING GIN (generic_name gin_trgm_ops);

-- Add composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_medication_knowledge_approval ON medication_knowledge (medication_id, approval_number);

-- Add check constraints
ALTER TABLE medication_knowledge
ADD CONSTRAINT valid_validity_period CHECK (
  validity_period ~ '^(\d+年|\d+个月)$'
),
ADD CONSTRAINT valid_approval_number CHECK (
  approval_number ~ '^[A-Z]\d{8}$'
);

-- Add unique constraints
ALTER TABLE medication_knowledge
ADD CONSTRAINT unique_medication_approval_number UNIQUE (medication_id, approval_number);

-- Add foreign key indexes
CREATE INDEX IF NOT EXISTS idx_medication_knowledge_medication_id ON medication_knowledge (medication_id);
CREATE INDEX IF NOT EXISTS idx_medication_aliases_medication_id ON medication_aliases (medication_id);

COMMENT ON INDEX idx_medication_knowledge_ingredients IS '用于药品成分的快速搜索';
COMMENT ON INDEX idx_medication_aliases_alias_trgm IS '用于药品别名的模糊搜索';
COMMENT ON INDEX idx_medications_name_trgm IS '用于药品名称的模糊搜索';