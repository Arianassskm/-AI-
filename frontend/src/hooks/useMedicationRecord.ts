import { useState, useEffect } from 'react';
import { medicationRecordService, MedicationRecord } from '../services/medicationRecord';
import { useAuth } from './useAuth';

export interface CompletionStats {
  total: number;
  completed: number;
  missed: number;
  delayed: number;
  completionRate: number;
}

export function useMedicationRecord(planId?: string) {
  const { user } = useAuth();
  const [records, setRecords] = useState<MedicationRecord[]>([]);
  const [stats, setStats] = useState<CompletionStats>({
    total: 0,
    completed: 0,
    missed: 0,
    delayed: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !planId) {
      setRecords([]);
      setLoading(false);
      return;
    }

    loadRecords();
  }, [user, planId]);

  const loadRecords = async () => {
    if (!planId) return;
    
    setLoading(true);
    setError(null);

    // 加载记录
    const { data: recordsData, error: recordsError } = 
      await medicationRecordService.getPlanRecords(planId);
    
    if (recordsError) {
      setError(recordsError.message);
    } else {
      setRecords(recordsData);
    }

    // 加载统计数据
    const { data: statsData, error: statsError } = 
      await medicationRecordService.getCompletionStats(planId);
    
    if (statsError) {
      setError(statsError.message);
    } else {
      setStats(statsData);
    }
    
    setLoading(false);
  };

  const createRecord = async (
    record: Omit<MedicationRecord, 'id' | 'userId'>
  ) => {
    if (!user) return;

    const { data, error } = await medicationRecordService.createRecord(
      user.id,
      record
    );

    if (!error) {
      await loadRecords();
    }

    return { data, error };
  };

  return {
    records,
    stats,
    loading,
    error,
    createRecord,
    refresh: loadRecords
  };
}