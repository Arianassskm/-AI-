import { supabase } from '../lib/supabase';
import type { 
  GuideType, 
  MedicationInfo, 
  UserContext, 
  MedicationGuide 
} from '../types/medicationGuide';

// Fallback guide data moved to a separate file for better organization
import { FALLBACK_GUIDES } from '../data/fallbackGuides';

export const aiGuideService = {
  async generateGuide(
    medication: MedicationInfo,
    userContext: UserContext
  ): Promise<MedicationGuide> {
    try {
      // 1. Get base template
      const { data: templates, error: templateError } = await supabase
        .from('guide_templates')
        .select('*')
        .eq('type', medication.type)
        .limit(1);

      if (templateError) throw templateError;

      const template = templates?.[0];

      // 2. Use fallback data if no template exists
      if (!template) {
        console.warn('No template found, using fallback data');
        return this.createFallbackGuide(medication, userContext);
      }

      // 3. Generate personalized guide using AI
      try {
        const guide = await this.generatePersonalizedGuide(
          medication,
          userContext,
          template.base_steps
        );

        // 4. Save the generated guide
        await this.saveGuide(medication.id, guide, userContext);

        return guide;
      } catch (aiError) {
        console.error('AI generation failed:', aiError);
        return this.createFallbackGuide(medication, userContext);
      }
    } catch (error) {
      console.error('Guide generation failed:', error);
      return this.createFallbackGuide(medication, userContext);
    }
  },

  async generatePersonalizedGuide(
    medication: MedicationInfo,
    userContext: UserContext,
    baseSteps: any
  ): Promise<MedicationGuide> {
    const response = await fetch('/api/guides/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ medication, userContext, baseSteps })
    });

    if (!response.ok) {
      throw new Error('AI service failed');
    }

    return response.json();
  },

  async saveGuide(
    medicationId: string,
    guide: MedicationGuide,
    userContext: UserContext
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('generated_guides')
        .insert({
          medication_id: medicationId,
          type: guide.type,
          user_context: userContext,
          guide_content: guide
        });

      if (error) throw error;
    } catch (error) {
      console.error('Failed to save generated guide:', error);
    }
  },

  createFallbackGuide(
    medication: MedicationInfo,
    userContext: UserContext
  ): MedicationGuide {
    return {
      type: medication.type,
      medicationId: medication.id,
      ...FALLBACK_GUIDES[medication.type],
      userContext
    } as MedicationGuide;
  }
};