import React, { createContext, useContext, useState, ReactNode } from 'react';

type InventoryContextType = {
  inventories: any[];
  setInventories: React.Dispatch<React.SetStateAction<any[]>>;
};

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [inventories, setInventories] = useState<any[]>([]);

  return (
    <InventoryContext.Provider value={{ inventories, setInventories }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
