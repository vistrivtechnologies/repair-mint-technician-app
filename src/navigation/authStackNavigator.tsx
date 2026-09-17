import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SignIn,
  SignUp
} from "../screens";
import { AuthStackProps } from "../@types";

const AuthStackNavigator: FC = () => {
  const AuthStack = createNativeStackNavigator<AuthStackProps>();

  return (

    <AuthStack.Navigator screenOptions={ { headerShown: false } }>
      <AuthStack.Screen name="SignIn" component={ SignIn } />
      <AuthStack.Screen name="SignUp" component={ SignUp } />
    </AuthStack.Navigator>

  );
};

export default AuthStackNavigator;
