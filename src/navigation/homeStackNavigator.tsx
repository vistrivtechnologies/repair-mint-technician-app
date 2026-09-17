import React, { FC, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackProps } from '../@types';
import BottomTabNavigator from './bottomTabNavigator';
import { WorkOrderDetailScreen, OnAcceptWorkScreen, ChangePassword, EarningList,ConfigureSlots } from '../screens';

const HomeStackNavigator: FC = () => {
  const HomeStack = createNativeStackNavigator<HomeStackProps>();

  return (

    <HomeStack.Navigator>
      <HomeStack.Screen
        name="BottomTabNavigator"
        component={ BottomTabNavigator }
        options={ { headerShown: false } }
      />

      <HomeStack.Screen
        name="WorkOrderDetailScreen"
        component={ WorkOrderDetailScreen }
        options={ { headerShown: false } }
      />

      <HomeStack.Screen
        name="OnAcceptWorkScreen"
        component={ OnAcceptWorkScreen }
        options={ { headerShown: false } }
      />

      <HomeStack.Screen
        name="ChangePassword"
        component={ ChangePassword }
        options={ { headerShown: false } }
      />

        <HomeStack.Screen
        name="EarningList"
        component={ EarningList }
        options={ { headerShown: false } }
      />
        <HomeStack.Screen
        name="ConfigureSlots"
        component={ ConfigureSlots }
        options={ { headerShown: false } }
      />

    </HomeStack.Navigator>

  );
};

export default HomeStackNavigator;
