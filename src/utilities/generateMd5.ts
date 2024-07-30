import MD5 from 'crypto-js/md5';

export const generateMd5 = (timestamp: string) => {
  console.log('meta', import.meta.env.VITE_MARVEL_PUBLIC_KEY);
  const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
  const privateKey = import.meta.env.VITE_MARVEL_PIVATE_KEY;
  return MD5(`${timestamp}${privateKey}${publicKey}`);
};
