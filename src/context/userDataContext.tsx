import React, {
  FC,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { LocalStorage } from "../helpers/localstorage";

// const UserDataContext = createContext({});
export interface UserData {
  userData: any;
  setUserData: (data: any) => void;
  isDarkMode: any;
  setDarkmode: (data: any) => void;
}

const UserDataContext = createContext<UserData>({
  userData: null,
  setUserData: () => {},
  isDarkMode: null,
  setDarkmode: () => {},
});
type Props = {
  children?: ReactNode;
};

const UserDataContextProvider: FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>("");
  const [isDarkMode, setDarkmode] = useState<any>("");
  useEffect(() => {
    setContextDataFromStorage();
  }, []);

  const setContextDataFromStorage = async () => {
    let val = await LocalStorage.read("@login");
    let user = await LocalStorage.read("@user");
    let dark = await LocalStorage.read("@dark");
    setUserData(user);
    setIsLoggedIn(val);
    setDarkmode(dark);
  };

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        isDarkMode,
        setDarkmode,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContextProvider, UserDataContext };
