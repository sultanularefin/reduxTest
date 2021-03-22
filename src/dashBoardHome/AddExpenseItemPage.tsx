import React, {useEffect, useRef, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    // Picker,
    Dimensions,
    ToastAndroid,
    ActivityIndicator,
    Alert,
    PermissionsAndroid,
    SafeAreaView,
    Switch, TouchableWithoutFeedback,
    Keyboard,
    // Picker,
    Platform,
    ActionSheetIOS,
    ScrollView,
} from 'react-native';
import { logger } from 'react-native-logs';
const defaultImage = require('./../../../assets/default-image_01.jpg');
import Video from 'react-native-video';
import {Picker} from '@react-native-community/picker';
// import URLInput from './general/URLInput';
// import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import FTI from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MTI from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import ImagePicker from 'react-native-image-crop-picker';

// import ImagePicker from 'react-native-image-picker';


// import firebase from '@react-native-firebase/app';
// import storage from '@react-native-firebase/storage';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import hairlineWidth = StyleSheet.hairlineWidth;
// import {check, PERMISSIONS, RESULTS,request} from 'react-native-permissions';
import {PERMISSIONS} from 'react-native-permissions';
import helpers from '../../../../Helpers';
import AvoidKeyboard from '../../monusPages/AvoidKeyboard';

export interface Props {

}

const ImageProps = {
    uri: String(''),
    width: Number(0),
    duration : Number(0),
    height: Number(0),
    mime: String(''),
    modificationDate: String(''),
    // path:string
    size: Number(0)
};
// key: '', value: false};
// declare var URL: {

/*
declare var ImageProps {
  // backgroundColor: string;
  // color: string;
  // url:string,
  // isLoggedIn:boolean,

  uri:string,
  width:number;
  duration?: number;
  height:number;
  mime:string;
  modificationDate: string;
  // path:string
  size:number;
}

*/


type PermissionStatus = 'unavailable' | 'denied' | 'blocked' | 'granted';

// let Result_1 = PERMISSIONS.ANDROID.CAMERA;
// let Result_2 = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
// let Result_3 = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;



const ConversionRate= {
    "DollarToTaka": "84.89",
    "DollarToEuro": "0.92",
    "EuroToDollar":"1.08",
    "DollarToYen": "109.79",
};

const MonetaryUnits = [
    {"index":0,"name":"Dollar","unicode":"\u0024" },
    {"index":1,"name": "Euro","unicode":"\u20AC"},
    {"index":2,"name": "Yen","unicode":"\u00A5",},
    {"index":3,"name": "Taka","unicode":"\u09F3",},
];

const Buttons = [
    '\u0024',
    '\u20AC',
    '\u00A5',
    '\u09F3',
]

