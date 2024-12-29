/*
  # 创建药品追踪表

  1. 新表
    - `medication_tracking` 表
      - `id` (uuid, 主键)
      - `plan_id` (uuid, 外键关联 medication_plans)
      - `tracking_date` (date, 追踪日期)
      - `progress_description` (text, 进度描述)
      - `consumption_pattern` (jsonb, 用药模式分析)
      - `next_dose_reminder` (timestamptz, 下次服药提醒)
      - `refill_prediction` (jsonb, 补药预测)
      - `effectiveness_analysis` (jsonb, 效果分析)
      - `side_effects_summary` (jsonb, 副作用总结)
      - `dosage_adjustment_suggestion` (text, 剂量调整建议)
      - `lifestyle_suggestions` (text[], 生活方式建议)
      - `created_at` (timestamptz, 创建时间)
      - `updated_at` (timestamptz, 更新时间)

  2. 安全
    - 启用行级安全
    - 添加访问策略
*/

-- Create medication_tracking table
CREATE TABLE IF NOT EXISTS medication_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid REFERENCES medication_plans(id) ON DELETE CASCADE,
  tracking_date date NOT NULL DEFAULT CURRENT_DATE,
  progress_description text,
  consumption_pattern jsonb,
  next_dose_reminder timestamptz,
  refill_prediction jsonb,
  effectiveness_analysis jsonb,
  side_effects_summary jsonb,
  dosage_adjustment_suggestion text,
  lifestyle_suggestions text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE medication_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own tracking records"
  ON medication_tracking
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM medication_plans mp 
    WHERE mp.id = plan_id AND mp.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their own tracking records"
  ON medication_tracking
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM medication_plans mp 
    WHERE mp.id = plan_id AND mp.user_id = auth.uid()
  ));

-- Create indexes
CREATE INDEX idx_medication_tracking_plan ON medication_tracking(plan_id);
CREATE INDEX idx_medication_tracking_date ON medication_tracking(tracking_date);

-- Create updated_at trigger
CREATE TRIGGER update_medication_tracking_updated_at
  BEFORE UPDATE ON medication_tracking
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Add comments
COMMENT ON TABLE medication_tracking IS 'AI药品使用追踪记录';
COMMENT ON COLUMN medication_tracking.consumption_pattern IS '用药模式分析,包含服药时间规律、漏服情况等';
COMMENT ON COLUMN medication_tracking.refill_prediction IS '补药预测,包含剩余药量、建议补药时间等';
COMMENT ON COLUMN medication_tracking.effectiveness_analysis IS '效果分析,包含症状改善情况、治疗目标达成度等';
COMMENT ON COLUMN medication_tracking.side_effects_summary IS '副作用总结,包含已观察到的副作用及其严重程度';