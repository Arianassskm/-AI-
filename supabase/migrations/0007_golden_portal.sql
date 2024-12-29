/*
  # 用药计划服务更新

  1. 新增字段
    - 在 medication_plans 表添加：
      - frequency_type: 用药频率类型（每日、每周等）
      - frequency_value: 频率值
      - dosage_unit: 剂量单位
      - notes: 备注信息
    
  2. 新增约束
    - 频率类型检查
    - 频率值范围检查
    
  3. 新增索引
    - 用药计划状态索引
*/

-- 添加新字段到 medication_plans 表
ALTER TABLE medication_plans
ADD COLUMN IF NOT EXISTS frequency_type text CHECK (frequency_type IN ('daily', 'weekly', 'monthly')),
ADD COLUMN IF NOT EXISTS frequency_value integer CHECK (frequency_value > 0),
ADD COLUMN IF NOT EXISTS dosage_unit text,
ADD COLUMN IF NOT EXISTS notes text;

-- 添加状态索引
CREATE INDEX IF NOT EXISTS idx_medication_plans_status ON medication_plans(status);

-- 更新 plan_medications 表
ALTER TABLE plan_medications
ADD COLUMN IF NOT EXISTS dosage_amount numeric CHECK (dosage_amount > 0),
ADD COLUMN IF NOT EXISTS time_of_day time[] NOT NULL DEFAULT ARRAY['09:00'::time],
ADD COLUMN IF NOT EXISTS days_of_week integer[] CHECK (
  array_length(days_of_week, 1) IS NULL OR
  (array_length(days_of_week, 1) BETWEEN 1 AND 7 AND
   days_of_week <@ ARRAY[0,1,2,3,4,5,6])
);