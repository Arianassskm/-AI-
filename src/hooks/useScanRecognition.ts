import { useState } from 'react';
import { scanRecognitionService, type ScanResult, type ScanError } from '../services/scanRecognitionService';

export function useScanRecognition() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ScanError | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);

  const processMedicineScan = async (images: string[]) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await scanRecognitionService.processMedicineScan(images);
      if (error) throw error;
      setResult(data);
      return data;
    } catch (err) {
      const error = err as ScanError;
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const processPrescriptionScan = async (images: string[]) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await scanRecognitionService.processPrescriptionScan(images);
      if (error) throw error;
      setResult(data);
      return data;
    } catch (err) {
      const error = err as ScanError;
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return {
    loading,
    error,
    result,
    processMedicineScan,
    processPrescriptionScan,
    clearResult
  };
}