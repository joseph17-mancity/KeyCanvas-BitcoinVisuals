
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import QRCode from '@/components/QRCode';
import VisualMnemonic from '@/components/VisualMnemonic';
import Logo from '@/components/Logo';

const SharePage = () => {
  const { address } = useParams<{ address: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    // Validate address format - very basic validation for now
    if (!address || address.length < 26) {
      setIsValid(false);
    }
    setIsLoading(false);
  }, [address]);

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    }
  };

  const shareAddress = async () => {
    if (!address) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Bitcoin Address',
          text: `Here is a Bitcoin address: ${address}`,
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 flex flex-col items-center">
            <Logo />
            <h1 className="text-xl font-bold mt-4">Invalid Address</h1>
            <p className="text-gray-500 mt-2 text-center">
              The Bitcoin address provided is not valid or is missing.
            </p>
            <Link to="/app" className="mt-6">
              <Button variant="outline">Go to KeyCanvas App</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="py-4 px-4 border-b bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Logo size="sm" />
          </Link>
          <Link to="/app">
            <Button variant="outline" size="sm">Open App</Button>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container py-8 px-4">
        <div className="max-w-md mx-auto">
          <Link to="/app" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to KeyCanvas</span>
          </Link>
          
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <h1 className="text-xl font-bold mb-6">Bitcoin Address</h1>
              
              <div className="w-full mb-6">
                <div className="flex items-center justify-center mb-8">
                  <QRCode value={address} size={240} downloadable={true} />
                </div>
                
                <div className="flex items-center space-x-4 bg-gray-50 rounded-md p-3 w-full mb-4">
                  <VisualMnemonic address={address} size="md" />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs text-gray-500">Bitcoin Address</p>
                    <p className="font-mono text-sm truncate">{address}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 w-full">
                  <Button 
                    className="w-full flex items-center justify-center space-x-2"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy Address</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2"
                    onClick={shareAddress}
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Always verify the visual pattern matches when using this address
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 px-4 border-t bg-white/60">
        <div className="container text-center text-sm text-gray-500">
          KeyCanvas — Making Bitcoin addresses more human-friendly
        </div>
      </footer>
    </div>
  );
};

export default SharePage;
