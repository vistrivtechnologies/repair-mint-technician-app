export type AuthStackProps = {
  SignIn: undefined;
  OnBoarding: undefined;
  SignUp: undefined;
};

export type HomeStackProps = {
  BottomTabNavigator: undefined;
  HomeScreen: undefined;
  NotificationScreen: undefined;
  BookingListScreen: undefined;
  ProfileScreen: undefined;
  InventryScreen: {item?: any};
  WorkOrderDetailScreen: {item: any; inventoryItems?: any};
  OnAcceptWorkScreen: {item: any};
  ChangePassword: undefined;
  EarningList: undefined;
};
