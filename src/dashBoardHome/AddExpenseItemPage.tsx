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


import {Picker} from '@react-native-picker/picker';

import Snackbar from 'react-native-snackbar';
import FTI from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MTI from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';



import firebase from '@react-native-firebase/app';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


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



type PermissionStatus = 'unavailable' | 'denied' | 'blocked' | 'granted';



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








    const [xxp,setX]= useState(0);



    // image: null,
    //   images: null,



    const [saveDisabledState, setSaveDisabledState] =useState(true);




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

            },
            (buttonIndex) => {
                setSelectedOneCategoryState(Buttons[buttonIndex]);

            });
    };




    const deviceWidth = Dimensions.get('window').width;



    // let today =Date.now();
    let today2 = moment(Date.now()).format('ll');

    const captilizeAllWords = (sentence) => {
        if (typeof sentence !== "string") return sentence;
        return sentence.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }


    const closePageAndBack=()=>{
        console.log(" at add asset item's closePageAndBack ");

        return navigation.navigate('DrawerNavigatorCustom')
    }

    const _goTo_FMPWebView=()=>{

        return navigation.navigate('FMPWebView')
    }





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
                {text: 'OK',  onPress: () => console.log("OK Pressed"),

                    // onPress: setCondition2

                },
            ],
            {cancelable: false},
        );
    }
    // let Result_1 = PERMISSIONS.ANDROID.CAMERA;
// let Result_2 = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
// let Result_3 = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

    const validate_Name_Empty_String=(nameParam:string)=> {
        console.log('at validation nameParam : ',nameParam);
        if( !nameParam || !typeof(nameParam) || nameParam === '' ||
            nameParam.length===0)
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


    const getRandomArbitrary =(min:number, max:number /* number */)=> {
        return Math.floor(Math.random() * (max - min) + min);
    }



    const generateItemId = async (length :number )=> {

        let _result ='';
        let i = 0;
        const _allowedChars =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        while (i < Math.round(length)) {

            let randomInt =getRandomArbitrary(0,_allowedChars.length);

            _result += _allowedChars[randomInt];

            ++i;
        }
        return _result;
    }


    // const getUserInfo = async () => {
    const saveAction = async () =>{
        console.log('at save action for add Items');

        let validate_Name     =     false;


        let AvatarSource_empty =    false;


        validate_Name = validate_Name_Empty_String(itemNameState)=== false? false:true;


        if (validate_Name === false) {
            ToastAndroid.show(
                'Sorry, Name format is incorrect/empty.',
                ToastAndroid.SHORT,
            );
            setLoadingState(false);
            return navigation.navigate('AddExpenseItemPage');
        }


        else {

            setLoadingState(true);
            console.log('validation success: ');
            // console.log('avatarSourceState: --- ',avatarSourceState);

            // if((avatarSourceState === null) ||(avatarSourceState.length===0)){

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


                    let addDoc = firestore().collection('items').add({
                        itemData:{
                            'nameText' : itemNameState,
                            'categoryText' : itemCategoryState,
                            'amountNumber' : currentAmountState,
                            'priceText':convertedPrice,
                            'brought':true,
                        },
                        'date' :timestamp,
                        'uploadedBy': userEmail,
                        'user': userEmail,
                        'itemId':itemId,

                    }).then(ref => {
                        console.log('Added document with ID: ', ref.id);
                        // setLoadingState(false);

                        return navigation.navigate('DrawerNavigatorCustom', {
                            itemNameTrueOrFalse: true,
                        });

                    }).catch(error => {
                        console.log("error in storing to cloud store: ", error);
                    });
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


        // console.log('saveDisabledState: ',saveDisabledState);
        return (

            <View
                style={AddExpenseItemPageStyles.WelComePageFullViewFlex10}
            >


                <SafeAreaView style={AddExpenseItemPageStyles.safeAreaViewcontainer}>
                    {/*<AvoidKeyboard>*/}
                        <View style={{
                            flex: 9,
                            flexDirection:'column',
                        }}

                        >

                            {/*3*/}


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
                                            alignItems: 'stretch',
                                            backgroundColor: '#A39E9D'

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
                    {/*</AvoidKeyboard>*/}
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

