import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

// "habibi" mhmdarefin

import Ionicons from 'react-native-vector-icons/Ionicons';

import Snackbar from 'react-native-snackbar';

import SignUP from './SignUP';
import Login from './Login';


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export interface Props {}

const Tab = createMaterialTopTabNavigator();

const LoginSignUP: React.FC<Props> = ({ props, navigation, route }) => {

  return (
    <Tab.Navigator
      swipeEnabled={true}
      barStyle={{
        backgroundColor: '#ffffff',
      }}
      initialRouteName="Login"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Login') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerTitle: '',
      })}
      tabBarOptions={{
        activeTintColor: '#3B8489',
        inactiveTintColor: '#8E8E93',
        indicatorStyle: {
          backgroundColor: '#3B8489',
          height: 4,
        },
        labelStyle: { fontSize: 20, fontWeight: 'bold' },
        pressColor: '#3B8489',
      }}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: 'Login',
        }}
      />
      <Tab.Screen
        name="SignUP"
        component={SignUP}
        options={{
          tabBarLabel: 'Sign Up',
        }}
      />
    </Tab.Navigator>
  );
};

export default LoginSignUP;
