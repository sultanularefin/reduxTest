import React, { useState, useEffect } from 'react';

// import AsyncStorage from '@react-native-community/async-storage';

import { MMKV } from 'react-native-mmkv';

import {
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  Platform,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

import Snackbar from 'react-native-snackbar';
import Ionicons from "react-native-vector-icons/Ionicons";
import DashBoardHome from "../dashBoardHome/DashBoardHome";
import {CommonActions} from "@react-navigation/native";


export interface Props {}

const SplashScreen: React.FC<Props> = ({ props, navigation, route }) => {
  const deviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    // console.log('props in SplashScreen: _______________R N 5.x: ',props);
    console.log(
      'navigation in SplashScreen: _______________R N 5.x: ',
      navigation
    );
    console.log('route in SplashScreen: _______________R N 5.x: ', route);
    // Create an scoped async function in the hook

    const checkUserSignedIn = async () => {
      console.log('at checkUserSignedIn___ in SplashScreen.tsx ');
      try {
        // const userToken = await AsyncStorage.getItem('userToken');

        // const userToken = await MMKV.getAllKeys("userToken");

        const jsonUser = MMKV.getString('userToken'); // { 'username': 'Marc', 'age': 20 }
        const userObject = JSON.parse(jsonUser);


        if (userObject === null) {
          Snackbar.show({
            text: 'Storage empyt, please login.',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'orange',
          });




          return setTimeout(
              () => {


                return navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      // routes: [{name: 'LoginScreen'}],
                      routes: [{ name: 'LoginSignUP' }],
                    })
                );
              },
              2000
          );




        } else {
          const forwardLocalStorage_to_redux = JSON.parse(userObject);





          navigation.reset({
            index: 0,
            routes: [{ name: 'DrawerNavigatorCustom' }],
          });




        }
      } catch (error) {
        console.log('error in userToken checking: ', error);


        return setTimeout(
            () => {
              return navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'DrawerNavigatorCustom'}],
                  })
              );
            },
            2000
        );



      }
    };

    checkUserSignedIn();
  }, [navigation]);

  return (
    <View style={{ ...styles.container }}>
      <Image
        source={require('./../../sunrise-logo.jpg')}
        style={styles.image}
      />

      <Text style={styles.text}>Md. Sultanul Arefin</Text>

      <View
        style={{
          position: 'absolute',
          bottom: 200,
          marginLeft: deviceWidth * 0.5 - 20,
        }}
      >
        {/*<ActivityIndicator size="large" color="crimson" />*/}
        <Text> Please wait.</Text>
      </View>
    </View>
  );
};

// SplashScreen.navigationOptions= ({ navigation,screenProps, navigationOptions }) => {
//
//     return {
//
//         headerTitleStyle: {
//             flex: 1,
//             textAlign: 'center',
//             flexGrow:1,
//
//         },
//         headerTitle: 'Splash Screen',
//     };
// };

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'gold',
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    color: 'crimson',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
});
