
import React from 'react';
import { cn } from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';
import VisualMnemonic from '@/components/VisualMnemonic';
import { Loader2 } from 'lucide-react';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
  downloadable?: boolean;
}

const QRCode: React.FC<QRCodeProps> = ({ 
  value, 
  size = 180, 
  className,
  downloadable = false
}) => {
  const [isLoading, setIsLoading] = React.useState(true);

  // Handle QR code load completion
  const handleQRLoad = () => {
    setIsLoading(false);
  };

  // Handle QR code download
  const handleDownload = () => {
    if (!downloadable) return;
    
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `keycanvas-bitcoin-${value.substring(0, 8)}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  React.useEffect(() => {
    // Reset loading state when value changes
    setIsLoading(true);
    // Simulate load time
    const timer = setTimeout(() => handleQRLoad(), 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center rounded-lg p-4 bg-white border shadow-sm', 
        downloadable && 'cursor-pointer hover:shadow-md transition-all',
        className
      )}
      style={{ width: size, height: size }}
      onClick={downloadable ? handleDownload : undefined}
    >
      <div className="flex flex-col items-center relative w-full h-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full w-full">
            <Loader2 className="h-10 w-10 text-keycanvas-blue animate-spin" />
          </div>
        ) : (
          <>
            {/* Use the actual QR code generator */}
            <QRCodeSVG 
              id="qr-canvas"
              value={value}
              size={size * 0.8}
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="L" // L, M, Q, H - error correction level
              includeMargin={false}
              className="mt-2"
            />
            
            {/* Visual mnemonic overlay in center of QR code */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white p-1.5 rounded-md">
                <VisualMnemonic address={value} size="sm" className="h-8 w-8 border-none bg-transparent" />
              </div>
            </div>
          </>
        )}
        
        <span className="text-xs text-gray-500 mt-auto">
          {downloadable ? "Tap to download QR code" : "Scan to share address"}
        </span>
      </div>
    </div>
  );
};

export default QRCode;
