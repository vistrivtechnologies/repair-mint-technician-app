export const API_ROUTES = {
  AUTH_ROUTES: {
    LOGIN: '/login',
    REGISTER: '/register',
    OTP: '/otp/send',
    PROFILE: '/profile',
  },
  SERVICE_REQUEST_ROUTES: {
    ASSIGNED_SR: '/servicerequests/assigned?page=1&limit=10',
    APPROVE_SERVICE_REQUEST: '/servicerequest/approval',
    WORKFLOW_STATUS: '/technician/workflow/status',
    GET_ONE_SR: '/servicerequest/assigned',
    CREATE_QUOTAION: '/quotation',
  },
  INVENTORY_ROUTES: {
    INVENTORIES: "/inventories?page=1&limit=10"
  }
};
