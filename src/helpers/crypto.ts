import CryptoJS from 'crypto-js';
const secretKey = '7A9Q2641PZ023';

export const crypto = {
  encode: (data = '') => {
    if (!data) {
      throw new Error('No data provided for encryption.');
    }
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey,
    ).toString();
    return encryptedData;
  },
  decode: (encryptedData = '') => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  },
};
