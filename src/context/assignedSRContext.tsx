import React, {
  FC,
  createContext,
  ReactNode,
  useState,
} from 'react';

// const AssignedSRContext = createContext({});
export interface AssignedSR {
  assignedSR: any[];
  setAssignedSR: (data: any) => void;
}

const AssignedSRContext = createContext<AssignedSR>({
  assignedSR: [],
  setAssignedSR: () => { },
});
type Props = {
  children?: ReactNode;
};

const AssignedSRContextProvider: FC<Props> = ({ children }) => {
  const [assignedSR, setAssignedSR] = useState<any[]>([]);


  return (
    <AssignedSRContext.Provider
      value={{
        assignedSR,
        setAssignedSR,
      }}
    >
      {children}
    </AssignedSRContext.Provider>
  );
};

export { AssignedSRContextProvider, AssignedSRContext };
