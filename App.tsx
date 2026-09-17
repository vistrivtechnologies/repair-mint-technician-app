import React, {FC, useEffect} from 'react';
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

const App: FC = () => {
  // Hiding warning logs - only used in debug mode
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();
  }, []);

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
