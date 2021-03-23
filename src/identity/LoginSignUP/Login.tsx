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

import { MMKV } from 'react-native-mmkv';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';

export interface Props {}

const Login: React.FC<Props> = ({ props, navigation }) => {
  const [emailState, setemailState] = useState('');
  const [passwordState, setpasswordState] = useState('');

  const [loadingState, setLoadingState] = useState(false);
  const [connectionStatusState, setConnectionStatusState] = useState(true);

  const deviceWidth = Dimensions.get('window').width;
  // const deviceHeight = Dimensions.get('window').height;

  const Separator = () => {
    return <View style={LoginTabStyles.separator} />;
  };

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

  const refEmail = useRef(null);
  // refEmail.current.value='sss';

  const refPWD = useRef(null);

  const setEmail = (e) => {
    console.log('e: at setEmail: ', e);
    setemailState(e.value || '');
  };

  const setPWD = (e) => {
    console.log('e: at setPWD: ', e);
    setpasswordState(e.password || '');
  };

  const _next = () => {
    refPWD.current.focus();
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
      //
      //   },
      // );

      MMKV.set('userToken', userString);

      const jsonUser = await MMKV.getString('userToken'); // { 'username': 'Marc', 'age': 20 }
      const userObject = JSON.parse(jsonUser);
      Alert.alert(`userObject: ${userObject}`);
    } catch (error) {
      console.log('Error of Try: ', error);
    }
  };

  const handleLogin = () => {

    console.log('connectionStatusState: ', connectionStatusState);
    if (!connectionStatusState) {
     return Snackbar.show({
        text: 'You are Offline!',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 1,
        backgroundColor: 'gold',
        action: {
          text: 'close',
          textColor: 'green',
          onPress: () => {
            Snackbar.dismiss();
          },
        },
      });


      // return navigation.navigate('LoginSignUP');
    }

    console.log('emailState: ', emailState);
    console.log('passwordState: ', passwordState);

    setLoadingState(true);

    let validate_Email = false;
    let validate_password = false;

    validate_Email = validate_Email_func(emailState) === false ? false : true;
    validate_password =
      validate_Password_func(passwordState) === false ? false : true;

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
        'password format is incorrect or length < 6',
        ToastAndroid.SHORT
      );
      return navigation.navigate('LoginSignUP');
    } else {
      //default else

      console.log('validate_Email: ', validate_Email);
      console.log('validate_password: ', validate_password);

      if (!validate_Email && !validate_password) {
        console.log(
          'at here: (!validate_Email) ' +
            '  && (!validate_password) &&  (!validate_conf_password) '
        );
        return;
      } else {
        let UserCredential = auth().signInWithEmailAndPassword(
          emailState,
          passwordState
        );

        // auth().onAuthStateChanged(onAuthStateChanged);
        // let UserCredential = authentication.signInWithEmailAndPassword(emailState, passwordState);

        console.log("UserCredential: at Login success__ ", UserCredential);


        UserCredential.then(
          (result) => {
            let useruid = result.user.uid;
            saveUser(result.user.uid);
            console.log("result__in Login: ", result);


            let useremail = result.user.email;
            console.log("useruid: ", useruid);
            console.log("useremail: ", useremail);



            return navigation.reset({
              index: 0,
              routes: [{ name: 'DrawerNavigatorCustom' }],


            });
          },

          (error) => {
            console.log('error: ', error);

            console.log(typeof error);
            console.log("error.code: ", error.code);
            console.log("error.message: ", error.message);

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

            // return;
            return navigation.navigate('LoginSignUP');
          }
        );
      }
    }
  };

  const ForgetPasswordHandler = () => {

    Alert.alert("not implemented yet");
  };

  if (loadingState) {
    return (
      <View
        style={[LoginTabStyles.container01_for_login_only]}
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
        <View style={LoginTabStyles.KeyboardHideViewTest}>
          {/*4*/}

          {/*1*/}
          <View style={{ height: 65 }} />

          <View style={LoginTabStyles.InputContainer}>
            <View>
              <Text style={LoginTabStyles.text}>E-mail</Text>
              <TextInput
                style={LoginTabStyles.textInputStyle}
                ref={refEmail}
                onChangeText={(value) => setEmail({ value })}
                autoCorrect={false}
                textContentType={'emailAddress'}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                onSubmitEditing={_next}
                value={emailState}
              />

              <Separator />

              <Text style={LoginTabStyles.text}>Password</Text>
              <TextInput
                style={LoginTabStyles.textInputStyle}
                ref={refPWD}
                secureTextEntry
                textContentType={'password'}
                onChangeText={(password) => setPWD({ password })}
                // onSubmitEditing={handleLogin}
                blurOnSubmit
                returnKeyLabel={'done'}
                value={passwordState}
              />
            </View>
            <Separator />

            <View
              // elevation={5}
              style={{
                justifyContent: 'center',
                height: 44,
                alignItems: 'center',
              }}
            >
              <TouchableOpacity onPress={handleLogin}>
                <View
                  style={{
                    height: 44,
                    // backgroundColor: '#f4511e',
                    backgroundColor: '#EA555C',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: deviceWidth - 30,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      // fontWeight: 'bold',
                      padding: 5,
                    }}
                  >
                    Login
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[LoginTabStyles.ForgetPasswordView, {}]}>
              <TouchableOpacity onPress={ForgetPasswordHandler}>
                <View style={LoginTabStyles.buttonBillsList}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#3B8489',
                      fontWeight: 'bold',
                    }}
                  >
                    Forgot Password?
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              // flex: .7,
              paddingTop: 10,
            }}
          />

          {/*style={[LoginTabStyles.container01_for_login_only]}*/}
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const LoginTabStyles = StyleSheet.create({
  KeyboardHideViewTest: {
    flex: 4,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  InputContainer: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginLeft: 15,
    marginRight: 15,
  },

  container01_for_login_only: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  ForgetPasswordView: {
    height: 18,
    marginTop: 12,
  },
  buttonBillsList: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    // borderBottomColor: '#737373',
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    // color: '#C4C805',
    // fontWeight: 'bold',
    backgroundColor: 'transparent',
    fontSize: 18,
    color: '#8E8E93',
    // marginTop: 20,
    marginLeft: 5,
  },
});

export default Login;
