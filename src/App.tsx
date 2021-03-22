import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

const DashBoardScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
};

const NotificationsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
};

const Drawer = createDrawerNavigator();

export interface Props {}

const App: React.FC<Props> = props => {
  // const App: React.FC<Props> = () => {

  // export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="DashBoard"
        drawerPosition="left"
        drawerType="front"
        screenOptions={{
          headerShown: true,
          // swipeEnabled: true,
          // gestureEnabled: true
          headerStyle: {
            backgroundColor: 'crimson',
          },
          headerTintColor: 'orange',
          headerTitleAlign: 'center',
        }}>
        <Drawer.Screen name="DashBoard" component={DashBoardScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
