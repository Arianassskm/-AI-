/**
 * 处理后的图片结果
 */
export interface ProcessedImage {
  dataUrl: string;
  width: number;
  height: number;
}

/**
 * 将 File 对象转换为 Data URL
 */
export async function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to Data URL'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * 调整图片大小并压缩
 */
export async function resizeAndCompressImage(
  input: string | File,
  maxWidth: number = 1024,
  quality: number = 0.8
): Promise<ProcessedImage> {
  try {
    // 如果输入是 File，先转换为 Data URL
    const dataUrl = input instanceof File 
      ? await fileToDataURL(input) 
      : input;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        resolve({
          dataUrl: canvas.toDataURL('image/jpeg', quality),
          width,
          height
        });
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = dataUrl;
    });
  } catch (error) {
    throw new Error(`Image processing failed: ${error.message}`);
  }
}