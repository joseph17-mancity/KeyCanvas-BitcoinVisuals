
import React, { useState } from 'react';
import { Copy, Share2, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QRCode from '@/components/QRCode';
import VisualMnemonic from '@/components/VisualMnemonic';

interface ShareModalProps {
  address: string;
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ 
  address, 
  isOpen, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState('qr');
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied to clipboard');
  };
  
  const shareAddress = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Bitcoin Address',
          text: `Here is my Bitcoin address: ${address}`,
          url: window.location.href
        });
        toast.success('Successfully shared!');
      } else {
        copyToClipboard();
        toast.info('Share API not supported, address copied to clipboard instead');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Could not share address');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Share Your Bitcoin Address</DialogTitle>
          <DialogDescription className="text-center">
            Share this address with others to receive Bitcoin
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="qr">QR Code</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>
          
          <TabsContent value="qr" className="flex flex-col items-center space-y-4">
            <div className="pt-2 w-full flex justify-center">
              <QRCode value={address} downloadable={true} />
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              Tap the QR code to download it or share it directly
            </p>
            
            <Button 
              className="w-full flex items-center justify-center space-x-2"
              onClick={shareAddress}
              variant="outline"
            >
              <Share2 className="h-4 w-4" />
              <span>Share QR Code</span>
            </Button>
          </TabsContent>
          
          <TabsContent value="text" className="flex flex-col space-y-5">
            <div className="flex items-center space-x-4 bg-gray-50 rounded-md p-3 w-full">
              <VisualMnemonic address={address} size="sm" />
              <p className="font-mono text-sm flex-1 break-all">{address}</p>
            </div>
            
            <Button 
              className="w-full flex items-center justify-center space-x-2"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
              <span>Copy Address</span>
            </Button>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex-col sm:flex-row sm:justify-center gap-2 pt-2">
          <p className="text-xs text-gray-500 text-center w-full">
            Always verify the visual pattern matches when sharing this address
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