const AddExpenseItemPage: React.FC<Props> = ({props,navigation}) => {
// const MyProfile =({navigation,Props})=> {


    const [loadingState,setLoadingState]  = useState(false);

    const [itemNameState,setItemNameState] = useState('');
    const [itemCategoryState,setItemCategoryState] = useState('');
    const [itemTagState,setItemTagState] = useState('');
    const [currentAmountState,setCurrentAmountState] = useState(1);
    const [itemDetailState,setItemDetailState] = useState('');
    const [itemURLState,setItemURLState] = useState('');

    const [itemPriceState,setItemPriceState] = useState('');

    // const [avatarSourceState,setAvatarSourceState]= useState({});





    const blankAvatarResouce = {
        "duration": Number(0),
        "height": Number(0),
        "mime":  String(''),
        //"video/mp4",
        "modificationDate": String(''),
        //"1600513715000",
        "path": String(''),
        //"file:///data/user/0/com.arefin.monozseptember/cache/react-native-image-crop-picker/mobizen_20200916_235614.mp4",
        "size":Number(0),
        // 29330365,
        "width": Number(0),
        // 720

    };



    console.log('____ _____ blankAvatarResouce: ',blankAvatarResouce);


    const populatedDummyArray = Array(4).fill(
        {...blankAvatarResouce});





    console.log('____ _____ populatedDummyArray: ',populatedDummyArray);

    // const [avatarSourceState, setAvatarSourceState] = useState(populatedDummyArray);


    /*
    const [avatarSourceState, setAvatarSourceState] = useState( new Array<{
        duration?: number,
        height:number,
        mime:string,
        modificationDate: string,
        // path:string,
      uri:string,
        size:number,
        width:number,
    }>());

    */



    // image: null,
    //   images:

    const [xxp,setX]= useState(0);

    const [avatarSourceState, setAvatarSourceState]  = useState(
        // { uri: string; width: number; height: number; mime: string; }[]

        new Array<{
            uri:string,
            width:number;
            duration?: number;
            height:number;
            mime:string;
            modificationDate: string;
            // path:string
            size:number;
        }>()


    );

    // image: null,
    //   images: null,


    // const [avatarSourceState,setAvatarSourceState]= useState([]);

    const [saveDisabledState, setSaveDisabledState] =useState(true);

    var log = logger.createLogger();

    // log.debug('This is a Debug log');
    // log.info('This is an Info log');
    // log.warn('This is a Warning log');
    // log.error('This is an Error log');

    /* for price */

    const [allMonetaryUnitsStates, setAllMonetaryUnitsStates] = useState(MonetaryUnits);
    const [selectedOneCategoryState, setSelectedOneCategoryState] = useState(MonetaryUnits[0].unicode);
    const [androidState, setAndroidState] =
        useState((Platform.OS === 'android')? true:false);

    const pricePikcerData = allMonetaryUnitsStates.map( (Element, index) => {
        return <Picker.Item
            color='#778899'
            // #778899
            //#5cb85c

            // #5cb85c
            // #8E8E93
            key={index}
            value={Element.unicode}
            label={Element.unicode}
            // label={'\u0024'}U+00A5
        />
    });

    const showActionSheet = () => {
        //var CANCEL_INDEX = 4;
        ActionSheetIOS.showActionSheetWithOptions({
                options: Buttons,
                //cancelButtonIndex: CANCEL_INDEX,
            },
            (buttonIndex) => {
                setSelectedOneCategoryState(Buttons[buttonIndex]);
                // console.log('selectedCurrencyState: ', selectedCurrencyState)
                // console.log('selectedCurrencyState: ', Buttons[buttonIndex])
            });
    };

    const renderAsset = (image22:{
        uri:string,
        width:number;
        duration?: number;
        height:number;
        mime:string;
        modificationDate: string;
        // path:string
        size:number;
    }) => {
        // renderAsset(image) {
        if (image22.mime && image22.mime.toLowerCase().indexOf('video/') !== -1) {
            return renderVideo(image22);
        }

        return renderImage(image22);
    }

    const renderVideo = ((video22:{
        uri:string,
        width:number;
        duration?: number;
        height:number;
        mime:string;
        modificationDate: string;
        // path:string
        size:number;
    })=>{
        // renderVideo(video) {
        console.log('rendering video');
        return (
            <View style={{ height: 300, width: 300 }}>
                <Video
                    source={{ uri: video22.uri, type: video22.mime }}
                    style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
                    rate={1}
                    paused={false}
                    volume={1}
                    muted={true}
                    resizeMode={'cover'}
                    onError={(e) => console.log(e)}
                    onLoad={(load) => console.log(load)}
                    repeat={true}
                />
            </View>
        );
    });

    const renderImage = ((image:{
        uri:string,
        width:number;
        duration?: number;
        height:number;
        mime:string;
        modificationDate: string;
        // path:string
        size:number;
    })=>{
        // renderImage(image) {
        return (
            <Image
                style={{ width: 300, height: 300, resizeMode: 'contain' }}
                source={image}
            />
        );
    });


    // const callBackSetItemNameState
    // const callBackSetItemCategoryState
    // const callBackSetItemTagState
    // const callBackSetItemDetailState
    //
    // const callBackSetItemNameState = React.useCallback(
    //   text => {
    //     // const newSelected = new Map(selected);
    //     // newSelected.set(id, !selected.get(id));
    //
    //     setItemNameState(text);
    //   },
    //   [],
    // );

    // console.log("itemNameState: ",itemNameState);



    const deviceWidth = Dimensions.get('window').width;
    // console.log('deviceWidth: ',deviceWidth);
    // console.log('deviceHeight: ',Dimensions.get('window').height);


    // let today =Date.now();
    let today2 = moment(Date.now()).format('ll');

    const captilizeAllWords = (sentence) => {
        if (typeof sentence !== "string") return sentence;
        return sentence.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    // console.log("avatarSourcURIeState: ",avatarSourcURIeState);


    const closePageAndBack=()=>{
        console.log(" at add asset item's closePageAndBack ");

        return navigation.navigate('MonosHome')
    }

    const _goTo_FMPWebView=()=>{

        return navigation.navigate('FMPWebView')
    }



    /*
    check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        // …
      });

    */
    // const saveAction = async () =>{


    // check(APermission)
    //   .then(result => {
    //     // console.log("parameter: ",parameter);
    //     switch (result) {
    //       case RESULTS.UNAVAILABLE:
    //         return 'unavailable'
    //         // console.log(
    //         //   'This feature is not available (on this device / in this context)',
    //         // );
    //         // break;
    //       case RESULTS.DENIED:
    //         return 'denied';
    //       case RESULTS.GRANTED:
    //         return 'granted';
    //       case RESULTS.BLOCKED:
    //         return 'blocked';
    //     }
    //   })
    //   .catch(error => {
    //     console.log("error: ", error);
    //   });

    // const selectPhotoTapped=() =>{
    //  selectPhotoTappedAndPermissions();


    const request_Write_Read_EXTERNAL_STORAGE_Permission = async ()=>{

        // async function requestWriteRead_EXTERNAL_STORAGEPermission() {


        let Result_WRITE_EXTERNAL_STORAGE=true;
        try{
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).
            then(result => {

                console.log('write result...',result);

                if(!result) {
                    console.log("result FOR WRITE_EXTERNAL_STORAGE: ", result);
                    Result_WRITE_EXTERNAL_STORAGE = result;
                    return Result_WRITE_EXTERNAL_STORAGE;
                }
                else{
                    console.log("permission WRITE_EXTERNAL_STORAGE is true");

                    Result_WRITE_EXTERNAL_STORAGE =true;

                    return Result_WRITE_EXTERNAL_STORAGE;
                    // selectPhotoTapped();
                }


            });
        } catch (err) {
            console.warn(err);
            return Result_WRITE_EXTERNAL_STORAGE;
        }

        if(!Result_WRITE_EXTERNAL_STORAGE){
            console.log("at here: !Result_WRITE_EXTERNAL_STORAGE");

            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Cool Photo App Write_EXTERNAL_STORAGE Permission',
                        message:
                            'Cool Photo App needs access to your Storage ' +
                            'so you can take awesome pictures and Store it there.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use Storage for Storing photos');

                    Result_WRITE_EXTERNAL_STORAGE =true;

                    return Result_WRITE_EXTERNAL_STORAGE;
                    // selectPhotoTapped();
                } else {
                    console.log('Storage permission denied');
                    return Result_WRITE_EXTERNAL_STORAGE;
                }
            } catch (err) {
                console.warn(err);
                return Result_WRITE_EXTERNAL_STORAGE;
            }

        }



    }


    async function requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    let charsets = {
        latin: {halfRE: /[!-~]/g, fullRE: /[！-～]/g, delta: 0xFEE0},
        hangul1: {halfRE: /[ﾡ-ﾾ]/g, fullRE: /[ᆨ-ᇂ]/g, delta: -0xEDF9},
        hangul2: {halfRE: /[ￂ-ￜ]/g, fullRE: /[ᅡ-ᅵ]/g, delta: -0xEE61},
        kana: {delta: 0,
            half: "｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ",
            full: "。「」、・ヲァィゥェォャュョッーアイウエオカキクケコサシ" +
                "スセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン゛゜"},
        extras: {delta: 0,
            half: "¢£¬¯¦¥₩\u0020|←↑→↓■°",
            full: "￠￡￢￣￤￥￦\u3000￨￩￪￫￬￭￮"}
    };

    let toFull = set => c => set.delta ?
        String.fromCharCode(c.charCodeAt(0) + set.delta) :
        [...set.full][[...set.half].indexOf(c)];
    let toHalf = set => c => set.delta ?
        String.fromCharCode(c.charCodeAt(0) - set.delta) :
        [...set.half][[...set.full].indexOf(c)];
    let re = (set, way) => set[way + "RE"] || new RegExp("[" + set[way] + "]", "g");
    let sets = Object.keys(charsets).map(i => charsets[i]);




    const toFullWidth = str0 =>
        sets.reduce((str,set) => str.replace(re(set, "half"), toFull(set)), str0);

    const toHalfWidth = str0 =>
        sets.reduce((str,set) => str.replace(re(set, "full"), toHalf(set)), str0);


    // const x = "！ａｂｃ　ＡＢＣ！";

    // console.log('toHalfWidth(！ａｂｃ　ＡＢＣ！): ',toHalfWidth(x));

    /*
    const selectPhotoTapped= async () =>{

      console.log('at selectPhotoTapped ..... ');
      // const options = {
      //   title: 'Select Avatar',
      //   customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      //   storageOptions: {
      //     skipBackup: true,
      //     path: 'images',
      //   },
      // };

      /*

      const options = {
        title: 'Select a Photo',
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Take Photo…',
        chooseFromLibraryButtonTitle: 'Choose from Library…',

        permissionDenied: {
          title: 'Permission denied',
          text:
            'To be able to take pictures with your camera and choose images from your library.',
          reTryTitle: 're-try',
          okTitle: "I'm sure",
        },
        quality: 1.0,
        allowsEditing: false,
        tintColor: '',
        // quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },

      }

      */

    /*
        log.info('before invoking await pickMultiple(); ');

        // retrun
        // await

        pickMultiple();



      }

      */



    // const handleDeleteItem = (documentId:string) => {

    const alertMessageInImageUpload =(message:string) =>{



        Alert.alert(
            'image issue.',
            message,
            [
                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {
                    text: 'Cancel',
                    onPress: () => {
                    },
                    style: 'cancel',
                },
                {text: 'OK',  onPress: () => console.log("OK Pressed");

                    // onPress: setCondition2

                },
            ],
            {cancelable: false},
        );
    }
    // let Result_1 = PERMISSIONS.ANDROID.CAMERA;
