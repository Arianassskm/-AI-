import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface RecognitionResult {
  text: string;
  confidence: number;
}

export function useImageRecognition() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recognizeText = async (imageData: string): Promise<RecognitionResult | null> => {
    setLoading(true);
    setError(null);

    try {
      // 将图片数据上传到临时存储
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('temp-images')
        .upload(`ocr/${Date.now()}.jpg`, imageData);

      if (uploadError) throw uploadError;

      // 调用OCR服务
      const response = await fetch('/api/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: uploadData.path })
      });

      if (!response.ok) {
        throw new Error('OCR服务请求失败');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : '识别失败，请重试');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    recognizeText
  };
}