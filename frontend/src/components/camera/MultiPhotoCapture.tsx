import { useState, useRef, useEffect } from "react";
import {
  Camera,
  Image as ImageIcon,
  RotateCw,
  Crop,
  Check,
  ArrowLeft,
} from "lucide-react";
import { CaptureGuide, type CaptureStep } from "./CaptureGuide";
import { ImageEditor } from "../imageEditor/ImageEditor";
import { useCamera } from "../../hooks/useCamera";
import { validateImage } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";

interface MultiPhotoCaptureProps {
  onCapture: (images: string[]) => void;
  onClose: () => void;
  maxPhotos?: number;
  captureSteps?: CaptureStep[];
  currentStep?: number;
  onStepChange?: (step: number) => void;
}

export function MultiPhotoCapture({
  onCapture,
  onClose,
  maxPhotos = 4,
  captureSteps,
  currentStep = 1,
  onStepChange,
}: MultiPhotoCaptureProps) {
  const [showEditor, setShowEditor] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 修改 useCamera hook 的使用
  const { startCamera, stopCamera, takePhoto } = useCamera(videoRef, {
    onError: async (error) => {
      console.error("摄像头错误:", error);
      // 出错时尝试重新初始化
      await startCamera();
    },
  });

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";
    startCamera();
    return () => {
      stopCamera();
      if (nav) nav.style.display = "block";
    };
  }, [startCamera, stopCamera]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    if (capturedPhotos.length + files.length > maxPhotos) {
      alert(`最多只能上传${maxPhotos}张图片`);
      return;
    }

    for (const file of files) {
      const error = validateImage(file);
      if (error) {
        alert(error);
        return;
      }

      const reader = new FileReader();
      try {
        const imageUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        setCurrentPhoto(imageUrl);
        setShowEditor(true);
      } catch (err) {
        console.error("Image processing error:", err);
      }
    }

    event.target.value = "";
  };

  // 修改 handleEditorSave 函数
  const handleEditorSave = async (editedPhoto: string) => {
    setCapturedPhotos((prev) => [...prev, editedPhoto]);
    if (onStepChange && currentStep < (captureSteps?.length || maxPhotos)) {
      onStepChange(currentStep + 1);
    }
    setShowEditor(false);
    setCurrentPhoto(null);

    // 重新初始化摄像头
    await startCamera();
  };

  // 修改 handlePhotoCapture 函数
  const handlePhotoCapture = async () => {
    try {
      const photo = await takePhoto();
      if (photo) {
        // 停止摄像头流
        await stopCamera();
        setCurrentPhoto(photo);
        setShowEditor(true);
      }
    } catch (error) {
      console.error("拍照出错:", error);
      // 如果出错，尝试重新初始化摄像头
      await startCamera();
    }
  };

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";

    // 初始化摄像头
    startCamera().catch((error) => {
      console.error("初始化摄像头失败:", error);
    });

    return () => {
      stopCamera();
      if (nav) nav.style.display = "block";
    };
  }, [startCamera, stopCamera]);

  const handlePhotoDelete = (index: number) => {
    setCapturedPhotos((prev) => prev.filter((_, i) => i !== index));
    if (onStepChange && currentStep > 1) {
      onStepChange(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (capturedPhotos.length > 0) {
      onCapture(capturedPhotos);
    }
    // 检查是否在手机浏览器上
    if (!isMobileBrowser()) {
      handleClose();
    }
  };

  // 检查是否在手机浏览器上的辅助函数
  const isMobileBrowser = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const handleClose = () => {
    stopCamera();
    onClose();
    navigate(-1);
  };

  const currentStepInfo = captureSteps?.[currentStep - 1];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col h-[100dvh]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={handleClose}
            className="!bg-black/30 !border-white/20 !text-white hover:!bg-black/40"
          >
            返回
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-white/80 text-sm">
              {currentStep}/{captureSteps?.length || maxPhotos}
            </span>
          </div>
        </div>
      </div>

      {showEditor && currentPhoto ? (
        <ImageEditor
          imageUrl={currentPhoto}
          onSave={handleEditorSave}
          onCancel={() => {
            setShowEditor(false);
            setCurrentPhoto(null);
          }}
        />
      ) : (
        <>
          {/* Camera View */}
          <div className="relative flex-1 overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {currentStepInfo && (
              <CaptureGuide
                currentStep={currentStep}
                totalPhotos={captureSteps?.length || maxPhotos}
                step={currentStepInfo}
              />
            )}

            {/* Preview Strip */}
            {capturedPhotos.length > 0 && (
              <div className="absolute bottom-24 left-4 right-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {capturedPhotos.map((photo, index) => (
                    <div key={index} className="relative flex-shrink-0">
                      <img
                        src={photo}
                        alt={`Preview ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-white/20"
                      />
                      <button
                        onClick={() => handlePhotoDelete(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-black/50 backdrop-blur-sm rounded-full text-white flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Controls */}
          <div className="bg-black/90 backdrop-blur-sm safe-area-bottom">
            <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
              <Button
                variant="outline"
                size="lg"
                icon={<ImageIcon className="w-5 h-5" />}
                onClick={() => fileInputRef.current?.click()}
                className="!bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
              >
                相册
              </Button>

              <button
                onClick={handlePhotoCapture}
                disabled={capturedPhotos.length >= maxPhotos}
                className={cn(
                  "w-16 h-16 rounded-full relative",
                  "before:content-[''] before:absolute before:inset-0 before:rounded-full",
                  "before:border-4 before:border-white before:scale-110",
                  "after:content-[''] after:absolute after:inset-2 after:rounded-full after:bg-white",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              />

              <Button
                variant="outline"
                size="lg"
                icon={<Check className="w-5 h-5" />}
                onClick={handleComplete}
                disabled={capturedPhotos.length === 0}
                className="!bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
              >
                完成
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
