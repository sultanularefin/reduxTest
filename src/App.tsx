import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DashBoardHome from './dashBoardHome/DashBoardHome';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './identity/SplashScreen';
import Login from "./identity/LoginSignUP/Login";
import LoginSignUP from "./identity/LoginSignUP/LoginSignUP";

const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

const DetailsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      {/*<Stack.Screen name="Profile" component={Profile} />*/}
      {/*<Stack.Screen name="Settings" component={Settings} />*/}
    </Stack.Navigator>
  );
};

const IdentityStackNavigator = () => {
  return (
    <Stack.Navigator
    // screenOptions={screenOptionStyle}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
          headerStatusBarHeight: 160,
          // headerStyle
        }}
      />

      <Stack.Screen
        name="LoginSignUP"
        component={LoginSignUP}
        options={{
          headerShown: false,
          headerStatusBarHeight: 160,
          // headerStyle
        }}
      />

      <Stack.Screen
          name="DashBoardHome"
          component={DashBoardHome}
          options={{
              headerShown: false,
              headerStatusBarHeight: 160,
              // headerStyle
          }}
      />
    </Stack.Navigator>
  );
};

const DashBoardScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
};

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
};

const Drawer = createDrawerNavigator();

export interface Props {}

const App: React.FC<Props> = (props) => {
  // const App: React.FC<Props> = () => {

  // export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        // initialRouteName="DashBoard"
        // initialRouteName="DashBoardHome"
        initialRouteName="IdentityStackNavigator"
        drawerPosition="left"
        drawerType="front"
        screenOptions={{
          headerShown: true,
          // swipeEnabled: true,
          // gestureEnabled: true
          headerStyle: {
            // backgroundColor: 'crimson',
            backgroundColor: 'slateblue',
          },
          // headerTintColor: 'orange',
          //   headerTintColor: 'palegreen',
          headerTintColor: 'ivory',
          // lightslategrey

          headerTitleAlign: 'center',
        }}
      >
        <Drawer.Screen name="Dash Board" component={DashBoardHome} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen
          name="IdentityStackNavigator"
          options={{
            headerShown: false,
            headerStatusBarHeight: 160,
          }}
          component={IdentityStackNavigator}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
