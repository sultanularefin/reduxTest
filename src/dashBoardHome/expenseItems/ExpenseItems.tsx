import React, {useEffect, useState} from 'react';

import {
  Text,
  StatusBar,
  TextInput,
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Switch,
  Animated,
} from 'react-native';
import moment from 'moment';

// import Video from 'react-native-video';

import FTI from 'react-native-vector-icons/Feather';



import OneExpenseItem from './OneExpenseItem';


// import ExpenseItemsLists from './ExpenseItemsLists'

export interface Props {
  property: {
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
  currentIndex: number;
  // newItemSelected:(event: React.MouseEvent<HTMLButtonElement>) => void

  newItemSelected: (additionalData: {
    documentId: string;
    contentType: string;
    width: number;
    height: number;
    itemName: string;
  }) => void;

  // deleteImageFromWishItemStoage:(
  //   documentId:string,
  //   imageURL:string[])=> void
  itemToBeDeleted: (documentId: string) => void;

  selectedSize: number;

  // currentIndex:Number,
}

// const ItemListTab: React.FC<Props> = ({props,navigation}) => {
const ExpenseItemsLists: React.FC<Props> = /*async */ props => {
  const newItemSelectedMiddle = () => {
    console.log('at newItemSelectedMiddle ');

    console.log(
      'storageMetaDataState.contentType: ',
      storageMetaDataState.contentType,
    );
    console.log(
      'storageMetaDataState.customMetadata.width : ',
      storageMetaDataState.customMetadata.width,
    );
    console.log(
      'storageMetaDataState.customMetadata.height : ',
      storageMetaDataState.customMetadata.height,
    );
    console.log(
      'storageMetaDataState..customMetadataitemName : ',
      storageMetaDataState.customMetadata.itemName,
    );
    // let returnOneStorageData = {url:url, itemId:itemId};
    const additionalData = {
      documentId: props.property.id,
      contentType: storageMetaDataState.contentType,
      width: parseFloat(storageMetaDataState.customMetadata.width),
      height: parseFloat(storageMetaDataState.customMetadata.height),
      itemName: storageMetaDataState.customMetadata.itemName,
    };

    return props.newItemSelected(additionalData);
  };

  // console.log('props: 00000 ',props);

  const [connectionStatusState, setConnectionStatusState] = useState(true);

  const [finalImageResouceState, setFinalImageResouceState] = useState('');



  const [minDurationMsState, setMinDurationMsState] = useState(500);





  useEffect(() => {}, [props.property.itemData.imageURL]);

  //2---------

  //2 ----

  const deviceWidth = Dimensions.get('window').width;
  // const deviceHeight =  Dimensions.get('window').height;

  const setDeleteConditionAlert = (documentId: string) => {


    Alert.alert(
      'Delete This Item',
      'Sure, you want to delete this item?',
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

          onPress: () => itemToBeDeleted(documentId),
        },

        // onPress: itemToBeDeleted(documentId)},

        // onPress = {() => setDeleteConditionAlert(props.property.id)}
      ],
      {cancelable: false},
    );
  };

  const styles = StyleSheet.create({
    leftAction: {
      flex: 1,
      backgroundColor: '#DBDDEE',
      justifyContent: 'center',
    },
    rightAction: {
      flex: 1,
      backgroundColor: '#DBDDEE',
      // alignItems: 'center',

      justifyContent: 'center',
    },
    rightSwipeButtons: {
      width: 192,
      flexDirection: 'row',
    },
    actionText: {
      color: '#FF004B',
      fontWeight: '600',
      padding: 20,
    },

    //delete button from save button...

    MiddleTextView: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      // alignSelf: 'center',
    },

    MiddleText: {
      backgroundColor: 'transparent',
      // fontSize:20,
      // textAlign:'center',
      color: 'white',
    },
  });

  const index = props.currentIndex;

  const close1 = () => {
    console.log('.....close1...');
  };

  const oneElement = props.property;
  const lastIndex2 = props.currentIndex;

  // redner Final.....

  //render F....

  return (
    <View
      style={{
        flexDirection: 'column',
        marginVertical: 5,
      }}>
      <OneExpenseItem
        key={index.toString()}
        ImageResource={finalImageResouceState}
        // renderRightActions = {RightActions}
        // renderLeftActions = {LeftActions}

        newItemSelectedLastChild={newItemSelectedMiddle}
        // deleteImageFromWishItemStoageLast={deleteImageFromWishItemStoage}
        currentIndexLast={lastIndex2}
        // contentType={storageMetaDataState.contentType}
        property2={oneElement}
        index={index}
        customMinDurationMs={minDurationMsState}
        isCanceled={props.selectedSize}
      />
    </View>
  );
};

export default ExpenseItemsLists;
