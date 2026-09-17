import {API_ROUTES} from './apiRoutes';
import {axiosInstance} from './axiosInstance';
import {crypto} from '../helpers/crypto';

const getProfile = async (token: string) => {
  try {
    const response = await axiosInstance.get(API_ROUTES.AUTH_ROUTES.PROFILE, {
      headers: {
        Authorization: token,
      },
    });
    const decryptedData = crypto.decode(response.data?.encryptedData);
    return decryptedData;
  } catch (err: any) {
    console.log('err: ', err);
    const decryptedData = crypto.decode(err?.response?.data?.encryptedData);
    throw decryptedData;
  }
};

// Service Request
const getAssignedSRs = async (token: string) => {
  try {
    const response = await axiosInstance.get(
      API_ROUTES.SERVICE_REQUEST_ROUTES.ASSIGNED_SR,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    const decryptedData = crypto.decode(response.data?.encryptedData);
    return decryptedData;
  } catch (err: any) {
    console.log('err: ', err);
    const decryptedData = crypto.decode(err?.response?.data?.encryptedData);
    throw decryptedData;
  }
};
// Service Request id
const getOneSR = async (token: string, payload: Record<string, any>) => {
  try {
    const response = await axiosInstance.get(
      API_ROUTES.SERVICE_REQUEST_ROUTES.GET_ONE_SR,
      {
        params: payload,
        headers: {
          Authorization: token,
        },
      },
    );

    const decryptedData = crypto.decode(response.data?.encryptedData);
    return decryptedData;
  } catch (err: any) {
    console.log('err: ', err);
    const decryptedData = crypto.decode(err?.response?.data?.encryptedData);
    throw decryptedData;
  }
};
// Service Request id
const getInventoryItems = async (token: string) => {
  try {
    const response = await axiosInstance.get(
      API_ROUTES.INVENTORY_ROUTES.INVENTORIES,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const decryptedData = crypto.decode(response.data?.encryptedData);
    return decryptedData;
  } catch (err: any) {
    console.log('err: ', err);
    const decryptedData = crypto.decode(err?.response?.data?.encryptedData);
    throw decryptedData;
  }
};

// Approve Service Request
const approveServiceRequest = async (token: string, payload: {}) => {
  try {
    const response = await axiosInstance.put(
      API_ROUTES.SERVICE_REQUEST_ROUTES.APPROVE_SERVICE_REQUEST,
      payload,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    const decryptedData = crypto.decode(response.data?.encryptedData);
    return decryptedData;
  } catch (err: any) {
    console.log('err: ', err);
    const decryptedData = crypto.decode(err?.response?.data?.encryptedData);
    throw decryptedData;
  }
};
// Workflow Status
const updateWorkflowStatus = async (token: string, payload: {}) => {
  try {
    const response = await axiosInstance.put(
      API_ROUTES.SERVICE_REQUEST_ROUTES.WORKFLOW_STATUS,
      payload,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    const decryptedData = crypto.decode(response.data?.encryptedData);
    return decryptedData;
  } catch (err: any) {
    console.log('err: ', err);
    const decryptedData = crypto.decode(err?.response?.data?.encryptedData);
    throw decryptedData;
  }
};

export const API = {
  getProfile,
  getAssignedSRs,
  approveServiceRequest,
  updateWorkflowStatus,
  getOneSR,
  getInventoryItems
};
