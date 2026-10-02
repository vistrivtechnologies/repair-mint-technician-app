import {Colors} from '../constant';

export const statusTheme = (status: string) => {
    const STATUS_STYLES: Record<
      string,
      { backgroundColor: string; color: string }
    > = {
      pending: { backgroundColor: Colors.STATUS.WARNING_SOFT, color: Colors.STATUS.WARNING },
      arrived: { backgroundColor: Colors.PRIMARY[600], color: Colors.SECONDARY[100] },
      'before-work': { backgroundColor: Colors.STATUS.WARNING_SOFT, color: Colors.STATUS.WARNING },
      'work-started': { backgroundColor: Colors.STATUS.INFO_SOFT, color: Colors.STATUS.INFO },
      'after-work': { backgroundColor: Colors.STATUS.WARNING_SOFT, color: Colors.STATUS.WARNING },
      completed: { backgroundColor: Colors.STATUS.SUCCESS_SOFT, color: Colors.STATUS.SUCCESS },
    };
  
    return STATUS_STYLES[status] || { backgroundColor: Colors.LIGHT_GREY_3, color: Colors.BODY };
  };
  