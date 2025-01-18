import { useCallback, useRef } from "react";

interface UseCameraOptions {
  onError?: (error: Error) => void;
}

export function useCamera(
  videoRef: React.RefObject<HTMLVideoElement>,
  options: UseCameraOptions = {}
) {
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      options.onError?.(error as Error);
    }
  }, [videoRef, options]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [videoRef]);

  const takePhoto = useCallback(async () => {
    if (!videoRef.current) return null;

    try {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;

      // 设置canvas尺寸为视频的实际尺寸
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      // 绘制当前视频帧
      ctx.drawImage(video, 0, 0);

      // 转换为base64
      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);

      return dataUrl;
    } catch (error) {
      console.error("Take photo error:", error);
      options.onError?.(error as Error);
      return null;
    }
  }, [videoRef, options]);

  return {
    startCamera,
    stopCamera,
    takePhoto,
  };
}
