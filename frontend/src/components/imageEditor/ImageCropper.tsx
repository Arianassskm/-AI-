import { useState, useRef, useEffect } from 'react';
import { cropImage, CropArea } from '../../utils/imageTransform';

interface ImageCropperProps {
  imageUrl: string;
  onComplete: (cropArea: CropArea) => void;
  onCancel: () => void;
}

export function ImageCropper({ imageUrl, onComplete, onCancel }: ImageCropperProps) {
  const [cropArea, setCropArea] = useState<CropArea>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current && containerRef.current) {
      const { width, height } = imageRef.current;
      const minDimension = Math.min(width, height);
      setCropArea({
        x: (width - minDimension) / 2,
        y: (height - minDimension) / 2,
        width: minDimension,
        height: minDimension
      });
    }
  }, [imageUrl]);

  const handleCrop = async () => {
    try {
      const croppedImage = await cropImage(imageUrl, cropArea);
      onComplete(cropArea);
    } catch (error) {
      console.error('Crop failed:', error);
    }
  };

  return (
    <div className="relative w-full h-full" ref={containerRef}>
      <img
        ref={imageRef}
        src={imageUrl}
        alt="To crop"
        className="max-w-full max-h-full object-contain"
      />
      <div
        className="absolute border-2 border-white/50 rounded-lg cursor-move"
        style={{
          left: `${cropArea.x}px`,
          top: `${cropArea.y}px`,
          width: `${cropArea.width}px`,
          height: `${cropArea.height}px`
        }}
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
        >
          取消
        </button>
        <button
          onClick={handleCrop}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          确认
        </button>
      </div>
    </div>
  );
}