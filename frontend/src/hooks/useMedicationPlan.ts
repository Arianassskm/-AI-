import { useState, useEffect } from 'react';
import { medicationPlanService, MedicationPlan, PlanMedication } from '../services/medicationPlan';
import { useAuth } from './useAuth';

export function useMedicationPlan() {
  const { user } = useAuth();
  const [plans, setPlans] = useState<MedicationPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setPlans([]);
      setLoading(false);
      return;
    }

    loadPlans();
  }, [user]);

  const loadPlans = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await medicationPlanService.getUserPlans(user!.id);
    
    if (error) {
      setError(error.message);
    } else {
      setPlans(data);
    }
    
    setLoading(false);
  };

  const createPlan = async (
    plan: Omit<MedicationPlan, 'id' | 'userId' | 'createdAt' | 'updatedAt'>,
    medications: Omit<PlanMedication, 'id' | 'planId'>[]
  ) => {
    if (!user) return;

    const { data, error } = await medicationPlanService.createPlan(
      user.id,
      plan,
      medications
    );

    if (!error) {
      await loadPlans();
    }

    return { data, error };
  };

  const updatePlanStatus = async (
    planId: string,
    status: MedicationPlan['status']
  ) => {
    const { error } = await medicationPlanService.updatePlanStatus(planId, status);

    if (!error) {
      await loadPlans();
    }

    return error;
  };

  return {
    plans,
    loading,
    error,
    createPlan,
    updatePlanStatus,
    refresh: loadPlans
  };
}