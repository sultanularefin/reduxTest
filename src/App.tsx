import * as React from 'react';
import {
    Button,
    View,
    Alert
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import DashBoardHome from './dashBoardHome/DashBoardHome';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './identity/SplashScreen';
import Login from "./identity/LoginSignUP/Login";
import LoginSignUP from "./identity/LoginSignUP/LoginSignUP";
import AddExpenseItemPage from "./dashBoardHome/AddExpenseItemPage";
import {CommonActions} from "@react-navigation/native";

// .. all drawer import starts here
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

// .. all drawer import edns here
// import MMKV from "react-native-mmkv-storage";

import { MMKV } from 'react-native-mmkv';



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



const CustomDrawerContent =({ props, navigation }) => {



    const removeValue = async () => {
        try {

            await MMKV.delete('userToken');
            // await AsyncStorage.removeItem('user_id');


            console.log('logout');


            return navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'IdentityStackNavigator' }],
                })
            );
        } catch (error) {
            console.log('error: logout.... ', error);
            Alert.alert('not implemented');

        }


    };


    const logout = () => {
        Alert.alert (
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'No',
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: 'Yes',
                    onPress: async () => {



                        await removeValue();


                    },
                },
            ],
            {cancelable: false}
        );
    };


    return (
        <DrawerContentScrollView {...props}>

            {/*<DrawerItemList {...props} />*/}

            <DrawerItem
                label="Logout"
                // onPress={() => Linking.openURL('https://mywebsite.com/help')}
                onPress={() => logout()}
            />

            <DrawerItem
                label="DashBoard"
                // onPress={() => Linking.openURL('https://mywebsite.com/help')}
                onPress={() => navigation.navigate('DrawerNavigatorCustom')}
            />


        </DrawerContentScrollView>
    );
}


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
            name="AddExpenseItemPage"
            component={AddExpenseItemPage}
            options={{

                title: 'Add Expense Item and Category',
                headerStyle: {


                },
                headerTitleStyle: {

                    alignSelf: "center",
                    justifyContent: 'center',
                    // fontSize: 22,
                    // fontWeight: "600",
                },

                // headerBackTitle: 'ss',
            }}
        />



      <Stack.Screen
        name="DrawerNavigatorCustom"
        component={DrawerNavigatorCustom}
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



const DrawerNavigatorCustom = () => {
  return (
    // <Drawer.Navigator>
    //     <Drawer.Screen name="Home" component={TabNavigator} />
    //     <Drawer.Screen name="Contact" component={ContactStackNavigator} />
    // </Drawer.Navigator>

    <Drawer.Navigator

        drawerContent={CustomDrawerContent}
      // initialRouteName="DashBoard"
      initialRouteName="DashBoardHome"
      // initialRouteName="IdentityStackNavigator"
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
  );
};

export interface Props {}

const App: React.FC<Props> = (props) => {
  // const App: React.FC<Props> = () => {

  // export default function App() {
  return (
    <NavigationContainer>
      <IdentityStackNavigator />
    </NavigationContainer>
  );
};

export default App;
