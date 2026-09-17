import RNFS from 'react-native-fs';

export const getBase64FromUri = async (uri: string) => {
    try {
        const base64 = await RNFS.readFile(uri, 'base64');
        return base64;
      } catch (err) {
        console.error('Error reading file:', err);
        return null;
      }
};
