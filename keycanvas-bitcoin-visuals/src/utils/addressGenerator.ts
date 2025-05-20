
// This is a mock Bitcoin address generator for demonstration purposes only
// In a real application, we would use a secure method to generate actual Bitcoin addresses

// Common Bitcoin address prefixes
const ADDRESS_PREFIXES = [
  'bc1q', // Bech32 SegWit
  '3',    // P2SH
  '1'     // Legacy
];

// Random hex characters
const HEX_CHARS = '0123456789abcdef';

/**
 * Generates a random character from the given character set
 */
const getRandomChar = (charSet: string): string => {
  return charSet.charAt(Math.floor(Math.random() * charSet.length));
};

/**
 * Generates a random string of the specified length from the given character set
 */
const generateRandomString = (length: number, charSet: string): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += getRandomChar(charSet);
  }
  return result;
};

/**
 * Generates a plausible-looking mock Bitcoin address
 * Note: These are NOT valid Bitcoin addresses and should NOT be used for real transactions
 */
export const generateBitcoinAddress = (): string => {
  // Select a random prefix
  const prefix = ADDRESS_PREFIXES[Math.floor(Math.random() * ADDRESS_PREFIXES.length)];
  
  // Determine length based on prefix (to make it look realistic)
  let length: number;
  switch (prefix) {
    case 'bc1q':
      length = 39; // Total 43 chars including prefix
      break;
    case '3':
      length = 33; // Total 34 chars including prefix
      break;
    case '1':
      length = 33; // Total 34 chars including prefix
      break;
    default:
      length = 33;
  }
  
  // Generate the main part of the address
  const mainPart = generateRandomString(length, HEX_CHARS);
  
  return `${prefix}${mainPart}`;
};

// Export a function that returns a cached address for demo consistency
let cachedAddress: string | null = null;

export const getBitcoinAddress = (): string => {
  if (!cachedAddress) {
    cachedAddress = generateBitcoinAddress();
  }
  return cachedAddress;
};

export const refreshBitcoinAddress = (): string => {
  cachedAddress = generateBitcoinAddress();
  return cachedAddress;
};
