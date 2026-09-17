import React, {FC, useContext} from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackNavigator, HomeStackNavigator} from '../navigation';
import {Platform, StatusBar, useColorScheme} from 'react-native';
const Stack = createNativeStackNavigator();
import {UserData, UserDataContext} from '../context/userDataContext';
import {Colors} from '../constant';
import PopupMessageModal from '../components/PopupMessageModal/PopupMessageModal';
import {usePopup} from '../context/popupContext';

const Route: FC = () => {
  const {isVisible} = usePopup();
  const {userData} = useContext<UserData>(UserDataContext);
  const theme = useColorScheme();
  return (
    <>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
          backgroundColor={Colors.PRIMARY[100]}
        />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {userData?.user?._id ? (
            <Stack.Screen
              name="HomeStackNavigator"
              component={HomeStackNavigator}
            />
          ) : (
            <Stack.Screen
              name="AuthStackNavigator"
              component={AuthStackNavigator}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {isVisible && <PopupMessageModal visible={isVisible} />}
    </>
  );
};
export default Route;
