/*
  # 添加药品详细信息字段

  1. 新增字段
    - 拼音码 (用于搜索)
    - 药品性质
    - 外观描述
    - 规格信息
    - 特殊人群使用说明
    - 药理毒理
    - 药代动力学
  
  2. 索引优化
    - 添加拼音码搜索索引
    - 添加规格搜索索引
*/

-- 向 medication_knowledge 表添加新字段
ALTER TABLE medication_knowledge
ADD COLUMN IF NOT EXISTS pinyin_code text,
ADD COLUMN IF NOT EXISTS medicine_property text,
ADD COLUMN IF NOT EXISTS appearance text,
ADD COLUMN IF NOT EXISTS specification text,
ADD COLUMN IF NOT EXISTS pregnancy_nursing_info text,
ADD COLUMN IF NOT EXISTS pediatric_use_info text,
ADD COLUMN IF NOT EXISTS geriatric_use_info text,
ADD COLUMN IF NOT EXISTS pharmacology text,
ADD COLUMN IF NOT EXISTS pharmacokinetics text;

-- 添加索引以优化搜索性能
CREATE INDEX IF NOT EXISTS idx_medication_knowledge_pinyin ON medication_knowledge (pinyin_code);
CREATE INDEX IF NOT EXISTS idx_medication_knowledge_spec ON medication_knowledge (specification);

-- 添加注释
COMMENT ON COLUMN medication_knowledge.pinyin_code IS '药品拼音码，用于快速检索';
COMMENT ON COLUMN medication_knowledge.medicine_property IS '药品性质，包括性状、药理特性等';
COMMENT ON COLUMN medication_knowledge.appearance IS '外观描述';
COMMENT ON COLUMN medication_knowledge.specification IS '规格信息';
COMMENT ON COLUMN medication_knowledge.pregnancy_nursing_info IS '孕妇及哺乳期用药说明';
COMMENT ON COLUMN medication_knowledge.pediatric_use_info IS '儿童用药说明';
COMMENT ON COLUMN medication_knowledge.geriatric_use_info IS '老年人用药说明';
COMMENT ON COLUMN medication_knowledge.pharmacology IS '药理毒理学信息';
COMMENT ON COLUMN medication_knowledge.pharmacokinetics IS '药代动力学信息';