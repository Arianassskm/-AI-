import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { BrowserMultiFormatReader } from '@zxing/library';

interface BarcodeScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  const startScanning = async () => {
    try {
      setIsScanning(true);
      const videoInputDevices = await codeReader.current.listVideoInputDevices();
      const selectedDeviceId = videoInputDevices[0].deviceId;

      await codeReader.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current!,
        (result) => {
          if (result) {
            onScan(result.getText());
            stopScanning();
            onClose();
          }
        }
      );
    } catch (err) {
      console.error('Scanner error:', err);
      alert('无法启动扫描器，请确保已授予相机权限');
    }
  };

  const stopScanning = () => {
    codeReader.current.reset();
    setIsScanning(false);
  };

  // Start scanning when component mounts
  useState(() => {
    startScanning();
    return () => stopScanning();
  });

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="relative flex-1">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-white rounded-lg">
            <div className="absolute inset-0 border-2 border-white/50 animate-pulse" />
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="bg-black p-4">
        <p className="text-white text-center">
          将条形码/二维码对准扫描框
        </p>
      </div>
    </div>
  );
}