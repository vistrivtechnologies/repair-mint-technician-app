export const statusTheme = (status: string) => {
    const STATUS_STYLES: Record<
      string,
      { backgroundColor: string; color: string }
    > = {
      pending: { backgroundColor: '#FFE5B4', color: '#8A4B00' },
      arrived: { backgroundColor: '#D1F2EB', color: '#117864' },
      'before-work': { backgroundColor: '#F9E79F', color: '#7D6608' },
      'work-started': { backgroundColor: '#AED6F1', color: '#154360' },
      'after-work': { backgroundColor: '#F5CBA7', color: '#6E2C00' },
      completed: { backgroundColor: '#D4EFDF', color: '#1D8348' },
    };
  
    return STATUS_STYLES[status] || { backgroundColor: '#E0E0E0', color: '#000' };
  };
  