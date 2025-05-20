
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import VisualMnemonic from '@/components/VisualMnemonic';
import AddressDisplay from '@/components/AddressDisplay';
import ShareModal from '@/components/ShareModal';
import CompareAddressModal from '@/components/CompareAddressModal';
import Logo from '@/components/Logo';
import { getBitcoinAddress, refreshBitcoinAddress } from '@/utils/addressGenerator';
import { ChartBar } from 'lucide-react';

const Index = () => {
  const [address, setAddress] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('receive');

  useEffect(() => {
    // Initialize with a Bitcoin address
    setAddress(getBitcoinAddress());
  }, []);

  const handleGenerateNewAddress = () => {
    setAddress(refreshBitcoinAddress());
  };

  const handleOpenShareModal = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };

  const handleOpenCompareModal = () => {
    setIsCompareModalOpen(true);
  };

  const handleCloseCompareModal = () => {
    setIsCompareModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="py-4 px-4 border-b bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Visually Verified Bitcoin Sharing
            </div>
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="gap-2">
                <ChartBar size={16} />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container py-8 px-4 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-gray-200 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Your Bitcoin Canvas</CardTitle>
              <CardDescription>
                Each address has its own unique visual pattern for easier verification
              </CardDescription>
            </CardHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center">
                <TabsList className="mb-6">
                  <TabsTrigger value="receive">Receive Bitcoin</TabsTrigger>
                  <TabsTrigger value="about">About KeyCanvas</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="receive" className="space-y-8">
                <CardContent className="flex flex-col items-center pt-4 space-y-8">
                  <div className="w-full max-w-sm mx-auto">
                    <div className="flex flex-col items-center space-y-6">
                      <VisualMnemonic address={address} size="lg" className="h-32 w-32 border-2" />
                      <div className="text-center">
                        <h3 className="text-lg font-medium">Your Visual Mnemonic</h3>
                        <p className="text-sm text-gray-500">
                          Remember this unique pattern - it helps verify your address at a glance
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <AddressDisplay address={address} />
                  
                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    <Button 
                      variant="outline" 
                      className="flex-1" 
                      onClick={handleGenerateNewAddress}
                    >
                      Generate New
                    </Button>
                    <Button 
                      className="flex-1 bg-keycanvas-blue hover:bg-keycanvas-blue/90" 
                      onClick={handleOpenShareModal}
                    >
                      Share Address
                    </Button>
                  </div>
                  
                  <div className="w-full max-w-md">
                    <Button 
                      variant="secondary"
                      className="w-full"
                      onClick={handleOpenCompareModal}
                    >
                      Compare With Another Address
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Received an address from someone? Compare it visually before sending funds.
                    </p>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="about">
                <CardContent className="pt-4 space-y-6">
                  <div className="prose prose-sm max-w-none">
                    <h3>What is KeyCanvas?</h3>
                    <p>
                      KeyCanvas makes Bitcoin addresses more human-friendly by giving each address a unique visual pattern that's easier to recognize and verify than long strings of characters.
                    </p>
                    
                    <h3>Why Visual Verification?</h3>
                    <p>
                      Bitcoin addresses are long and complex, making them difficult to verify by eye. Visual patterns are much easier for humans to recognize, adding an extra layer of security when sharing addresses.
                    </p>
                    
                    <h3>How to Use It</h3>
                    <ul>
                      <li>Generate a Bitcoin address</li>
                      <li>Memorize its unique visual pattern</li>
                      <li>When sharing your address, verify both the text AND the visual pattern match</li>
                      <li>Use the comparison tool to verify addresses side-by-side</li>
                    </ul>
                    
                    <div className="bg-blue-50 p-4 rounded-md my-4">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> This is a demonstration prototype. In a real application, addresses would be cryptographically generated and securely stored.
                      </p>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-8">
                      Inspired by <a href="https://bitcoin.design" className="text-keycanvas-blue hover:underline" target="_blank" rel="noopener noreferrer">
                        Bitcoin Design Community
                      </a>
                    </p>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 px-4 border-t bg-white/60">
        <div className="container text-center text-sm text-gray-500">
          KeyCanvas — Making Bitcoin addresses more human-friendly
        </div>
      </footer>
      
      {/* Share Modal */}
      <ShareModal 
        address={address} 
        isOpen={isShareModalOpen} 
        onClose={handleCloseShareModal} 
      />
      
      {/* Compare Modal */}
      <CompareAddressModal
        baseAddress={address}
        isOpen={isCompareModalOpen}
        onClose={handleCloseCompareModal}
      />
    </div>
  );
};

export default Index;
