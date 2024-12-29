/*
  # 增强药品知识库结构

  1. 新增字段
    - 用药禁忌人群
    - 特殊人群用药说明
    - 药物相互作用详情
    - 不良反应等级分类
    - 用药依从性建议
  
  2. 搜索优化
    - 添加搜索向量列
    - 创建搜索向量更新触发器
  
  3. 数据验证
    - 添加JSON数据完整性检查
*/

-- 扩展 medication_knowledge 表
ALTER TABLE medication_knowledge
ADD COLUMN IF NOT EXISTS contraindicated_populations text[],
ADD COLUMN IF NOT EXISTS special_populations jsonb DEFAULT '{
  "pregnancy": null,
  "lactation": null,
  "pediatric": null,
  "geriatric": null,
  "liver_impairment": null,
  "kidney_impairment": null
}'::jsonb,
ADD COLUMN IF NOT EXISTS interaction_details jsonb DEFAULT '{
  "drug_interactions": [],
  "food_interactions": [],
  "disease_interactions": []
}'::jsonb,
ADD COLUMN IF NOT EXISTS adverse_reactions_classified jsonb DEFAULT '{
  "common": [],
  "uncommon": [],
  "rare": [],
  "very_rare": []
}'::jsonb,
ADD COLUMN IF NOT EXISTS adherence_recommendations jsonb DEFAULT '{
  "timing": null,
  "method": null,
  "precautions": [],
  "lifestyle_adjustments": []
}'::jsonb,
ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- 创建搜索向量更新函数
CREATE OR REPLACE FUNCTION medication_knowledge_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.generic_name, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(array_to_string(NEW.brand_names, ' '), '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(array_to_string(NEW.indications, ' '), '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 创建搜索向量更新触发器
DROP TRIGGER IF EXISTS medication_knowledge_search_vector_trigger ON medication_knowledge;
CREATE TRIGGER medication_knowledge_search_vector_trigger
  BEFORE INSERT OR UPDATE
  ON medication_knowledge
  FOR EACH ROW
  EXECUTE FUNCTION medication_knowledge_search_vector_update();

-- 创建搜索索引
CREATE INDEX IF NOT EXISTS idx_medication_knowledge_search 
ON medication_knowledge USING GIN (search_vector);

-- 添加数据验证约束
ALTER TABLE medication_knowledge
ADD CONSTRAINT valid_special_populations 
CHECK (jsonb_typeof(special_populations) = 'object'),
ADD CONSTRAINT valid_interaction_details 
CHECK (jsonb_typeof(interaction_details) = 'object'),
ADD CONSTRAINT valid_adverse_reactions 
CHECK (jsonb_typeof(adverse_reactions_classified) = 'object'),
ADD CONSTRAINT valid_adherence_recommendations 
CHECK (jsonb_typeof(adherence_recommendations) = 'object');

-- 添加字段注释
COMMENT ON COLUMN medication_knowledge.contraindicated_populations IS '用药禁忌人群列表';
COMMENT ON COLUMN medication_knowledge.special_populations IS '特殊人群用药说明';
COMMENT ON COLUMN medication_knowledge.interaction_details IS '详细的药物相互作用信息';
COMMENT ON COLUMN medication_knowledge.adverse_reactions_classified IS '按严重程度分类的不良反应';
COMMENT ON COLUMN medication_knowledge.adherence_recommendations IS '用药依从性建议';
COMMENT ON COLUMN medication_knowledge.search_vector IS '全文搜索向量';