import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import {
  HomeScreen,
  BookingListScreen,
  InventryScreen,
  NotificationScreen,
  ProfileScreen,
} from "../screens";
import { Colors, Fonts, Images } from "../constant";
import { TextView } from "../components";
import { scale } from "react-native-size-matters";

const BottomStackNavigator: FC = () => {
  const Tab = createBottomTabNavigator();
  const getIconColor = ( focused: boolean ) =>
    focused ? Colors.SECONDARY[100] : Colors.GREY;

  const getLabel = ( focused: boolean, title: string ) => (
    <TextView
      style={ {
        fontSize: focused ? scale( 9 ) : scale( 8 ),
        fontFamily: Fonts.Medium,
        color: focused ? Colors.SECONDARY[100] : Colors.GREY,
        marginBottom: 4
      } }
    >
      { focused ? title.toUpperCase() : title }
    </TextView>
  );

  return (
    <Tab.Navigator
      screenOptions={ {
        tabBarStyle: {
          backgroundColor: Colors.WHITE,
          borderTopColor: Colors.BORDERCOLOR,
          borderTopWidth: 1,
          height: 70,
          paddingTop: 6,
        },
        headerShown: false,
      } }
    >
      {/* Example with Icon */ }
      <Tab.Screen
        name="HomeScreen"
        component={ HomeScreen }
        options={ {
          tabBarLabel: ( { focused } ) => getLabel( focused, "Home" ),
          tabBarIcon: ( { focused } ) => (
            <Image
              source={
                focused
                  ? Images.ic_HomeFill
                  : Images.ic_Home
              }
              style={ {
                width: 24,
                height: 24,
                tintColor: getIconColor( focused ),
              } }
              resizeMode="contain"
            />
          ),


        } }
      />

      {/* Example with Image */ }
      <Tab.Screen
        name="BookingListScreen"
        component={ BookingListScreen }
        options={ {
          tabBarLabel: ( { focused } ) => getLabel( focused, "WORKLIST" ),
          tabBarIcon: ( { focused } ) => (
            <Image
              source={
                focused
                  ? Images.ic_TicketFill
                  : Images.ic_Ticket
              }
              style={ {
                width: 24,
                height: 24,
                tintColor: getIconColor( focused ),
              } }
              resizeMode="contain"
            />
          ),
        } }
      />

       <Tab.Screen
        name="InventryScreen"
        component={ InventryScreen }
        options={ {
          tabBarLabel: ( { focused } ) => getLabel( focused, "INVENTORY" ),
          tabBarIcon: ( { focused } ) => (
            <Image
              source={
                focused
                  ? Images.ic_InventoryFill
                  : Images.ic_Inventory
              }
              style={ {
                width: 24,
                height: 24,
                tintColor: getIconColor( focused ),
              } }
              resizeMode="contain"
            />
          ),
        } }
      />

      {/* Another with Icon */ }
      <Tab.Screen
        name="Notification"
        component={ NotificationScreen }
        options={ {
          tabBarLabel: ( { focused } ) => getLabel( focused, "NOTIFICATION" ),
          tabBarIcon: ( { focused } ) => (
            <Image
              source={
                focused
                  ? Images.ic_NotificationFill
                  : Images.ic_Notification

              }
              style={ {
                width: 24,
                height: 24,
                tintColor: getIconColor( focused ),
              } }
              resizeMode="contain"
            />
          ),
        } }
      />

      {/* Another with Image */ }
      <Tab.Screen
        name="Profile"
        component={ ProfileScreen }
        options={ {
          tabBarLabel: ( { focused } ) => getLabel( focused, "PROFILE" ),
          tabBarIcon: ( { focused } ) => (
            <Image
              source={
                focused
                  ? Images.ic_profileFill
                  : Images.ic_profile
              }
              style={ {
                width: 24,
                height: 24,
                tintColor: getIconColor( focused ),
              } }
              resizeMode="contain"
            />
          ),
        } }
      />
    </Tab.Navigator>
  );
};

export default BottomStackNavigator;
