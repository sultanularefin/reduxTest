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
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import storage from '@react-native-firebase/storage';
// import /* TouchableOpacity, TouchableWithoutFeedback  */
// import Swipeable from 'react-native-gesture-handler/Swipeable';

// import 'react-native-gesture-handler';

// import {RectButton} from 'react-native-gesture-handler';



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

  const [storageMetaDataState, setstorageMetaDataState] = useState({
    contentType: String(''),
    customMetadata: {
      // customMetadata: {
      // itemName:         string | null | undefined,
      // width:             string | null | undefined,
      // height:            string | null | undefined,
      itemName: String(0),
      width: String(0),
      height: String(0),
    },
  });

  const [minDurationMsState, setMinDurationMsState] = useState(500);

  const itemToBeDeleted = (documentId: string) => {
    console.log('itemToBeDeleted, documentId: ', documentId);

    console.log('\n\n\n');

    console.log(
      'how many images are there: ',
      props.property.itemData.imageURL.length,
    );
    console.log('CCC CCC CCC \n\n\n');
    deleteImageFromWishItemStoage(documentId, props.property.itemData.imageURL);
  };

  const deleteImageFromWishItemStoage = async (
    documentId: string,
    imageURL: string[],
  ) => {
    console.log(
      '------------------------------------------------------||||||||',
      props.property.itemId,
    );

    console.log('documentId: ', documentId);
    // console.log('imageURL[0]: ', imageURL[0]);

    if (!imageURL) {
      props.itemToBeDeleted(documentId);
    } else {
      const user = auth().currentUser;

      if (user !== null) {
        const myUserEmail = user.email;
        try {
          let i = 0;
          for (i; i < imageURL.length; i++) {
            const fileName2 = props.property.itemData.imageURL[i].split('?')[0];
            // const GSURLRefForDelete = `gs://audiosa-ba9b0.appspot.com/audios/${fileName2}`;
            const GSURLRefForDelete = `gs://audiosa-ba9b0.appspot.com/${fileName2}`;
            console.log('\n * & * & gsUrlL:  \n\n', GSURLRefForDelete);

            // return ;

            const gsReference = storage().refFromURL(GSURLRefForDelete);

            await gsReference
              .delete()
              .then(result => {
                // console.log('Uploaded a blob or file!');
                console.log('file deleted: ', result);

                if (i === 0) {
                  props.itemToBeDeleted(documentId);
                }
              })
              .catch(error => {
                console.log(
                  'storage image delete error: gsReference AssetItemsList: ',
                  error,
                );
              });
          }
        } catch (error2) {
          console.log('error in getting meta data....', error2);
        }
      }
    }
  };

  useEffect(() => {}, [props.property.itemData.imageURL]);

  //2---------
  useEffect(() => {
    const fetchMetaData = async () => {
      const parentRef = storage().ref('');

      const fileName2 = props.property.itemData.imageURL[0].split('?')[0];
      // console.log('\n\n\n fileName2 -----> : ', fileName2);

      const childRef = parentRef.child(fileName2);

      let retrievedMetaData: {
        contentType?: string | null | undefined;
        // contentType?: string | null;
        customMetadata: {
          // customMetadata: {
          itemName: string | null | undefined;
          width: string | null | undefined;
          height: string | null | undefined;
        };
      };

      /* await */
      childRef
        .getMetadata()
        .then(metadata => {
          // Metadata now contains the metadata for 'images/forest.jpg'
          // console.log('\n\n  +   +  +--------- metadata:  \n\n\n\n', metadata);

          retrievedMetaData = metadata;

          setstorageMetaDataState({...retrievedMetaData});
        })
        .catch(error => {
          // Uh-oh, an error occurred!

          console.log(
            '\n\n  error in getting ... --------- metadata22:  ',
            error,
          );
        });
    };

    const fetchDownloadURL = async () => {
      console.log('at fetchDownloadURL ');
      const parentRef = storage().ref('');

      const imageURL0 = props.property.itemData.imageURL[0];
      // const parentRef = storage().ref('');
      console.log('imageURL0: ', imageURL0);

      const childRefDownLoad = parentRef.child(imageURL0);
      const dURL: string = await childRefDownLoad.getDownloadURL();

      console.log('url childRefDownLoad.getDownloadURL();   :  ', dURL);

      setFinalImageResouceState(dURL);
    };

    fetchMetaData();
    fetchDownloadURL();
  }, [props.property.itemData.imageURL]);

  //2 ----

  const deviceWidth = Dimensions.get('window').width;
  // const deviceHeight =  Dimensions.get('window').height;

  const setDeleteConditionAlert = (documentId: string) => {
    // console.log('at alert to delete item from storage...');
    // console.log('documentId: ',documentId);

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
        deleteImageFromWishItemStoageLast={deleteImageFromWishItemStoage}
        currentIndexLast={lastIndex2}
        contentType={storageMetaDataState.contentType}
        property2={oneElement}
        index={index}
        customMinDurationMs={minDurationMsState}
        isCanceled={props.selectedSize}
      />
    </View>
  );
};

export default ExpenseItemsLists;
