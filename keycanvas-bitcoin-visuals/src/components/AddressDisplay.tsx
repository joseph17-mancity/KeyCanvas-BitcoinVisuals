
import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import VisualMnemonic from '@/components/VisualMnemonic';
import { cn } from '@/lib/utils';

interface AddressDisplayProps {
  address: string;
  className?: string;
}

const AddressDisplay: React.FC<AddressDisplayProps> = ({ address, className }) => {
  const [copied, setCopied] = useState(false);

  // Format address for display (e.g., bc1q...a8j9)
  const formattedAddress = address.length > 16
    ? `${address.substring(0, 8)}...${address.substring(address.length - 4)}`
    : address;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success('Address copied to clipboard');
    
    // Reset copied state after a delay
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={cn('flex flex-col items-center space-y-4', className)}>
      <div className="flex items-center justify-between w-full max-w-md 
                    p-4 bg-white/80 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-4">
          <VisualMnemonic address={address} size="md" />
          <div>
            <div className="text-sm text-gray-500">Bitcoin Address</div>
            <div className="font-mono font-medium">{formattedAddress}</div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={copyToClipboard}
          className={cn(
            'transition-all',
            copied ? 'text-green-500' : 'text-gray-400 hover:text-keycanvas-blue'
          )}
          aria-label="Copy address"
        >
          <Copy className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default AddressDisplay;