// let Result_2 = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
// let Result_3 = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;


    const pickMultiple = /* async */() => {

        console.log('at pickMultiple =()');

        log.info('at pickMultiple =()');

        // pickMultiple() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            sortOrder: 'desc',
            includeExif: true,
            forceJpg: true,
        })
            .then((images) => {

                let avatarSourceState2 = images.map((i) => {
                    console.log('received image', i);
                    return {
                        uri: i.path,
                        width: i.width,
                        height: i.height,
                        mime: i.mime,
                    };
                });

                log.info('\n\n => avatarSourceState2: ',avatarSourceState2);


                setX(12);

                console.log('----------\n\n==========> xxp: \n',xxp);
                setAvatarSourceState(avatarSourceState2);

                return;

            })
            .catch((e) => alertMessageInImageUpload(e));
    }

    const validate_Name_Empty_String=(nameParam:string)=> {
        console.log('at validation nameParam : ',nameParam);
        if( !nameParam || !typeof(nameParam) || nameParam === '' ||
            nameParam.length===0)
            return false;
        else{
            return true;
        }

    }



    /*

    const validate_Tag_Empty_String=(tagParam:string)=> {
      console.log('at validation tagParam : ',tagParam);
      if( !tagParam || !typeof(tagParam) || tagParam === '' ||
        tagParam.length===0)
        return false;
      else{
        return true;
      }

    }




    const validate_Category_Empty_String=(CategoryParam:string)=> {
      console.log('at validation CategoryParam : ',CategoryParam);
      if( !CategoryParam || !typeof(CategoryParam) || CategoryParam === '' ||
        CategoryParam.length===0)
        return false;
      else{
        return true;
      }

    }

    const validate_Amount_func=(amountParam:any)=> {
      console.log('at validation amountParam : ',amountParam);
      if( !amountParam || !typeof(amountParam) || amountParam === '' ||
        amountParam.length===0|| isNaN(amountParam)||amountParam===0)
        return false;
      else{
        return true;
      }
    }

    */

    // const validate_URL_Empty_String=(urlParam:string)=> {
    //   console.log('at validation urlParam : ',urlParam);
    //   if( !urlParam || !typeof(urlParam) || urlParam === '' ||
    //     urlParam.length===0)
    //     return false;
    //   else{
    //     return true;
    //   }
    //
    // }
    /*
    const validate_Detail_Empty_String=(detailParam:string)=> {
      console.log('at validation detailParam : ',detailParam);
      if( !detailParam || !typeof(detailParam) || detailParam === '' ||
        detailParam.length===0)
        return false;
      else{
        return true;
      }

    }
    */



    const getRandomArbitrary =(min:number, max:number /* number */)=> {
        return Math.floor(Math.random() * (max - min) + min);
    }



    const generateItemId = async (length :number )=> {

        let _result ='';
        let i = 0;
        const _allowedChars =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        // console.log('_allowedChars[4]: ',_allowedChars[4]);


        while (i < Math.round(length)) {
            //Get random int
            let randomInt =getRandomArbitrary(0,_allowedChars.length);

            // console.log('\n randomInt['+ i +']: ',randomInt);

            // Random.secure().nextInt(_allowedChars.length);

            // console.log('_allowedChars[randomInt] ::: ' ,_allowedChars[randomInt]);
            _result += _allowedChars[randomInt];

            ++i;
        }

//    console.log('_result: ',_result);

        return _result;
    }






    const uploadImages = async (userEmail:string|null/*,itemId:string */) =>{
        // Future<List<String>> uploadImage(
        //   {@required String fileName, @required List<Asset> assets}) async {
        //   List<String> uploadUrls = [];

        const uploadURLs: /*{
      url:string,
      itemId: string,
    } */ any[]=[];



        const parentRef = storage().ref('images/');

        // avatarSourceState




        //1---------

        try {
            let i=0;
            for (i ; i < avatarSourceState.length; i++) {

                // let itemId = Math.random();
                let itemId = await generateItemId(9);
                // console.log('itemId: ___________________________', itemId);
                const fileName = itemNameState + itemId +'.'+ avatarSourceState[i].mime.split('/')[1];

                // str = str.split(":")[0];

                // console.log('\n\n\n fileName -----> : ',fileName);


                const childRef = parentRef.child(userEmail + 'New/' + fileName  /*file.name*/);

                const path = avatarSourceState[i].uri;

                // const childRef = parentRef.child(userEmail + 'New/' + file.name);

                console.log('\n\n\n ?????? \n\n  at metaData part',avatarSourceState[i].width.toString() );

                const duration2 =            avatarSourceState[i].duration !== undefined ?
                    avatarSourceState[i].duration.toString() : '';


                console.log('duration2 ['+i+']: ',duration2 );
                console.log('avatarSourceState['+i+'].height.toString()',
                    avatarSourceState[i].height.toString());
                // console.log('avatarSourceState[i].modificationDate',
                //   avatarSourceState[i].modificationDate);
                console.log('avatarSourceState['+i+'].size',
                    avatarSourceState[i].size);

                console.log('\n\n\n ==============================');


                const task = await childRef.putFile(path, {
                    contentType: avatarSourceState[i].mime,
                    cacheControl: 'no-store', // disable caching
                    customMetadata: {
                        'itemName':         itemNameState,
                        'width':             avatarSourceState[i].width.toString(),
                        'height':            avatarSourceState[i].height.toString(),
                    }
                    // name: timestamp.toString(),
                }).then(async function(snapshot) {
                    // console.log('Uploaded a blob or file!');
                    // console.log('snapshot: ', snapshot);
                    const b:any = snapshot;
                    // console.log('b.contentType: ',b.contentType);
                    console.log('b.bytesTransferred: ',b.bytesTransferred);

                    console.log('b.metadata.contentType: ',b.metadata.contentType);


                    console.log('b.metadata.contentType: ',b.metadata.contentType);

                    console.log('b.metadata.customMetadata.itemName: ',b.metadata.customMetadata.itemName);

                    console.log('b.metadata.fullPath: ',b.metadata.fullPath);


                    let returnOneStorageData = {url:b.metadata.fullPath, itemId:itemId};
                    // const url = await childRef.getDownloadURL();
                    // let returnOneStorageData = {url:url, itemId:itemId};

                    // let returnStorageDataOne= {
                    //   url:string,
                    //   itemId: string,
                    // }

                    // String imageUrl = await storageReference.getDownloadURL();
                    uploadURLs.push(returnOneStorageData); //all all the urls to the list

                }).catch(error => {
                    console.log("error in storing file to Firebase Storage at addItemModal Page... Asset: ", error);
                });

            }
        }
        catch (e) {
            console.log('error in outer fo loop for storing image: ',e);
        }

        return uploadURLs;
    }


    // const getUserInfo = async () => {
    const saveAction = async () =>{
        console.log('at save action for add Items');


// with out validation test

        let validate_Name     =     false;

        /*
        let validate_Category =     true;
        let validate_Tag      =     true;
        let validate_Amount   =     true;
        // let validate_URL      =  true;
        let validate_Detail   =     true;
        */
        let AvatarSource_empty =    false;


        validate_Name = validate_Name_Empty_String(itemNameState)=== false? false:true;
        // validate_Category = validate_Category_Empty_String(itemCategoryState)===false?
        //   false:true;
        // validate_Tag = validate_Tag_Empty_String(itemTagState)===false?false:true;
        //
        // validate_Amount = validate_Amount_func(currentAmountState)===false?false:true;
        // // validate_URL  = validate_URL_Empty_String(itemURLState)===false?false:true;
        //
        // validate_Detail = validate_Detail_Empty_String(itemDetailState)===false?false:true;
        //
        // AvatarSource_empty = Object.entries(avatarSourceState).length === 0
        //   ?true:false;

        if (validate_Name === false) {
            ToastAndroid.show(
                'Sorry, Name format is incorrect/empty.',
                ToastAndroid.SHORT,
            );
            setLoadingState(false);
            return navigation.navigate('AddExpenseItemPage');
        }





            // else if (validate_Detail== false) {
            //   ToastAndroid.show(
            //     'Sorry, Detail format is incorrect/empty',
            //     ToastAndroid.SHORT,
            //   );
            //   setLoadingState(false);
            //   return navigation.navigate('AddExpenseItemPage');
            // }

            // else if (AvatarSource_empty){
            //   ToastAndroid.show(
            //     'please select a picture.',
            //     ToastAndroid.SHORT,
            //   );
            //   setLoadingState(false);
            //   return navigation.navigate('AddExpenseItemPage');
        // }

        else {

            setLoadingState(true);
            console.log('validation success: ');
            console.log('avatarSourceState: --- ',avatarSourceState);


            // for empty image

            // if((avatarSourceState== null) ||(avatarSourceState.length==0)){
            if((avatarSourceState === null) ||(avatarSourceState.length===0)){
                // if((Object.entries(avatarSourceState).length === 0)
                //   &&(
                //     avatarSourceState.constructor === Object)){
                const user = auth().currentUser
                if (user !== null){
                    const userEmail = user.email;

                    console.log('userEmail : ',userEmail);
                    let date = new Date();
                    let timestamp = date.getTime();


                    console.log('timestamp: ', timestamp);

                    let itemId = await generateItemId(9);
                    // let itemId = Math.random();
                    console.log('itemId: ___________________________-',itemId);


                    const convertedPrice =
                        selectedOneCategoryState === MonetaryUnits[0].unicode
                            ?
                            (Number(itemPriceState)).toFixed(3)
                            // above is dollar
                            : selectedOneCategoryState === MonetaryUnits[1].unicode
                            ?
                            (Number(itemPriceState) * Number(
                                ConversionRate.EuroToDollar)).toFixed(3)
                            // // above is Euro to dollar
                            : selectedOneCategoryState === MonetaryUnits[2].unicode
                                ?
                                (Number(itemPriceState) / Number(
                                    ConversionRate.DollarToYen)).toFixed(3)
                                // above is  Yen to dollar
                                :
                                (Number(itemPriceState) / Number(
                                    ConversionRate.DollarToTaka)).toFixed(3);


                    console.log(convertedPrice, convertedPrice);


                    console.log('avatarSourceState.uri [without Image:', avatarSourceState[0].uri);

                    let addDoc = firestore().collection('items').add({
                        itemData:{
                            'nameText' : itemNameState,
                            'nameTextHalfWidth': toHalfWidth(itemNameState),
                            'categoryText' : itemCategoryState,
                            'tagText' : itemTagState,
                            'amountNumber' : currentAmountState,
                            'urlText' : itemURLState,
                            'detailText': itemDetailState,
                            'imageURL': null,
                            //avatarSourceState[0].uri,
                            // 'type':,
                            // 'imageURL': '',
                            'priceText':convertedPrice,
                            'haveItCondition':true,
                        },
                        'date' :timestamp,
                        'uploadedBy': userEmail,
                        'user': userEmail,
                        'itemId':itemId,


                    }).then(ref => {
                        console.log('Added document with ID: ', ref.id);
                        // setLoadingState(false);

                        return navigation.navigate('MonosHome', {
                            itemNameTrueOrFalse: true,
                        });
                        // return navigation.navigate('MonosHome')
                        // return navigation.navigate('AddExpenseItemPage');

                    }).catch(error => {
                        console.log("error in storing to cloud store: ", error);
                    });
                }

            }



            // for not empty image. put image in firestore with image url.
            else {

                let date = new Date();
                let timestamp = date.getTime();


                // sort to upload images first then vidos..., thus we can show images[0] first in assetList page..



                /*
                const file = {
                  uri: avatarSourceState[0].uri,
                  //'assets-library://asset/asset.PNG?id=655DBE66-8008-459C-9358-914E1FB532DD&ext=PNG',
                  name: itemId+'itemName.png',
                  type: 'assets/png',
                };

                */


                // let convertedPrice =itemPriceState;


                const convertedPrice =
                    selectedOneCategoryState === MonetaryUnits[0].unicode
                        ?
                        (Number(itemPriceState)).toFixed(3)
                        // above is dollar
                        : selectedOneCategoryState === MonetaryUnits[1].unicode
                        ?
                        (Number(itemPriceState) * Number(
                            ConversionRate.EuroToDollar)).toFixed(3)
                        // // above is Euro to dollar
                        : selectedOneCategoryState === MonetaryUnits[2].unicode
                            ?
                            (Number(itemPriceState) / Number(
                                ConversionRate.DollarToYen)).toFixed(3)
                            // above is  Yen to dollar
                            :
                            (Number(itemPriceState) / Number(
                                ConversionRate.DollarToTaka)).toFixed(3);

                // above is Taka to Dollar


                console.log('convertedPrice: ', convertedPrice);


                const user = auth().currentUser
                if (user !== null){
                    const userEmail = user.email;

                    console.log('timestamp: ', timestamp);



                    let uploadedURLsAND_itemId:{
                        url:string,
                        itemId: string,
                    }[]=[];

                    uploadedURLsAND_itemId = await uploadImages(userEmail);

                    console.log('\n\n uploadURLs2.length: ',uploadedURLsAND_itemId.length);

                    log.warn('\n\n\n\n to be checked later....');

                    let allImageurl:string[]=[];

                    let allItemIds:string[]=[];


                    let i = 0;

                    for (i = 0; i < uploadedURLsAND_itemId.length; i++) {
                        // url:url, itemId:itemId

                        let strLength: number = ('222' as string).length;
                        let uploadURLs22: {
                            url:string,
                            itemId: string,
                        }  = uploadedURLsAND_itemId[i];


                        const oneImageURL = uploadURLs22.url;
                        const oneImage_itemId = uploadURLs22.itemId;

                        // const storageBucketPredicate=
                        //   // 'https://console.firebase.google.com/project/monozseptember2020/storage/monozseptember2020.appspot.com/';
                        //   'https://firebasestorage.googleapis.com/v0/b/monozseptember2020.appspot.com/o/';
                        //
                        // const finalURLWithStorageBucketPredicate = decodeURIComponent(oneImageURL).replace(
                        //   storageBucketPredicate,
                        //   '');


                        allImageurl.push(oneImageURL);

                        allItemIds.push(oneImage_itemId);

                    };
                    // ---- ||||||||||||||||||

                    // return ;

                    // to be checked later....

                    console.log('url: ', uploadedURLsAND_itemId);
                    let addDoc = firestore().collection('items').add({
                        itemData:{
                            'nameText' : itemNameState,
                            'nameTextHalfWidth': toHalfWidth(itemNameState),
                            'categoryText' : itemCategoryState,
                            'tagText' : itemTagState,
                            'amountNumber' : currentAmountState,
                            'urlText' : itemURLState,
                            'detailText': itemDetailState,
                            'imageURL': allImageurl,
                            'priceText':convertedPrice,
                            'haveItCondition':true,
                        },
                        'date' :timestamp,
                        'uploadedBy': userEmail,
                        'user': userEmail,
                        'itemId':allItemIds,


                    }).then( (ref) => {
                        console.log('Added document with ID: ', ref.id);
                        // setLoadingState(false);

                        return navigation.navigate('MonosHome', {
                            itemNameTrueOrFalse: true,
                        });
                        // return navigation.navigate('MonosHome')
                        // return navigation.navigate('AddExpenseItemPage');

                    }).catch(  (error) => {
                        console.log("error in storing to cloud store: ", error);
                    });


                }
            }


        }

    }



    const submitRequest=()=>
    {
        let updateSuccess;

    }

    /*
    // const saveAction = async () =>{
    const invoke_camera= async () =>{
      // console.log('at invoke_camera: ');
      // await requestCameraPermission();

      await requestWriteRead_EXTERNAL_STORAGEPermission();


      // await requestWRITE_EXTERNAL_STORAGEPermission();

      // selectPhotoTappedAndPermissions();

    }

    */



    const increment= ()=>{
        setCurrentAmountState(currentAmountState +1)

    }



    const PlusIcon = (<TouchableOpacity style={{
        width:25,
        height:25,
    }}
                                        onPress={increment}>
        <Text>
            <FTI
                name='plus-circle'
                size={25}
                style={{ color: '#3B8489', top: '.8%' }}
                //      #3B8489
                //#5cb85c
            />
        </Text>

    </TouchableOpacity>);



    const decrement= ()=>{
        setCurrentAmountState(currentAmountState-1)

    }
    const MinusIcon = (
        <TouchableOpacity style={{
            width:25,
            height:25,
        }}

                          onPress={decrement}>
            <Text>
                <FTI
                    name='minus-circle'
                    size={25}
                    style={{ color: '#3B8489', top: '.8%' }}
                    //        #3B8489
                    //        #5cb85c
                />
            </Text>

        </TouchableOpacity>
    );



    const setName = (e) => {
        // console.log('e: at setName: ',e);
        // console.log(e);

        // setSaveDisabledState(false);

        setItemNameState(captilizeAllWords(e.value || ''));
    }
    const setCategory = (e) => {
        // console.log('e: at setCategory: ',e);
        // console.log(e);
        setItemCategoryState(captilizeAllWords(e.value || ''));
    }
    const setTag = (e) => {
        // console.log('e: at setTag: ',e);
        // console.log(e);
        setItemTagState(captilizeAllWords(e.value || ''));
    }

    const setURL = (e) => {
        // console.log('e: at setURL: ',e);
        // console.log(e);
        setItemURLState((e.value || ''));
    }

    const setPrice = (e) => {
        // console.log('e: at setDetail: ',e);
        // console.log(e);
        // setItemPriceState(captilizeAllWords(e.value || ''));
        setItemPriceState(e.value);
    }



    // const setDetail = (e) => {
    //   // console.log('e: at setDetail: ',e);
    //   // console.log(e);
    //   setItemDetailState(captilizeAllWords(e.value || ''));
    // }




    const refName     = useRef(null);
    const refCategory = useRef(null);
    const refTag      = useRef(null);
    const refURL      = useRef(null);
    const refPrice    = useRef(null);

    const refDetail   = useRef(null);


    const _goToCategory = () => {
        refCategory.current.focus();

    };
    const _goToTag = () => {
        refTag.current.focus();

    };
    const _goToURL = () => {
        refURL.current.focus();

    };
    // const _goToDetail = () => {
    //   refDetail.current.focus();
    //
    // };

    const _goToPrice = () => {
        refPrice.current.focus();

    };

    // _goToDetail


    if (loadingState) {
        return (
            <View
                style={AddExpenseItemPageStyles.centralPositionedLoading}
                key={'sasas1251231234123rArefin'}>
                <ActivityIndicator
                    size='large'
                    color='#da6a41'
                />
            </View>
        );
    }

    else
    {

        console.log("selectedOneCategoryState: ",selectedOneCategoryState);

        console.log("Add Item Modal Page");

        console.log('xxp: ',xxp);
        console.log('near xxp: : :: avatarSourceState.length: ',avatarSourceState.length);

        if((avatarSourceState !==null) &&(avatarSourceState.length>0)) {
            console.log('avatarSourceState[0].uri: ', avatarSourceState[0].uri);
        }

        // console.log('saveDisabledState: ',saveDisabledState);
        return (

            <View
                style={AddExpenseItemPageStyles.WelComePageFullViewFlex10}
            >


                <SafeAreaView style={AddExpenseItemPageStyles.safeAreaViewcontainer}>
                    <AvoidKeyboard>
                        <View style={{
                            flex: 9,
                            flexDirection:'column',
                        }}

                        >

                            {/*3*/}


                            <View
                                style={{flex:4}}
                            >
                                <View style={{flex:0.4,
                                    flexDirection:'row',
                                    justifyContent:'flex-start',
                                    // padding:20,
                                    // paddingTop:10,
                                    paddingLeft:14,
                                    // paddingBottom:20,
                                    paddingTop:8,
                                }}
                                >
                                    <TouchableOpacity
                                        onPress={closePageAndBack}
                                    >
                                        <FTI
                                            name='x'
                                            // name='x-square'
                                            size={30}
                                            color='black'
                                        />
                                    </TouchableOpacity>
                                </View>
                                <TouchableWithoutFeedback  onPress={()=>{
                                    Keyboard.dismiss()

                                    console.log('keyboard dismissed Add Wish Item Close Row');

                                }}>
                                    <View style={{
                                        flex:0.3,
                                        flexDirection:'row',
                                        justifyContent:'flex-end',
                                        marginRight:20,
                                        paddingBottom:2,
                                        minHeight:16,
                                        // height:18,
                                    }}
                                    >
                                        <Text style={{
                                            // color:'#3B8489',
                                            // fontWeight:'bold',
                                            fontSize:14,
                                            color: '#8E8E93',
                                        }}>
                                            {today2}</Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                {/*//911_1*/}
                                {/*//work_1*/}


                                {
                                    // Object.entries(avatarSourceState).length === 0
                                    /*((avatarSourceState== null) ||(avatarSourceState.length==0))*/
                                    ((avatarSourceState.length === 0))
                                        // &&
                                        // avatarSourceState.constructor === Object

                                        ?(
                                            <View
                                                style={{flex:4}}
                                            >
                                                <TouchableOpacity
                                                    style={{
                                                        flex:4,
                                                        flexDirection:'column',
                                                    }}
                                                    onPress={async () => {
                                                        if (Platform.OS === 'ios') {
                                                            helpers.checkAndRequestPermission(PERMISSIONS.IOS.CAMERA)
                                                            helpers.checkAndRequestPermission(PERMISSIONS.IOS.PHOTO_LIBRARY)
                                                            pickMultiple();
                                                            // selectPhotoTapped();
                                                            //navigation.navigate('CameraPage')
                                                        } else if (Platform.OS === 'android') {

                                                            await request_Write_Read_EXTERNAL_STORAGE_Permission();
                                                            await helpers.checkAndRequestPermission(PERMISSIONS.ANDROID.CAMERA)

                                                            // helpers.checkAndRequestPermission(PERMISSIONS.ANDROID.)
                                                            // helpers.checkAndRequestPermission(PERMISSIONS.IOS.PHOTO_LIBRARY)
                                                            pickMultiple();
                                                            // invoke_camera();
                                                        } else {
                                                            console.log("not adapted")
                                                        }
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            flex:4,
                                                            width:deviceWidth * 0.90,
                                                            flexDirection:'column',
                                                            marginLeft: 18,
                                                            marginRight:18,
                                                        }}
                                                        source={defaultImage}
                                                    />
                                                </TouchableOpacity>

                                            </View>):(




                                            <View style={{
                                                flex:4,
                                                flexDirection:'column',
                                            }}
                                            >
                                                <ScrollView
                                                    horizontal={true}
                                                    contentContainerStyle={
                                                        styles.contentContainer}
                                                >
                                                    {/*{this.state.image ? this.renderAsset(this.state.image) : null}*/}
                                                    {
                                                        avatarSourceState
                                                            ? avatarSourceState.map((i) => (
                                                                <View key={i.uri}>{renderAsset(i)}</View>
                                                            ))
                                                            : null
                                                    }
                                                </ScrollView>


                                                <View
                                                    style={{
                                                        backgroundColor: '#EA555C',
                                                    }}
                                                >
                                                    <Text style={{
                                                        paddingLeft: 20,
                                                        paddingRight:20,
                                                    }}> to change picture/vidoe now please,
                                                        press cancel and add preferred picture and video again.</Text>
                                                </View>

                                            </View>










                                        )
                                }
                                {/*// image related codes ends here...*/}

                            </View>

                            {/*Start*/}
                            <TouchableWithoutFeedback onPress={()=>{
                                Keyboard.dismiss()

                                console.log('keyboard dismissed');

                            }}>
                                <View>
                                    <View
                                        style={{flex:0.3,
                                            flexDirection:'column',
                                            // justifyContent:'flex-start',
                                            // padding:20,
                                        }}
                                    >
                                    </View>

                                    <View style=
                                              {{
                                                  paddingBottom:20,
                                              }}>

                                        <View style={AddExpenseItemPageStyles.modalContent0002}
                                        >

                                            <View style={AddExpenseItemPageStyles.Row}
                                            >
                                                <View
                                                    style={{

                                                        justifyContent:'center',

                                                    }}
                                                >
                                                    <Text style={
                                                        AddExpenseItemPageStyles.tableSideColumn

                                                    }>
                                                        Name
                                                    </Text>
                                                </View>
                                                <View  style={{

                                                }} >
                                                    <TextInput
                                                        style={AddExpenseItemPageStyles.TextInputRightTextBox}
                                                        placeholder={'name *'}
                                                        ref={refName}
                                                        // onChangeText={onChange}
                                                        onChangeText={value => setName({value})}
                                                        autoCorrect={false}
                                                        textContentType={'none'}
                                                        autoCapitalize={'none'}
                                                        keyboardType={'default'}
                                                        onSubmitEditing={_goToCategory}
                                                        returnKeyType={'next'}
                                                    />
                                                </View>
                                            </View>

                                            <View style={AddExpenseItemPageStyles.Row}
                                            >
                                                <View
                                                    style={{
                                                        justifyContent:'center',
                                                    }}
                                                >
                                                    <Text style={
                                                        AddExpenseItemPageStyles.tableSideColumn


                                                    }>
                                                        Category
                                                    </Text>
                                                </View>
                                                <View  style={{
                                                    // flex:1,
                                                    // justifyContent:'flex-end',
                                                    justifyContent:'center',
                                                }} >
                                                    <TextInput
                                                        style={AddExpenseItemPageStyles.TextInputRightTextBox}
                                                        placeholder={'for what'}
                                                        ref={refCategory}
                                                        // onChangeText={onChange}
                                                        onChangeText={value => setCategory({value})}
                                                        autoCorrect={false}
                                                        textContentType={'none'}
                                                        autoCapitalize={'none'}
                                                        keyboardType={'default'}
                                                        onSubmitEditing={_goToTag}
                                                        returnKeyType={'next'}
                                                    />
                                                </View>
                                            </View>
                                            <View style={AddExpenseItemPageStyles.Row}
                                            >
                                                <View
                                                    style={{

                                                        justifyContent:'center',

                                                    }}
                                                >
                                                    <Text style={
                                                        AddExpenseItemPageStyles.tableSideColumn


                                                    }>
                                                        Tag
                                                    </Text>
                                                </View>
                                                <View  style={{
                                                    // flex:1,
                                                    // justifyContent:'flex-end',
                                                    justifyContent:'center',
                                                }} >
                                                    <TextInput
                                                        style={AddExpenseItemPageStyles.TextInputRightTextBox}
                                                        placeholder={'identifier'}
                                                        ref={refTag}
                                                        // onChangeText={onChange}
                                                        onChangeText={value => setTag({value})}
                                                        autoCorrect={false}
                                                        textContentType={'none'}
                                                        autoCapitalize={'none'}
                                                        keyboardType={'default'}
                                                        onSubmitEditing={_goToURL}
                                                        returnKeyType={'next'}
                                                    />
                                                </View>
                                            </View>





                                            <View style={AddExpenseItemPageStyles.Row}
                                            >
                                                <View
                                                    style={{
                                                        justifyContent:'center',
                                                    }}
                                                >
                                                    <Text style={
                                                        AddExpenseItemPageStyles.tableSideColumn
                                                    }>Amount
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                }}>
                                                    {MinusIcon}
                                                    <Text style={{ fontSize: 16, fontWeight: 'normal' }}>
                                                        {'  '}
                                                        {currentAmountState}
                                                        {'  '}
                                                    </Text>
                                                    {PlusIcon}
                                                </View>
                                            </View>
                                            <View
                                                style={AddExpenseItemPageStyles.Row}
                                            >

                                                <View
                                                    style={{

                                                        justifyContent:'center',

                                                    }}
                                                >
                                                    <Text style={
                                                        AddExpenseItemPageStyles.tableSideColumn


                                                    }>URL
                                                    </Text>
                                                </View>


                                                <View  style={{
                                                    // flex:1,
                                                    // justifyContent:'flex-end',
                                                    justifyContent:'center',
                                                }} >
                                                    <TextInput
                                                        style={[AddExpenseItemPageStyles.TextInputRightTextBox,
                                                            // {borderColor:'red',borderWidth:2}
                                                        ]}
                                                        placeholder={'url'}
                                                        ref={refURL}
                                                        // onChangeText={onChange}
                                                        onChangeText={value => setURL({value})}
                                                        autoCorrect={false}
                                                        textContentType={'none'}
                                                        autoCapitalize={'none'}
                                                        keyboardType={'default'}
                                                        onSubmitEditing={_goToPrice}
                                                        returnKeyType={'next'}

                                                    />
                                                </View>
                                            </View>
                                            <View
                                                style={AddExpenseItemPageStyles.RowPrice}
                                            >
                                                <View
                                                    style={{
                                                        justifyContent:'center',
                                                    }}
                                                >
                                                    <Text style={
                                                        AddExpenseItemPageStyles.tableSideColumn
                                                    }>Price
                                                    </Text>
                                                </View>


                                                <View  style={{
                                                    flexDirection:'row-reverse',

                                                }} >

                                                    <View style={{
                                                        flexDirection:'row',
                                                        alignItems:'flex-end',
                                                    }}>
                                                        {androidState ? (
                                                            <Picker
                                                                selectedValue={selectedOneCategoryState}
                                                                style={{
                                                                    width:deviceWidth*0.08,
                                                                    backgroundColor: '#FFFFFF',
                                                                    height:45,
                                                                }}
                                                                itemStyle={{
                                                                    // flexDirection:'row',
                                                                }}
                                                                mode={'dropdown'}
                                                                onValueChange={(itemValue, itemIndex) =>
                                                                    setSelectedOneCategoryState(itemValue)
                                                                    // setSelectedOneCategoryState(MonetaryUnits[itemIndex].unicode)
                                                                }>
                                                                {pricePikcerData}
                                                            </Picker>):(
                                                            <View style={{
                                                                width:deviceWidth*0.08,
                                                                height:45,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                paddingTop: 3,
                                                            }}>
                                                                <TouchableOpacity
                                                                    onPress={showActionSheet}
                                                                >
                                                                    <Text>{selectedOneCategoryState}</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )}
                                                    </View>
                                                    <View style={{
                                                        flexDirection:'row',
                                                        alignItems:'center',
                                                    }}>
                                                        <TextInput
                                                            style={[AddExpenseItemPageStyles.TextInputRightTextBox,
                                                                // {borderColor:'red',borderWidth:2}
                                                            ]}
                                                            placeholder={'price'}
                                                            ref={refPrice}
                                                            onChangeText={value => setPrice({value})}
                                                            autoCorrect={false}
                                                            textContentType={'postalCode'}
                                                            autoCompleteType={'cc-number'}
                                                            dataDetectorTypes={'phoneNumber'}
                                                            keyboardType={'numeric'}
                                                            returnKeyLabel={ 'done' }
                                                        />
                                                    </View>
                                                </View>
                                            </View>

                                        </View>


                                        {/*End of dEtail starts above Name View*/}

                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                            <View style={{
                                flexDirection:'column',
                                minHeight:60,
                                height:55,
                            }}>

                                <View
                                    style={{
                                        flex:0.8,
                                        flexDirection:'row',
                                        // ,marginTop:10,
                                        //  marginBottom:10,
                                        marginLeft:10,
                                        marginRight:10,
                                        justifyContent:'space-around',
                                        paddingBottom:20,
                                    }}>

                                    {/*Tag*/}

                                    <TouchableOpacity
                                        style={{
                                            width:(deviceWidth/2)-20,
                                            height:44,
                                            minHeight:44,
                                            borderRadius:5,

                                            // flex:1,
                                            alignItems: 'stretch',
                                            backgroundColor: '#A39E9D'
                                            // #8E8E93
                                            // #A39E9D
                                            // lightslategrey (#778899)
                                        }}
                                        onPress={closePageAndBack}
                                    >
                                        <View style={AddExpenseItemPageStyles.MiddleTextView}>
                                            <Text style={AddExpenseItemPageStyles.MiddleText}>Cancel</Text>

                                        </View>
                                    </TouchableOpacity>

                                    {/*Category*/}

                                    <TouchableOpacity
                                        style={{
                                            width:(deviceWidth/2)-20,
                                            height:44,
                                            minHeight:44,
                                            borderRadius:5,
                                            // flex:1,
                                            alignItems: 'stretch',
                                            backgroundColor: '#EA555C',
                                            // #EA555C
                                            //#ff6347

                                        }}

                                        onPress={saveAction}

                                    >
                                        <View style={AddExpenseItemPageStyles.MiddleTextView}>
                                            <Text style={AddExpenseItemPageStyles.MiddleText}>Save</Text>

                                        </View>
                                    </TouchableOpacity>

                                </View>



                            </View>
                        </View>
                        {/*Column Height of this view*/}
                    </AvoidKeyboard>
                </SafeAreaView>
            </View>


        );

    }
}

