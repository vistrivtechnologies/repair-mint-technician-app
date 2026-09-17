import {API_ROUTES} from './apiRoutes';
import {axiosInstance} from './axiosInstance';
import {crypto} from '../helpers/crypto';

const fcmToken =
  'cftGDkVyZ1c3tnYyjNVsrx:APA91bEDNCObroCE_Kid_fYa3-iH2g4lOdeHI4Ywb0_384pTZcpfPnvmx3c2qVGR-Fwr8u4X1uBxyOo3q-YpM2p6KowCzGJj4Y-scU2S9dmlvQrHC8kL_fk';

const sendOtp = async (data: any) => {
  try {
    const response = await axiosInstance.post(API_ROUTES.AUTH_ROUTES.OTP, data);

    console.log('response: ', response);
    const decryptedData = crypto.decode(response.data?.encryptedData);
    return decryptedData;
  } catch (err: any) {
    console.log('err: ', err);
    const decryptedData = crypto.decode(err?.response?.data?.encryptedData);
    throw decryptedData;
  }
};
const login = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      API_ROUTES.AUTH_ROUTES.LOGIN,
      data,
      {
        headers: {
          'fcm-token': fcmToken,
        },
      },
    );
    const decryptedData = crypto.decode(response.data?.encryptedData);
    return decryptedData;
  } catch (err: any) {
    const decryptedData = crypto.decode(err?.response?.data?.encryptedData);
    throw decryptedData;
  }
};
const register = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      API_ROUTES.AUTH_ROUTES.REGISTER,
      data,
      {
        headers: {
          'fcm-token': fcmToken,
        },
      },
    );
    const decryptedData = crypto.decode(response.data?.encryptedData);
    return decryptedData;
  } catch (err: any) {
    const decryptedData = crypto.decode(err?.response?.data?.encryptedData);
    throw decryptedData;
  }
};
const createQuotation = async (token: string, data: any) => {
  try {
    const response = await axiosInstance.post(
      API_ROUTES.SERVICE_REQUEST_ROUTES.CREATE_QUOTAION,
      data,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    const decryptedData = crypto.decode(response.data?.encryptedData);
    return decryptedData;
  } catch (err: any) {
    const decryptedData = crypto.decode(err?.response?.data?.encryptedData);
    throw decryptedData;
  }
};

export const API = {
  sendOtp,
  login,
  register,
  createQuotation
};
