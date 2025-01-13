import { useState } from 'react';
import { RotateCcw, RotateCw } from 'lucide-react';
import { rotateImage } from '../../utils/imageTransform';

interface ImageRotatorProps {
  imageUrl: string;
  onComplete: (rotatedImageUrl: string) => void;
  onCancel: () => void;
}

export function ImageRotator({ imageUrl, onComplete, onCancel }: ImageRotatorProps) {
  const [rotation, setRotation] = useState(0);

  const handleRotate = async (direction: 'left' | 'right') => {
    const newRotation = rotation + (direction === 'left' ? -90 : 90);
    setRotation(newRotation);
    
    try {
      const rotatedImage = await rotateImage(imageUrl, newRotation);
      onComplete(rotatedImage);
    } catch (error) {
      console.error('Rotation failed:', error);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <img
        src={imageUrl}
        alt="To rotate"
        className="max-w-full max-h-[calc(100%-100px)] object-contain transition-transform duration-300"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
      <div className="absolute bottom-4 flex gap-4">
        <button
          onClick={() => handleRotate('left')}
          className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleRotate('right')}
          className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20"
        >
          <RotateCw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}