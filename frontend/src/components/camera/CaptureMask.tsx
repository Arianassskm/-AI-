interface CaptureMaskProps {
  message: string;
}

export function CaptureMask({ message }: CaptureMaskProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* 半透明遮罩 */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* 中心透明区域 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 relative">
          {/* 透明区域边框 */}
          <div className="absolute inset-0 border-2 border-white/50 rounded-lg">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-white" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-white" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-white" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-white" />
          </div>
          
          {/* 引导文字 */}
          <div className="absolute -bottom-12 left-0 right-0 text-center">
            <p className="text-white/90 text-sm font-medium">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}