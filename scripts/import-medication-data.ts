import { createClient } from '@supabase/supabase-js';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

interface MedicationData {
  name: string;
  generic_name: string;
  brand_names: string[];
  manufacturer: string;
  approval_number: string;
  ingredients: Record<string, unknown>;
  indications: string[];
  contraindications: string[];
  dosage_forms: string[];
  usage_instructions: string;
  side_effects: string[];
  precautions: string[];
  storage_conditions: string;
  validity_period: string;
  interaction_warnings: Record<string, unknown>;
}

async function importMedicationData(filePath: string) {
  const records: MedicationData[] = [];
  const parser = createReadStream(filePath).pipe(
    parse({
      columns: true,
      skip_empty_lines: true
    })
  );

  try {
    // 1. 导入基本药品信息
    for await (const record of parser) {
      const { data: medication, error: medError } = await supabase
        .from('medications')
        .insert({
          name: record.name,
          category: record.category,
          status: 'active'
        })
        .select()
        .single();

      if (medError) throw medError;

      // 2. 导入药品知识库信息
      const { error: knowledgeError } = await supabase
        .from('medication_knowledge')
        .insert({
          medication_id: medication.id,
          generic_name: record.generic_name,
          brand_names: record.brand_names.split(','),
          manufacturer: record.manufacturer,
          approval_number: record.approval_number,
          ingredients: JSON.parse(record.ingredients),
          indications: record.indications.split(','),
          contraindications: record.contraindications.split(','),
          dosage_forms: record.dosage_forms.split(','),
          usage_instructions: record.usage_instructions,
          side_effects: record.side_effects.split(','),
          precautions: record.precautions.split(','),
          storage_conditions: record.storage_conditions,
          validity_period: record.validity_period,
          interaction_warnings: JSON.parse(record.interaction_warnings)
        });

      if (knowledgeError) throw knowledgeError;

      // 3. 导入药品别名
      const aliases = record.aliases?.split(',') || [];
      for (const alias of aliases) {
        const { error: aliasError } = await supabase
          .from('medication_aliases')
          .insert({
            medication_id: medication.id,
            alias,
            alias_type: 'common',
            language: 'zh-CN'
          });

        if (aliasError) throw aliasError;
      }

      console.log(`Successfully imported: ${record.name}`);
    }
  } catch (error) {
    console.error('Import failed:', error);
    throw error;
  }
}

// 使用示例
// importMedicationData('./data/medications.csv');