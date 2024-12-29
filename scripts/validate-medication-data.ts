import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

interface ValidationError {
  table: string;
  field: string;
  record_id: string;
  error: string;
}

async function validateMedicationData() {
  const errors: ValidationError[] = [];

  // 1. 验证基本药品信息
  const { data: medications, error: medError } = await supabase
    .from('medications')
    .select('id, name, category, status');

  if (medError) throw medError;

  for (const med of medications) {
    if (!med.name?.trim()) {
      errors.push({
        table: 'medications',
        field: 'name',
        record_id: med.id,
        error: 'Name cannot be empty'
      });
    }
  }

  // 2. 验证药品知识库
  const { data: knowledge, error: knowledgeError } = await supabase
    .from('medication_knowledge')
    .select('*');

  if (knowledgeError) throw knowledgeError;

  for (const k of knowledge) {
    // 验证批准文号格式
    if (k.approval_number && !/^[A-Z]\d{8}$/.test(k.approval_number)) {
      errors.push({
        table: 'medication_knowledge',
        field: 'approval_number',
        record_id: k.id,
        error: 'Invalid approval number format'
      });
    }

    // 验证有效期格式
    if (k.validity_period && !/^(\d+年|\d+个月)$/.test(k.validity_period)) {
      errors.push({
        table: 'medication_knowledge',
        field: 'validity_period',
        record_id: k.id,
        error: 'Invalid validity period format'
      });
    }
  }

  // 3. 验证药品别名
  const { data: aliases, error: aliasError } = await supabase
    .from('medication_aliases')
    .select('*');

  if (aliasError) throw aliasError;

  for (const alias of aliases) {
    if (!alias.alias?.trim()) {
      errors.push({
        table: 'medication_aliases',
        field: 'alias',
        record_id: alias.id,
        error: 'Alias cannot be empty'
      });
    }
  }

  return errors;
}

// 使用示例
// validateMedicationData().then(console.log);