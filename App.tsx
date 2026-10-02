import React, {FC, useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import Route from './src/routes';
import {
  AssignedSRContextProvider,
  UserDataContextProvider,
} from './src/context';
import Toast from 'react-native-toast-message';
import {PaperProvider} from 'react-native-paper';
import {PopupProvider} from './src/context/popupContext';
import {InventoryProvider} from './src/context/inventoryContext';
import SplashScreen from './src/screens/splash/SplashScreen';

const App: FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Hiding warning logs - only used in debug mode
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();

    const splashTimer = setTimeout(() => setShowSplash(false), 1700);
    return () => clearTimeout(splashTimer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <UserDataContextProvider>
      <PopupProvider>
        <PaperProvider>
          <InventoryProvider>
            <AssignedSRContextProvider>
              <Route />
              <Toast />
            </AssignedSRContextProvider>
          </InventoryProvider>
        </PaperProvider>
      </PopupProvider>
    </UserDataContextProvider>
  );
};

export default App;
