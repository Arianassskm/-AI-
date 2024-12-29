import { useState } from 'react';
import { Crop, RotateCw, Check, X, Move } from 'lucide-react';
import { ImageCropper } from './ImageCropper';
import { ImageRotator } from './ImageRotator';

interface ImageEditorProps {
  imageUrl: string;
  onSave: (editedImageUrl: string) => void;
  onCancel: () => void;
}

type EditMode = 'crop' | 'rotate' | null;

export function ImageEditor({ imageUrl, onSave, onCancel }: ImageEditorProps) {
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [previewUrl, setPreviewUrl] = useState(imageUrl);

  const handleCropComplete = (croppedImageUrl: string) => {
    setPreviewUrl(croppedImageUrl);
    setEditMode(null);
  };

  const handleRotateComplete = (rotatedImageUrl: string) => {
    setPreviewUrl(rotatedImageUrl);
    setEditMode(null);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-black/40">
        <div className="flex gap-4">
          <button
            onClick={() => setEditMode('crop')}
            className={`p-2 rounded-lg flex items-center gap-2 ${
              editMode === 'crop' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            <Crop className="w-5 h-5" />
            <span>裁剪</span>
          </button>
          <button
            onClick={() => setEditMode('rotate')}
            className={`p-2 rounded-lg flex items-center gap-2 ${
              editMode === 'rotate'
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            <RotateCw className="w-5 h-5" />
            <span>旋转</span>
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="p-2 rounded-lg bg-white/10 text-white/80 hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={() => onSave(previewUrl)}
            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            <Check className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {editMode === 'crop' && (
          <ImageCropper
            imageUrl={previewUrl}
            onComplete={handleCropComplete}
            onCancel={() => setEditMode(null)}
          />
        )}
        {editMode === 'rotate' && (
          <ImageRotator
            imageUrl={previewUrl}
            onComplete={handleRotateComplete}
            onCancel={() => setEditMode(null)}
          />
        )}
        {!editMode && (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-[calc(100vh-200px)] object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-2 bg-black/50 rounded-lg text-white/80 backdrop-blur-sm">
                <Move className="w-6 h-6" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}