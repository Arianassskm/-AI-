/*
  # 优化药品追踪表

  1. 新增字段
    - 用药依从性评分
    - 用药提醒响应率
    - 不良反应记录
    - 治疗效果评分
    - 生活质量评估
    - AI 建议历史记录
  
  2. 索引优化
    - 添加复合索引以提升查询性能
    - 添加 GIN 索引支持 JSON 搜索
  
  3. 约束优化
    - 添加评分范围检查
    - 添加日期有效性检查
*/

-- 添加新字段
ALTER TABLE medication_tracking
ADD COLUMN IF NOT EXISTS adherence_score numeric CHECK (adherence_score BETWEEN 0 AND 100),
ADD COLUMN IF NOT EXISTS reminder_response_rate numeric CHECK (reminder_response_rate BETWEEN 0 AND 100),
ADD COLUMN IF NOT EXISTS adverse_reactions jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS effectiveness_score numeric CHECK (effectiveness_score BETWEEN 0 AND 100),
ADD COLUMN IF NOT EXISTS quality_of_life_score numeric CHECK (quality_of_life_score BETWEEN 0 AND 100),
ADD COLUMN IF NOT EXISTS ai_suggestions_history jsonb[] DEFAULT ARRAY[]::jsonb[];

-- 添加复合索引
CREATE INDEX IF NOT EXISTS idx_med_tracking_plan_date 
ON medication_tracking (plan_id, tracking_date DESC);

CREATE INDEX IF NOT EXISTS idx_med_tracking_effectiveness 
ON medication_tracking (plan_id, effectiveness_score DESC)
WHERE effectiveness_score IS NOT NULL;

-- 添加 GIN 索引用于 JSON 搜索
CREATE INDEX IF NOT EXISTS idx_med_tracking_consumption 
ON medication_tracking USING GIN (consumption_pattern);

CREATE INDEX IF NOT EXISTS idx_med_tracking_side_effects 
ON medication_tracking USING GIN (side_effects_summary);

CREATE INDEX IF NOT EXISTS idx_med_tracking_adverse 
ON medication_tracking USING GIN (adverse_reactions);

-- 添加日期检查约束
ALTER TABLE medication_tracking
ADD CONSTRAINT valid_tracking_date 
CHECK (tracking_date <= CURRENT_DATE);

-- 添加字段注释
COMMENT ON COLUMN medication_tracking.adherence_score IS '用药依从性评分 (0-100)';
COMMENT ON COLUMN medication_tracking.reminder_response_rate IS '用药提醒响应率 (0-100)';
COMMENT ON COLUMN medication_tracking.adverse_reactions IS '不良反应详细记录';
COMMENT ON COLUMN medication_tracking.effectiveness_score IS '治疗效果评分 (0-100)';
COMMENT ON COLUMN medication_tracking.quality_of_life_score IS '生活质量评估分数 (0-100)';
COMMENT ON COLUMN medication_tracking.ai_suggestions_history IS 'AI建议历史记录';