import React, { useEffect, useRef, useState } from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
  ToastAndroid,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { MMKV } from 'react-native-mmkv';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
// import ConfirmEmailPage from 'identity/ConfirmEmailPage';

export interface Props {}

const SignUP: React.FC<Props> = ({ props, navigation }) => {
  const [emailState, setemailState] = useState('');
  const [passwordState, setpasswordState] = useState('');
  const [confirmPasswordState, setconfirmPasswordState] = useState('');

  const [loadingState, setLoadingState] = useState(false);
  const [connectionStatusState, setConnectionStatusState] = useState(true);

  const deviceWidth = Dimensions.get('window').width;

  const Separator = () => {
    return <View style={SignUPTabStyles.separator} />;
  };

  /*
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (!state.isConnected) {
        setConnectionStatusState(false);
      } else {
        setConnectionStatusState(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  */
  const refEmail = useRef(null);
  const refPWD = useRef(null);
  const refConfPWD = useRef(null);

  const setEmail = (e) => {
    console.log('e: at setEmail: ', e);
    setemailState(e.value || '');
  };
  const setPWD = (e) => {
    console.log('e: at setPWD: ', e);
    setpasswordState(e.password || '');
  };
  const setConfirmPWD = (e) => {
    console.log('e: at setPWD: ', e);
    setconfirmPasswordState(e.password || '');
  };

  const _next = () => {
    refPWD.current.focus();
  };
  const _next1 = () => {
    refConfPWD.current.focus();
  };

  const validate_Email_func = (email: string) => {
    console.log('email at validation email : ', email);

    {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }
      // Alert.alert('You have entered an invalid email address!')
      return false;
    }
  };
  const validate_Password_func = (password: string) => {
    if (
      !password ||
      !typeof password ||
      password === '' ||
      password.length < 6
    ) {
      return false;
    }

    return true;
  };

  const validate_Password_match_func = (
    password: string,
    confPassword: string
  ) => {
    if (password === confPassword && validate_Password_func(password)) {
      return true;
    } else {
      return false;
    }
  };

  /*
    const validate_phone_func=(phone)=>{
        if( !phone || !typeof(phone) || phone === '' || phone.length===0 ) {
            return null;
        }

        let standard_phoneNumber = /\+?(88)?0?1[56789][0-9]{8}\b/g;

        if (phone.match(standard_phoneNumber)) {
            return true;
        } else {
            return null;
        }
    }
    */

  const saveUser = async (x: string) => {
    const userCredentials = {
      name: emailState,
      password: passwordState,
      uid: x,
    };

    const userString = JSON.stringify(userCredentials);

    // console.log('userString______: ',userString);

    try {
      // await AsyncStorage.setItem('userToken', userString,
      //   (err, result) =>
      //   {
      //       if (err) {
      //           console.log('error while putting in AsyncStorage: ', err);
      //           return;
      //       }
      //       if (result) {
      //           console.log('Result of AsyncStorage.multiSet: ', result);
      //           return result;
      //       }
      //   },
      // );

      MMKV.set('userToken', userString);

      const jsonUser = MMKV.getString('userToken'); // { 'username': 'Marc', 'age': 20 }
      const userObject = JSON.parse(jsonUser);
    } catch (error) {
      console.log('Error of Try: ', error);
    }
  };

  const handleSignUP = () => {
    console.log('connectionStatusState: ', connectionStatusState);
    if (!connectionStatusState) {
      Snackbar.show({
        text: 'You are Offline!',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
      });
      return navigation.navigate('LoginSignUP');
    }

    console.log('emailState: ', emailState);
    console.log('passwordState: ', passwordState);

    setLoadingState(true);

    let validate_Email = false;
    let validate_password = false;
    let validate_conf_password = false;

    validate_Email = validate_Email_func(emailState) === false ? false : true;
    validate_password =
      validate_Password_func(passwordState) === false ? false : true;
    validate_conf_password =
      validate_Password_match_func(passwordState, confirmPasswordState) ===
      false
        ? false
        : true;

    if (validate_Email === false) {
      ToastAndroid.show(
        'Sorry, email format is incorrect.',
        ToastAndroid.SHORT
      );

      setLoadingState(false);
      return navigation.navigate('LoginSignUP');
    } else if (validate_password === false) {
      setLoadingState(false);
      ToastAndroid.show(
        'Password format is incorrect or Weak Password',
        ToastAndroid.SHORT
      );
      return navigation.navigate('LoginSignUP');
    } else if (validate_conf_password === false) {
      setLoadingState(false);
      ToastAndroid.show("Confirm password didn't match.", ToastAndroid.SHORT);
      return navigation.navigate('LoginSignUP');
    } else {
      //default else
      console.log('validate_Email: ', validate_Email);
      console.log('validate_password: ', validate_password);

      if (!validate_Email && !validate_password && !validate_conf_password) {
        ToastAndroid.show('Validation error.', ToastAndroid.SHORT);
        return navigation.navigate('LoginSignUP');
      } else {
        let UserCredential = auth().createUserWithEmailAndPassword(
          emailState,
          passwordState
        );

        console.log('UserCredential: at Login success__ ', UserCredential);

        UserCredential.then(
          (result) => {
            let useruid = result.user.uid;
            saveUser(result.user.uid);
            let useremail = result.user.email;

            return navigation.reset({
              index: 0,
              routes: [{ name: 'DrawerNavigatorCustom' }],
            });


          },
          (error) => {
            console.log('error: ', error);

            console.log(typeof error);
            console.log('error.code: ', error.code);
            console.log('error.message: ', error.message);

            setLoadingState(false);

            Snackbar.show({
              text: error.message,
              textColor: '#A39E9D',
              // duration: Snackbar.LENGTH_LONG,
              duration: Snackbar.LENGTH_INDEFINITE,
              backgroundColor: '#FFFFFF',
              action: {
                text: 'close',
                textColor: 'green',
                onPress: () => {
                  /* Do something. SIMPLY DISMISSED. */
                },
              },
            });
            return navigation.navigate('AuthStack');
          }
        );
      }
    }
  };

  const ForgetPasswordHandler = () => {
    return navigation.navigate('ForgetPassword');
  };

  if (loadingState) {
    return (
      <View
        style={[SignUPTabStyles.container01_for_login_only]}
        key={'sasas1251231234123rArefin'}
      >
        <ActivityIndicator size="large" color="#da6a41" />
      </View>
    );
  } else {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log('keyboard dismissed');
        }}
      >
        <View style={SignUPTabStyles.KeyboardHideViewTest}>
          {/*4*/}

          {/*1*/}
          <View style={{ height: 65 }}>
            <Text />
          </View>

          <View style={SignUPTabStyles.InputContainer}>
            <View>
              <Text style={SignUPTabStyles.textEmailPW}>E-mail</Text>
              <TextInput
                style={SignUPTabStyles.textInputStyle}
                ref={refEmail}
                onChangeText={(value) => setEmail({ value })}
                autoCorrect={false}
                textContentType={'emailAddress'}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                value={emailState}
                onSubmitEditing={_next}
                selectionColor= "black"
              />

              <Separator />

              <Text style={SignUPTabStyles.textEmailPW}>Password</Text>
              <TextInput
                style={SignUPTabStyles.textInputStyle}
                ref={refPWD}
                secureTextEntry
                textContentType={'password'}
                onChangeText={(password) => setPWD({ password })}
                // onSubmitEditing={handleLogin}
                blurOnSubmit
                returnKeyType={'next'}
                value={passwordState}
                onSubmitEditing={_next1}
                selectionColor= "black"
              />

              <Separator />

              <Text style={SignUPTabStyles.textEmailPW}>Confirm password</Text>
              <TextInput
                style={SignUPTabStyles.textInputStyle}
                ref={refConfPWD}
                secureTextEntry
                textContentType={'password'}
                onChangeText={(password) => setConfirmPWD({ password })}
                value={confirmPasswordState}
                // onSubmitEditing={handleLogin}
                blurOnSubmit
                returnKeyLabel={'done'}
                selectionColor= "black"
              />
            </View>

            <View
              style={{
                justifyContent: 'center',
                height: 44,
                alignItems: 'center',
                marginTop: 24,
              }}
            >
              <TouchableOpacity onPress={handleSignUP}>
                <View
                  style={{
                    height: 44,
                    backgroundColor: '#EA555C',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: deviceWidth - 30,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 18, padding: 5 }}>
                    Sign Up
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const SignUPTabStyles = StyleSheet.create({
  KeyboardHideViewTest: {
    flex: 4,
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignContent: 'center',
    backgroundColor: 'white',
  },
  InputContainer: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginLeft: 15,
    marginRight: 15,
    // backgroundColor: 'wheat',
  },

  container01_for_login_only: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  ForgetPasswordView: {
    flex: 2,
  },
  buttonBillsList: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  textInputStyle: {
    height: 50,
    borderBottomColor: '#DFD8D8',
    color: '#8E8E93',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 12,
  },
  image: {
    width: 80,
    height: 80,
  },
  textEmailPW: {
    backgroundColor: 'transparent',
    fontSize: 18,
    marginLeft: 5,
    color: '#8E8E93',
  },
});

// navigationOptions: ({ navigation }) => ({
//     title: '',
//     // headerMode:'none',
//     headerShown:false,
// }),

// SignUP.navigationOptions= ({navigation }) => {
//
//     return {
//         tabBarLabel:'Login22',
//
//     };
// };

export default SignUP;
