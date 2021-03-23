import React, {useEffect, useRef, useState} from 'react';

import {
  Alert,
  Animated,
  Dimensions,
  ImageBackground,
  PanResponderGestureState,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// /home/taxi/Programs/rnaudio3/src/selectedItemThemeColorStyles

import CommonChatThemeColorStyles from './../../selectedItemThemeColorStyles/CommonChatThemeColorStyles';

// const CommonChatThemeColorStyles = require("./../../commonChatThemeColor/CommonChatThemeColorStyles");
// CommonChatThemeColorStyles

import Swipeable from 'react-native-gesture-handler/Swipeable';


import {
  LongPressGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

// import Swipeable from "react-native-gesture-handler/Swipeable";
import FTI from 'react-native-vector-icons/Feather';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const defaultImage = require('./../../../assets/default-image_01.jpg');
// const videoImage = require('./../../../assets/video-image.png');

import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';

import Snackbar from 'react-native-snackbar';

export interface Props {
  property2: {
    user: string;
    uploadedBy: string;
    date: Date;
    itemId: number[];

    itemData: {
      urlText: string;
      imageURL: string[];
      nameText: string;
      tagText: string;
      detailText: string;
      categoryText: string;
      amountNumber: Number;
    };
    id: string;
  };
  currentIndexLast: number;

  ImageResource: string;

  newItemSelectedLastChild: (documentId: string) => void;
  itemToBeDeleted: (event: React.MouseEvent<HTMLButtonElement>) => void;

  // renderRightActions: (
  //     progressAnimatedValue: Animated.AnimatedInterpolation,
  //     dragAnimatedValue: Animated.AnimatedInterpolation)=> void

  renderLeftActions: (
    progressAnimatedValue: Animated.AnimatedInterpolation,
    dragAnimatedValue: Animated.AnimatedInterpolation,
  ) => void;

  // deleteImageFromWishItemStoage: (
  //   documentId: string,
  //   imageURL: string[],
  // ) => void;
  //
  // contentType: string;

  customMinDurationMs: number;
  isSelected: boolean;

  // currentIndex:Number,
}

const AssetIndex1Styles = StyleSheet.create({
  // from Tripz|Chat
  // one chat begins here..

  fullWidthRootView: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingLeft: 10,
    paddingRight: 10,
    // borderRadius: 10,
  },

  secondRootSingleItem: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
    margin: 7,
  },

  oneItemThirdRoot: {
    backgroundColor: 'gold',

    // width: 220,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gray',
    // backgroundColor: '#000000',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },

  rightTxt: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'right',
  },

  // from Tripz|Chat
  // ends here...
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    margin: 10,
  },
});
const OneExpenseItem: React.FC<Props> = /*async */ props => {
  // const {showActionSheetWithOptions} = useActionSheet();

  const doubleTapRef = useRef(null);

  const [itemSelectedState, setItemSelectedState] = useState(false);
  useEffect(() => {
    // if (props.oneCommentData.isSelected){

    if (props.isSelected) {
      setItemSelectedState(props.isSelected);
    } else {
      setItemSelectedState(false);
    }

    if (props.isCanceled === 0) {
      setItemSelectedState(false);
    }
  }, [props.isSelected, props.isCanceled]);

  const optionsChatMessageDeleteForward = [
    'Reply',
    'Forward',
    'Delete',
    'Report',
    'Cancel',
  ];

  const iconsChatMessageDeleteForward = [
    <FontAwesome
      style={{
        // paddingRight: 5
        paddingTop: 5,
      }}
      size={18}
      name="mail-reply-all"
      key="mail-reply-all"
      color="#000"
    />,

    <FontAwesome
      style={{
        // paddingRight: 5
        paddingTop: 5,
      }}
      size={18}
      name="mail-forward"
      key="mail-forward"
      color="#000"
    />,
    <Ionicons
      style={{
        paddingRight: 5,
      }}
      size={18}
      name={'ios-trash'}
      key="ios-trash"
    />,

    <Octicons
      style={{
        paddingRight: 5,
      }}
      size={18}
      name={'report'}
      key="report"
    />,

    <Entypo
      style={{
        paddingRight: 5,
      }}
      name="back"
      size={20}
      color="#000"
      key="back"
    />,
  ];

  const chatItemSwiped = (chatID: string, message: string) => {
    console.log('at chatItemSwiped....');

    /*
        console.log(` chatID: ${chatID} ,
            message: ${message} props.oneCommentData.sender_id: ${props.oneCommentData.sender_id}
            props.oneCommentData.receiver_id: ${props.oneCommentData.receiver_id}
            is_image ${props.oneCommentData.is_image}
            payLoadString: ${props.oneCommentData.payLoadString}
             payloadImage: ${props.oneCommentData.payloadImage}

             props.oneCommentData.chat_type: ${props.oneCommentData.chat_type}`);

        return props.chatItemSwipedMain(
            chatID,
            message,
            props.oneCommentData.sender_id,
            props.oneCommentData.receiver_id,
            0,
            props.oneCommentData.payLoadString,
            props.oneCommentData.payloadImage,
            props.oneCommentData.chat_type
        );
        */
  };

  const deleteAMessage = (chatID: string, chatMessage: string) => {
    console.log(
      ` chat_id: ${chatID} sender_id: ${props.oneCommentData.sender_id} receiver_id: ${props.oneCommentData.receiver_id} `,
    );

    // setAnimatingState(true);
    fetch('https://tripzchat.com/mongo/api/chat_delete.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatID,
        user_id: props.oneCommentData.sender_id,
        partner_id: props.oneCommentData.receiver_id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        const success = responseJson.message;
        if (success === 'Chat Message Deleted.') {
          Snackbar.show({
            text: 'Message Deleted Successfully.',
            duration: Snackbar.LENGTH_LONG,
            // numberOfLines: 2,
          });

          props.reload();

          // this.setState ({visible: false});
        } else {
          // alert ('Sorry Try again');

          Snackbar.show({
            text: 'Sorry Try again.',
            duration: Snackbar.LENGTH_LONG,
            // numberOfLines: 2,
          });
          // this.props.navigation.navigate ('ChatMessage');
        }
      })
      .catch(error => {
        console.error(`error: ${error}`);
      });
  };

  const messageForword = (chatID: string, chatMessage: string) => {
    // props.navigationAttribute.navigate('MessageForwardTSX', {
    //
    //   messageData: props.oneCommentData,
    // });
    // navigation.navigate ('MessageForward', {
    //         NameOBJ: item_message,
    //     });
  };




  const onProgress22 = () => {
    console.log('at onProgress...');

    Alert.alert('at here:::: onProgress22');
  };

  const LeftActions2 = props.renderLeftActions;

  // const [connectionStatusState,setConnectionStatusState]  = useState(true);

  const [gestureNameState, setGestureNameState] = useState('');

  const index = props.currentIndexLast;

  const itemToBeDeletedLocal = (documentId: string) => {
    console.log('itemToBeDeleted, documentId: ', documentId);

    props.deleteImageFromWishItemStoageLast(
      documentId,
      props.property2.itemData.imageURL,
    );
  };

  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  // const finalImageResouce = props.finalImageResouce;
  const dateWithMoment = moment(props.property2.date).format('ll');

  const swipeAlert = (direction: string) => {


    Alert.alert(
      'Swipe Alert',
      `swiped at ${direction}`,
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'yes, delete',
          // onPress: itemToBeDeleted(documentId)}

          onPress: () => console.log('swipping in direction....'),
        },

        // onPress: itemToBeDeleted(documentId)},

        // onPress = {() => setDeleteConditionAlert(props.property.id)}
      ],
      {cancelable: false},
    );
  };
  const RightActions = () => {
    // console.log('dragX : ',dragX);

    return chatItemSwiped(
      props.oneCommentData.chat_id,
      props.oneCommentData.message,
    );
  };

  console.log('props in OneExpenseItem:  - -- ---- --- \n\n\n', props);

  // render Final...

  // renderF
  return (
    <Swipeable
      rightThreshold={props.deviceWidth / 2}
      onSwipeableClose={RightActions}
      overshootRight={true}
      // key={props.flatListDataIndex}
      // to be added later... key={props.flatListDataIndex}
    >
      <LongPressGestureHandler
        onHandlerStateChange={event => {
          if (event.nativeEvent.state === State.ACTIVE) {
            console.log(
              'props.minDurationMsState: ',
              props.customMinDurationMs,
            );

            if (props.customMinDurationMs === 50) {
              setItemSelectedState(!itemSelectedState);

              console.log('props.updateIsSelected');

              // return props.updateIsSelected(oneCommentArg.chat_id, props.flatListDataIndex);
            } else {

            }
          }
        }}
        // key={props.flatListDataIndex}
        // flatListDataIndex to be used later.
        minDurationMs={props.customMinDurationMs}>
        <TapGestureHandler
          waitFor={doubleTapRef}
          onHandlerStateChange={event => {
            if (event.nativeEvent.state === State.ACTIVE) {
            }
          }}>
          <TapGestureHandler
            ref={doubleTapRef}
            numberOfTaps={2}
            maxDelayMs={500}
            onHandlerStateChange={event => {
              if (event.nativeEvent.state === State.ACTIVE) {



              }
            }}>
            {itemSelectedState ? (
              <View
                style={[
                  {
                    ...AssetIndex1Styles.fullWidthRootView,

                    width: deviceWidth,
                  },
                  {
                    ...CommonChatThemeColorStyles.touchedSelectedBackGroundColorLogger,
                  },
                ]}>
                <View style={AssetIndex1Styles.secondRootSingleItem}>
                  <View
                    style={{
                      ...AssetIndex1Styles.oneItemThirdRoot,
                      // width: deviceWidth,

                      // backgroundColor: 'black',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '100%',
                        height: 50,
                        backgroundColor: 'crimson',
                        opacity: 0.6,
                      }}>
                      <ScrollView horizontal={true}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                          }}>
                          <Text
                            style={{
                              color: '#000000',
                              fontWeight: '500',
                              fontSize: 16,
                            }}>
                            {' '}
                            {props.property2.itemData.nameText},{' '}
                            {props.property2.itemData.categoryText},{' '}
                          </Text>
                        </View>
                      </ScrollView>
                      <View
                        style={{
                          flexDirection: 'row-reverse',
                        }}>
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{
                              color: '#000000',
                              fontWeight: '500',
                              fontSize: 16,
                              textAlign: 'right',
                              paddingRight: 5,
                            }}>
                            {dateWithMoment}{' '}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  ...AssetIndex1Styles.fullWidthRootView,
                  // backgroundColor: 'crimson',
                  // width: deviceWidth -10,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'column',

                    backgroundColor: 'wheat',
                    // opacity: 0.6,
                    width: deviceWidth - 15,
                    borderRadius: 25,
                    height: deviceHeight / 14,
                    paddingTop: 5,
                  }}>
                  <ScrollView horizontal={true}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontWeight: '500',
                          fontSize: 16,
                          paddingLeft: 10,
                        }}>
                        {' '}
                        {props.property2.itemData.nameText},{' '}
                        {props.property2.itemData.categoryText},{' '}
                      </Text>
                    </View>
                  </ScrollView>
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      // backgroundColor: 'red',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        paddingBottom: 5,
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontWeight: '500',
                          fontSize: 16,
                          textAlign: 'right',
                          // paddingRight: 5,
                          paddingRight: 10,
                        }}>
                        {dateWithMoment}{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </TapGestureHandler>
        </TapGestureHandler>
      </LongPressGestureHandler>
    </Swipeable>
  );
};

export default OneExpenseItem;
