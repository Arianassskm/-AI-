import { useState } from 'react';
import { X, Plus, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useOCR } from '../hooks/useOCR';

interface MultiImageUploadProps {
  onImagesProcessed: (images: Array<{ url: string; text: string[] }>) => void;
  maxImages?: number;
}

export function MultiImageUpload({ onImagesProcessed, maxImages = 4 }: MultiImageUploadProps) {
  const [images, setImages] = useState<Array<{ url: string; text: string[] }>>([]);
  const { loading, recognizeImage } = useOCR();
  
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    if (images.length + files.length > maxImages) {
      alert(`最多只能上传${maxImages}张图片`);
      return;
    }

    const processedImages: Array<{ url: string; text: string[] }> = [];

    for (const file of files) {
      const reader = new FileReader();
      try {
        const imageUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const results = await recognizeImage(imageUrl);
        if (results) {
          processedImages.push({ url: imageUrl, text: results });
        }
      } catch (err) {
        console.error('Image processing error:', err);
      }
    }

    const newImages = [...images, ...processedImages];
    setImages(newImages);
    onImagesProcessed(newImages);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesProcessed(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={image.url}
              alt={`药品图片 ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-xs truncate">
              {image.text[0] || '未识别到文字'}
            </div>
          </div>
        ))}
        
        {images.length < maxImages && (
          <label className="relative aspect-square cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              disabled={loading}
            />
            <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-blue-500 transition-colors">
              {loading ? (
                <>
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  <span className="text-sm text-gray-500">处理中...</span>
                </>
              ) : (
                <>
                  <Plus className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500">添加图片</span>
                </>
              )}
            </div>
          </label>
        )}
      </div>

      {images.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            请上传药品包装的清晰图片
            <br />
            <span className="text-sm text-gray-500">
              支持正面、配料表、使用说明等多个角度
            </span>
          </p>
        </div>
      )}
    </div>
  );
}