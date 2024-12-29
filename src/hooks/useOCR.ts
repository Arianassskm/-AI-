import { useState } from 'react';
import { ocrService } from '../services/ocrService';
import { validateImage } from '../utils/validation';
import { dataURLtoFile } from '../utils/imageUtils';

export function useOCR() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<string[]>([]);

  const recognizeImage = async (imageData: string) => {
    setLoading(true);
    setError(null);

    try {
      // 验证图片
      const file = dataURLtoFile(imageData, 'image.jpg');
      const validationError = validateImage(file);
      if (validationError) {
        throw new Error(validationError);
      }

      // 执行 OCR
      const textResults = await ocrService.recognizeImage(imageData);
      setResults(textResults);
      return textResults;
    } catch (err) {
      const message = err instanceof Error ? err.message : '识别失败，请重试';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return {
    loading,
    error,
    results,
    recognizeImage,
    clearResults
  };
}