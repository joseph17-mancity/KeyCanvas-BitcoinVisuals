
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import VisualMnemonic from '@/components/VisualMnemonic';
import { getBitcoinAddress } from '@/utils/addressGenerator';

interface CompareAddressModalProps {
  baseAddress: string;
  isOpen: boolean;
  onClose: () => void;
}

const CompareAddressModal: React.FC<CompareAddressModalProps> = ({ 
  baseAddress, 
  isOpen, 
  onClose 
}) => {
  // State for the comparison address
  const [comparisonAddress, setComparisonAddress] = useState('');
  const [isAddressMatched, setIsAddressMatched] = useState<boolean | null>(null);

  // Generate a random example address if none is provided
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComparisonAddress(e.target.value);
    setIsAddressMatched(null); // Reset match state when input changes
  };

  // Example addresses for demonstration
  const handleUseExampleAddress = () => {
    setComparisonAddress(getBitcoinAddress());
    setIsAddressMatched(null);
  };

  const handleCompare = () => {
    // In a real app, you'd do proper validation and comparison
    // For demo, we'll just compare the strings
    if (comparisonAddress.trim() === '') {
      return;
    }
    
    setIsAddressMatched(comparisonAddress === baseAddress);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compare Bitcoin Addresses</DialogTitle>
          <DialogDescription>
            Verify both the text and visual pattern match before sending funds
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Your address */}
          <div>
            <h3 className="text-sm font-medium mb-2">Your Address</h3>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md border">
              <VisualMnemonic address={baseAddress} size="md" />
              <span className="font-mono text-sm truncate">{baseAddress}</span>
            </div>
          </div>
          
          {/* Address to compare */}
          <div>
            <h3 className="text-sm font-medium mb-2">Address to Compare</h3>
            <div className="flex">
              <Input 
                value={comparisonAddress}
                onChange={handleInputChange}
                placeholder="Enter Bitcoin address to compare"
                className="font-mono"
              />
              <Button 
                variant="outline" 
                className="ml-2 whitespace-nowrap" 
                onClick={handleUseExampleAddress}
              >
                Use Example
              </Button>
            </div>
            {comparisonAddress && (
              <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-md border">
                <VisualMnemonic address={comparisonAddress} size="md" />
                <span className="font-mono text-sm truncate">{comparisonAddress}</span>
              </div>
            )}
          </div>
          
          {/* Results */}
          {isAddressMatched !== null && (
            <div className={`p-4 rounded-md ${isAddressMatched ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
              <p className={`font-medium ${isAddressMatched ? 'text-green-700' : 'text-red-700'}`}>
                {isAddressMatched 
                  ? '✅ The addresses match! Both text and visual patterns are identical.'
                  : '❌ The addresses do not match! Be careful - sending to the wrong address could result in permanent loss of funds.'}
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="sm:order-first">Cancel</Button>
          <Button 
            onClick={handleCompare} 
            className="bg-keycanvas-blue hover:bg-keycanvas-blue/90"
            disabled={!comparisonAddress}
          >
            Compare Addresses
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompareAddressModal;
