import { OCR_CONFIG } from '../config/ocrConfig';
import { resizeAndCompressImage } from './imageProcessing';

interface OCRResponse {
  code: number;
  msg: string;
  data: {
    text_list: Array<{
      text: string;
      confidence: number;
    }>;
  };
}

/**
 * 执行 OCR 识别
 */
export async function performOCR(imageData: string | File): Promise<string[]> {
  try {
    // 确保图片数据是正确的格式
    const processedImage = await resizeAndCompressImage(imageData);
    const base64Data = processedImage.dataUrl.split(',')[1];

    if (!base64Data) {
      throw new Error('Invalid image data');
    }

    const response = await fetch(OCR_CONFIG.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ColaKey': OCR_CONFIG.COLA_KEY
      },
      body: JSON.stringify({
        image: base64Data,
        language_type: 'CHN_ENG'
      })
    });

    if (!response.ok) {
      throw new Error('OCR service request failed');
    }

    const result: OCRResponse = await response.json();
    
    if (result.code !== 0) {
      throw new Error(result.msg || 'OCR recognition failed');
    }

    return result.data.text_list.map(item => item.text);
  } catch (err) {
    console.error('OCR Error:', err);
    throw err;
  }
}

/**
 * 验证图片
 */
export function validateImage(file: File): string | null {
  // 检查文件大小
  if (file.size > OCR_CONFIG.IMAGE_MAX_SIZE) {
    return '图片大小不能超过 4MB';
  }

  // 检查文件格式
  const format = file.name.split('.').pop()?.toLowerCase();
  if (!format || !OCR_CONFIG.SUPPORTED_FORMATS.includes(format)) {
    return '仅支持 JPG、PNG、BMP 格式的图片';
  }

  return null;
}