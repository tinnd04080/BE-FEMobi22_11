import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import SplashScreen from "./src/screens/auth/splash";
import LoginScreen from "./src/screens/auth/SignIn";
import RegistrationScreen from "./src/screens/auth/SignUp";
import HomeScreen from "./src/screens/app/Home";
import TicketScreen from "./src/screens/app/Tickets";
import NotificationScreen from "./src/screens/app/Notification";
import ProfileScreen from "./src/screens/app/Profiles";
import TicketBookingScreen from "./src/screens/App.TicketBookingScreen";
import SeatSelectionScreen from "./src/screens/SeatSelectionScreen/SeatSelectionScreen";
import PickupDropoffScreen from "./src/screens/App.PickupDropoffScreen";
import PassengerInfoScreen from "./src/screens/App.PassengerInfoScreen";
import PaymentScreen from "./src/screens/App.PaymentScreen";
import TicketDetail from "./src/screens/app/Tickets/TicketDetail";
import OtpScreen from "./src/screens/auth/OTP";
import BankTransferScreen from "./src/screens/App.PaymentScreen/PaymentTransfer";
import ConfirmInformation from "./src/screens/ConfirmInformationScreen/ConfirmInformationScreen";
import CreateticketsScreen from "./src/screens/CreateticketsScreen/CreateticketsScreen";
// RootStackParamList.ts
export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  OtpScreen: { email: string }; // Ví dụ, truyền email vào màn hình OTP
  MainTabs: undefined;
  TicketBookingScreen: undefined;
  SeatSelectionScreen: { tripId: string }; // Thêm kiểu cho tham số tripId
  PickupDropoffScreen: undefined;
  PassengerInfoScreen: undefined;
  PaymentScreen: undefined;
  BankTransferScreen: undefined;
};

// BottomTabParamList.ts
export type BottomTabParamList = {
  Home: undefined;
  Ticket: undefined;
  Notification: undefined;
  Profile: undefined;
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Ticket":
              iconName = "confirmation-number";
              break;
            case "Notification":
              iconName = "notifications";
              break;
            case "Profile":
              iconName = "person";
              break;
            default:
              iconName = "home";
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#333",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Ticket" component={TicketScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen" //SplashScreen
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegistrationScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen
          name="TicketBookingScreen"
          component={TicketBookingScreen}
        />
        <Stack.Screen
          name="SeatSelectionScreen"
          component={SeatSelectionScreen}
        />
        <Stack.Screen
          name="ConfirmInformation"
          component={ConfirmInformation} // Thêm màn hình ConfirmInformation vào đây
        />
        <Stack.Screen
          name="CreateticketsScreen"
          component={CreateticketsScreen} // Thêm màn hình ConfirmInformation vào đây
        />
        <Stack.Screen
          name="PickupDropoffScreen"
          component={PickupDropoffScreen}
        />
        <Stack.Screen
          name="PassengerInfoScreen"
          component={PassengerInfoScreen}
        />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen
          name="BankTransferScreen"
          component={BankTransferScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
