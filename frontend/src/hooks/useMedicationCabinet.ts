import { useState, useEffect } from 'react';
import { medicationService, MedicationCabinetItem } from '../services/medication';
import { useAuth } from './useAuth';

export function useMedicationCabinet() {
  const { user } = useAuth();
  const [medications, setMedications] = useState<MedicationCabinetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setMedications([]);
      setLoading(false);
      return;
    }

    loadMedications();
  }, [user]);

  const loadMedications = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await medicationService.getMedicationCabinet(user!.id);
    
    if (error) {
      setError(error.message);
    } else {
      setMedications(data);
    }
    
    setLoading(false);
  };

  const addMedication = async (
    medicationId: string,
    quantity: number,
    expiryDate: string
  ) => {
    if (!user) return;

    const { error } = await medicationService.addToMedicationCabinet(
      user.id,
      medicationId,
      quantity,
      expiryDate
    );

    if (!error) {
      await loadMedications();
    }

    return error;
  };

  const updateMedication = async (
    medicationId: string,
    updates: {
      quantity?: number;
      expiryDate?: string;
    }
  ) => {
    if (!user) return;

    const { error } = await medicationService.updateMedicationCabinet(
      user.id,
      medicationId,
      updates
    );

    if (!error) {
      await loadMedications();
    }

    return error;
  };

  const removeMedication = async (medicationId: string) => {
    if (!user) return;

    const { error } = await medicationService.removeFromMedicationCabinet(
      user.id,
      medicationId
    );

    if (!error) {
      await loadMedications();
    }

    return error;
  };

  return {
    medications,
    loading,
    error,
    addMedication,
    updateMedication,
    removeMedication,
    refresh: loadMedications
  };
}