export default AddExpenseItemPage;


const styles = StyleSheet.create({
    contentContainer: {
        // paddingVertical: 20,

        // style={{
        // flex:4,
        // flexDirection:'column',
        // marginLeft: 20,
        // marginRight:20,



        // flex:3.5,
        // flexDirection:'column',

// }}
    }
});



const AddExpenseItemPageStyles = StyleSheet.create({

    WelComePageFullViewFlex10: {
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor:'#ffffff',
    },


    safeAreaViewcontainer:{
        flex: 10,
        flexDirection: 'column',
    },
    TextInputRightTextBox:{
        fontSize:16,
        color: '#8E8E93',
        // flex: 1,
        flexDirection:'row',
        width:Dimensions.get('window').width*3/6,

        // #8E8E93
        // old: #424242
        textAlign: 'right',
        height:45,
        // borderRightColor:'red',
        // borderRightWidth:StyleSheet.hairlineWidth,

        /*
        borderBottomColor:'red',
        borderBottomWidth:StyleSheet.hairlineWidth,
        textDecorationStyle:'dotted',
        */

    },
    tableSideColumn:{
        fontSize: 16,
        //  paddingBottom: 3,
        //  paddingTop: 3,
        color: '#8E8E93',
// #8E8E93
//old: #778899,
        fontWeight: '600'
    },
    tableSideColumnDetail:{
        fontSize: 16,
        paddingBottom: 3,
        paddingTop: 4,
        color: '#778899',
        fontWeight: 'bold'
    },

    MiddleTextSearch:{

        backgroundColor: 'transparent',
        fontSize:20,
        textAlign:'center',
    },
    MiddleText: {
        backgroundColor: 'transparent',
        fontSize:20,
        textAlign:'center',
        color:'white',
    },


    MiddleTextView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    closeIcon: {

        paddingRight: 5,
    },
    inputDetailTextArea: {
        flex: 1,
        backgroundColor:'white',
        paddingLeft: 0,
        color: '#424242',
        borderColor:'#778899',
        // lightslategrey (#778899)
        borderWidth:0.5,
    },


    // test

    buttonBillsList:{
        backgroundColor: 'white',
        alignItems:'center',
        borderRadius: 5,
        borderColor:'#fa5656',
        borderWidth:1,
        //backgroundColor: 'dodgerblue',
    },
    modalContent0002: {

        // flex:4.6,
        // maxHeight:320,
        // height:300,
        justifyContent: 'center',

    },
    DetailView:{
        flex:1.7,
        justifyContent: 'center',

    },
    RowPrice:{
        // flex:1,
        height:40,
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft: 22,
        marginRight:8,
        paddingHorizontal:14,
        // padding:4,
    },
    Row:{
        // flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:20,
        marginRight:20,
        // padding:4,
        paddingHorizontal:14,
        height:45,
        minHeight:45,
    },

    centralPositionedLoading: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

