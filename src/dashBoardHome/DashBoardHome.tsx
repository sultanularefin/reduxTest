import React, { useEffect, useRef, useState, useCallback } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    ActivityIndicator,
    Alert,
    StatusBar,
    ScrollView,
    TextInput,
    FlatList,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

// import EvilIcons from 'react-native-vector-icons/EvilIcons';

// import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import ExpenseItems from './expenseItems/ExpenseItems';

// import MTI from 'react-native-vector-icons/MaterialIcons';
import FTI from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// React Hooks navigation.

// import { useFocusEffect } from '@react-navigation/native';
// import {useFocusEffect} from 'react-navigation-hooks';

import QueryCategoriesComponent from './QueryCategoriesComponent';
import MoneyHeaderComponent from './MoneyHeaderComponent';

// const defaultImage = require('./../../assets/default-image_01.jpg');

// import { useIsFocused } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

// React Hooks navigation.
export interface Props {}


export interface iItem {
    date: Date;
    id: string;
    itemData: {
        amountNumber: Number;
        categoryText: string;
        // detailText: string;
        // imageURL: string[];
        nameText: string;
        // nameTextHalfWidth: string;
        // tagText: string;
        // urlText: string;
        priceText: Number;
        // haveItCondition: Boolean;
        brought: Boolean;
    };
    uploadedBy: string;
    user: string;
    itemId: number[];
}

const Items: iItem[];
import { get } from 'lodash';

const DashBoardHome: React.FC<Props> = ({ props, navigation }) => {
    //States.

    // const [searchState, setSearchState] = useState('');
    // const [loadingState,setLoadingState]  = useState(false);
    const [connectionStatusState, setConnectionStatusState] = useState(true);

    // const isFocused = useIsFocused();

    // console.log('isFocused: ',isFocused);
    const [emptyItemState, setEmptyItemState] = useState(false);
    const [itemDataState, setItemDataState] = useState(
        new Array<{
            date: Date;
            id: string;
            itemData: {
                amountNumber: Number;
                categoryText: string;
                // detailText: string;
                // imageURL: string[];
                nameText: string;
                // nameTextHalfWidth: string;
                // tagText: string;
                // urlText: string;
                priceText: Number;
                // haveItCondition: Boolean;
                brought: Boolean;

            };
            uploadedBy: string;
            user: string;
            itemId: string[];
        }>()
    );

    console.log('\\\\\\\\itemDataState: ', itemDataState);

    // console.log('\\\\\\\\itemDataState[0][\'uploadedBy\']: ',itemDataState[0]);

    const [itemDataBackupState, setItemDataBackupState] = useState([]);
    const [errorState, setErrorState] = useState(false);
    const [filterCategoryState, setFilterCategoryState] = useState('');

    const [filterByStringInputState, setfilterByStringInputState] = useState('');

    let searchString = '';

    //States ends here.

    const deviceWidth = Dimensions.get('window').width;

    // const [itemNameTempParameterState,setIitemNameTempParameterState]=useState(null);
    const Separator = () => {
        return <View style={DashBoardStyles.separator} />;
    };

    // useEffect(() => {
    //   const unsubscribe = NetInfo.addEventListener(state => {
    //     console.log('Connection type', state.type);
    //     console.log('Is connected?', state.isConnected);
    //     if (!state.isConnected) {
    //       setConnectionStatusState(false);
    //     } else {
    //       setConnectionStatusState(true);
    //     }
    //   });
    //
    //   return () => {
    //     unsubscribe();
    //   };
    // }, []);

    // function useFriendStatus(friendID) {


    useEffect(() => {
        // const Load_Recent_Survey_data_by_User = async () => {
        const serverDataStateTemp: any[] = [];

        if (auth && auth().currentUser && auth().currentUser.email) {
            const myUserEmail = auth().currentUser.email;

            console.log('myUserEmail at DashBoardHome: ', myUserEmail);

            if (myUserEmail) {
                console.log('myUserEmail:_____________ ', myUserEmail);
                let surveyDataRef = firestore()
                    .collection('items')
                    .where('user', '==', myUserEmail)
                    .orderBy('date', 'desc');
                let query = surveyDataRef
                    .get()
                    .then(snapshot => {
                        if (snapshot.empty) {
                            console.log('No matching documents in AssetLIstTab.');
                            setEmptyItemState(true);
                            // return;
                        }
                        snapshot.forEach(doc => {
                            // size= size +1;
                            // let oneData =doc.data();
                            const oneItemData = doc.data();
                            const id = doc.id;

                            serverDataStateTemp.push({id, ...oneItemData});
                            // console.log('doc:-->',doc);
                            // serverDataStateTemp.push(myHonda);
                        });
                        console.log(
                            'serverDataStateTemp.length: ',
                            serverDataStateTemp.length,
                        );
                        setItemDataState(serverDataStateTemp);
                        // setLoadingState(false);
                    })
                    .catch(err => {
                        console.log(
                            'Error getting documents_______________at DashBoardHome:',
                            err,
                        );

                        console.error('********* 9 start error...');
                        setErrorState(true);
                        setEmptyItemState(true);
                    });
            }
        }
    }, [connectionStatusState]);





    useFocusEffect(
        useCallback(() => {
            console.log('at LoadData: ', '||||||||||||||||||||||||||');

            const serverDataStateTemp2: any[] = [];

            if (auth && auth().currentUser && auth().currentUser.email) {
                const myUserEmail = auth().currentUser.email;
                if (myUserEmail) {
                    const requestRef = firestore()
                        .collection('items')
                        .where('user', '==', myUserEmail)
                        .orderBy('date', 'desc');

                    requestRef
                        .get()
                        .then(snapshot => {
                            if (snapshot.empty) {
                                console.log('No matching documents.');
                                setItemDataState(serverDataStateTemp2);
                                setEmptyItemState(true);
                                return;
                            }

                            snapshot.forEach(doc => {
                                const id = doc.id;
                                console.log('id: ', id);
                                const oneItemData = doc.data();

                                serverDataStateTemp2.push({id, ...oneItemData});
                            });
                            console.log(
                                '____________________________________',
                                serverDataStateTemp2.length,
                            );

                            setItemDataState(serverDataStateTemp2);

                            // setLoadingState(false);
                        })
                        .catch(err => {
                            console.log('Error getting documents', err);
                            console.error('***** 5 start error...');
                            // setErrorState(true);
                        });
                }
            }
        }, []),
    );




    const handleSelect = async (id: Number, title: string) => {
        console.log('id: ', id);
        console.log('title: ', title);
        console.log('at handleSelect');

        if (Number(id) === 1) {
            setfilterByStringInputState('');
            clearSearch();
            setFilterCategoryState('');
        } else {
            setfilterByStringInputState('');
            clearSearch();
            setFilterCategoryState(title);
        }
    };

    const handleEditUpdate = (additionalData: {
        documentId: string;
        contentType: string;
        width: number;
        height: number;
        itemName: string;
    }) => {
        console.log('documentId: ', additionalData.documentId);

        return navigation.navigate('EditItemPage', {
            documentId: additionalData.documentId,
            /*additionalData */
        });

        // navigation.navigate('ProductDetailsPage', {
        //   itemId: item.index,
        //   otherParam: item.title,
        //
        // });
    };

    const handleDeleteItem = (documentId: string) => {
        console.log('at handleDeleteItem [documentId]: ', documentId);

        console.log('itemDataState: ', itemDataState);

        const allItems = [...itemDataState];

        const filteredItems = allItems.filter(
            (oneItem) => oneItem.id !== documentId
        );

        // deleteItem(documentId);

        // console.log('filteredItems: in handleDeleteItem ',filteredItems);

        if (Array.isArray(filteredItems) && filteredItems.length === 0) {
            console.log(
                '(Array.isArray(filteredItems) && (filteredItems.length === 0))'
            );
            setItemDataState(filteredItems);
            setEmptyItemState(true);
        } else {
            console.log(
                '! True This -> (Array.isArray(filteredItems) && (filteredItems.length === 0))'
            );
            setItemDataState(filteredItems);
        }
    };

    // const deleteItem = async documentId => {
    //   console.log('at delete item, documentId: ', documentId);
    //   // const documentId = navigation.getParam('documentId', 0);
    //
    //   const user = auth().currentUser;
    //   if (user !== null) {
    //     await firestore().collection('items').doc(documentId).delete();
    //   }
    // };

    const handleSearchButton = () => {
        // console.log('searchStringState: ',searchStringState);
        console.log('connectionStatusState: ', connectionStatusState);
        if (!connectionStatusState) {
            Snackbar.show({
                text: 'You are Offline!',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
            });
            return navigation.navigate('ItemListTab');
        } else {
            // console.log('searchStringState: ',searchStringState);
            // setSearchString
            console.log('at handleSearchButton: ');
            setfilterByStringInputState(searchString);
            // setFilterCategoryState('');

            // setSearchStringState(searchStringState);
        }
    };

    const refSearch = useRef(null);

    const clearSearch = () => {
        console.log('at clearSearch: ');
        refSearch.current.clear();
        // refPWD.current.focus();

        console.log('searchString: ', searchString);

        searchString = '';
        setfilterByStringInputState('');

        // return navigation.navigate('ForgetPassword');
    };

    const setSearch = (e) => {
        console.log('e: at setSearch: ', e);
        searchString = e.value || '';
    };

    // return (
    //   <View>
    //     <Text>
    //       Bug finding.
    //     </Text>
    //   </View>
    //
    // )
    if (
        !emptyItemState &&
        Array.isArray(itemDataState) &&
        itemDataState.length === 0
    ) {
        console.log('condition 1: loading state');

        return (
            <View style={DashBoardStyles.HomePageFullViewWithStatusBar}>
                <SafeAreaView style={DashBoardStyles.safeAreaViewcontainer}>
                    <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                    <View style={DashBoardStyles.HomePageFullViewWithOutStatusBar}>
                        <View
                            style={{
                                flex: 2.9,
                                flexDirection: 'column',
                            }}
                        >
                            <View
                                style={{
                                    flex: 0.5,
                                    flexDirection: 'column',
                                    /*backgroundColor:'#aaffcc',*/
                                }}
                            />
                            {/* 0.2 +0.9*/}

                            <MoneyHeaderComponent
                                // updateCategoryResult={handleSelect}
                                navigation={navigation}
                                priceCalculateForm={itemDataState}
                            />

                            <View
                                style={{
                                    flex: 0.1,
                                    flexDirection: 'column',
                                }}
                            />

                            {/* 0.7 + 0.2*/}
                            {/* not add image but before flat List*/}
                            <View
                                style={{
                                    height: 60,
                                    // borderRadius:1000,
                                }}
                            >
                                <View
                                    style={{
                                        // flex:0.8,
                                        width: deviceWidth * 0.7,
                                        // borderRadius:1000,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <View
                                        // elevation={100}
                                        style={{
                                            backgroundColor: '#E5E5EA',
                                            // flex:0.8,
                                            width: deviceWidth * 0.7,
                                            justifyContent: 'space-around',
                                            borderRadius: deviceWidth,
                                            // height/5
                                            marginLeft: 10,
                                            flexDirection: 'row',
                                        }}
                                    >
                                        {/*until clear Search*/}
                                        <View style={{ flexDirection: 'row', flex: 0.8 }}>
                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    flex: 0.1,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Ionicons
                                                    style={DashBoardStyles.searchIcon}
                                                    name="ios-search"
                                                    size={20}
                                                    color="#ffffff"
                                                />
                                            </View>

                                            <TextInput
                                                // style={DashBoardStyles.input}
                                                style={[
                                                    DashBoardStyles.input,
                                                    {
                                                        height: 50,
                                                    },
                                                ]}
                                                placeholder="Search"
                                                ref={refSearch}
                                                onChangeText={(value) => setSearch({ value })}
                                                autoCorrect={false}
                                                textContentType={'none'}
                                                // autoCapitalize={'none'}
                                                keyboardType={'default'}
                                            />
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                flex: 0.1,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <TouchableOpacity onPress={clearSearch}>
                                                <Entypo
                                                    style={DashBoardStyles.closeIcon}
                                                    name="circle-with-cross"
                                                    size={20}
                                                    color="#000"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            width: deviceWidth * 0.3,
                                            // flex:0.3,
                                            alignItems: 'stretch',
                                            justifyContent: 'flex-end',
                                        }}
                                        onPress={handleSearchButton}
                                    >
                                        <View style={DashBoardStyles.MiddleTextViewSearch}>
                                            <Text style={DashBoardStyles.MiddleTextSearch}>
                                                Search
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* 1.4*/}

                            {/*0.8+ 0.2 = 1*/}

                            <QueryCategoriesComponent updateCategoryResult={handleSelect} />
                        </View>

                        <View
                            style={{
                                // margin:10,
                                // flex:5.5,

                                marginHorizontal: 0,
                                marginVertical: 0,
                                flex: 6,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center', // for activity indicator
                            }}
                        >
                            <View
                                style={[DashBoardStyles.container01_for_login_only]}
                                key={'sasas1251231234123rArefin'}
                            >
                                <ActivityIndicator size="large" color="#da6a41" />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

        // ((Object.entries(avatarSourceState).length === 0)
        //   &&(
    //     avatarSourceState.constructor === Object))
    else if (
        emptyItemState &&
        Array.isArray(itemDataState) &&
        itemDataState.length === 0
    ) {
        console.log(
            'condition 2: (emptyItemState===true) && (itemDataState ===null)'
        );
        // console.log('props condition 2: ',props);
        return (
            <View style={DashBoardStyles.HomePageFullViewWithStatusBar}>
                <SafeAreaView style={DashBoardStyles.safeAreaViewcontainer}>
                    <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                    <View style={DashBoardStyles.HomePageFullViewWithOutStatusBar}>
                        <View
                            style={{
                                flex: 2.9,
                                flexDirection: 'column',
                            }}
                        >
                            <View
                                style={{
                                    flex: 0.5,
                                    flexDirection: 'column',
                                }}
                            />
                            {/* 0.2 +0.9*/}

                            <MoneyHeaderComponent
                                // updateCategoryResult={handleSelect}
                                navigation={navigation}
                                priceCalculateForm={itemDataState}
                            />

                            <View
                                style={{
                                    flex: 0.1,
                                    flexDirection: 'column',
                                }}
                            />

                            {/* 0.7 + 0.2*/}
                            {/* not add image but before flat List*/}
                            <View
                                style={{
                                    height: 60,
                                    // borderRadius:1000,
                                }}
                            >
                                <View
                                    style={{
                                        // flex:0.8,
                                        width: deviceWidth * 0.7,
                                        // borderRadius:1000,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <View
                                        // elevation={100}
                                        style={{
                                            backgroundColor: '#E5E5EA',
                                            // flex:0.8,
                                            width: deviceWidth * 0.7,
                                            justifyContent: 'space-around',
                                            borderRadius: deviceWidth,
                                            // height/5
                                            marginLeft: 10,
                                            flexDirection: 'row',
                                        }}
                                    >
                                        {/*until clear Search*/}
                                        <View style={{ flexDirection: 'row', flex: 0.8 }}>
                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    flex: 0.1,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Ionicons
                                                    style={DashBoardStyles.searchIcon}
                                                    name="ios-search"
                                                    size={20}
                                                    color="#ffffff"
                                                />
                                            </View>

                                            <TextInput
                                                // style={DashBoardStyles.input}
                                                style={[
                                                    DashBoardStyles.input,
                                                    {
                                                        height: 50,
                                                    },
                                                ]}
                                                placeholder="Search"
                                                ref={refSearch}
                                                onChangeText={(value) => setSearch({ value })}
                                                autoCorrect={false}
                                                textContentType={'none'}
                                                // autoCapitalize={'none'}
                                                keyboardType={'default'}
                                            />
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                flex: 0.1,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <TouchableOpacity onPress={clearSearch}>
                                                <Entypo
                                                    style={DashBoardStyles.closeIcon}
                                                    name="circle-with-cross"
                                                    size={20}
                                                    color="#000"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            width: deviceWidth * 0.3,
                                            // flex:0.3,
                                            alignItems: 'stretch',
                                            justifyContent: 'flex-end',
                                        }}
                                        onPress={handleSearchButton}
                                    >
                                        <View style={DashBoardStyles.MiddleTextViewSearch}>
                                            <Text style={DashBoardStyles.MiddleTextSearch}>
                                                Search
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* 1.4*/}

                            {/*0.8+ 0.2 = 1*/}

                            <QueryCategoriesComponent updateCategoryResult={handleSelect} />
                        </View>

                        <TouchableWithoutFeedback
                            onPress={() => {
                                Keyboard.dismiss();
                                console.log('keyboard dismissed');
                            }}
                        >
                            {/*<View*/}
                            {/*  style={{*/}
                            {/*    height:10,*/}
                            {/*    // borderRadius:1000,*/}
                            {/*  }}*/}
                            {/*>*/}
                            {/*</View>*/}

                            <View
                                style={{
                                    marginHorizontal: 0,
                                    marginVertical: 0,
                                    flex: 5.5,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <View
                                    style={DashBoardStyles.noDataRecentForm}
                                    key={'sasas1251231234123r33Arefin'}
                                >
                                    <Text
                                        style={{
                                            // color: '#C4C805',

                                            color: '#8E8E93',
                                            // fontWeight: 'bold',
                                            backgroundColor: 'transparent',
                                            fontSize: 24,
                                            paddingBottom: 5,
                                        }}
                                    >
                                        Item List empty.
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: '#8E8E93',
                                        }}
                                    >
                                        You may Add Item's from the Add Items page.
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </SafeAreaView>
            </View>
        );
    } else if (
        filterCategoryState !== '' &&
        itemDataState != null &&
        filterByStringInputState === ''
    ) {
        console.log('for category buttons');
        console.log(
            "condition 6:  ((filterCategoryState!=='')&&(itemDataState!=null) &&(filterByStringInputState===''))"
        );

        console.log('filterCategoryState: ', filterCategoryState);
        const allItems = [...itemDataState];

        const filteredItems = allItems.filter(
            (oneItem) =>
                oneItem.itemData.categoryText.toLocaleLowerCase() ===
                filterCategoryState.toLocaleLowerCase()
        );
        return (
            <View style={DashBoardStyles.HomePageFullViewWithStatusBar}>
                <SafeAreaView style={DashBoardStyles.safeAreaViewcontainer}>
                    <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                    <View style={DashBoardStyles.HomePageFullViewWithOutStatusBar}>
                        <View
                            style={{
                                flex: 2.9,
                                flexDirection: 'column',
                            }}
                        >
                            <View
                                style={{
                                    flex: 0.5,
                                    flexDirection: 'column',
                                }}
                            />

                            <MoneyHeaderComponent
                                // updateCategoryResult={handleSelect}
                                navigation={navigation}
                                priceCalculateForm={filteredItems}
                            />

                            <View
                                style={{
                                    flex: 0.1,
                                    flexDirection: 'column',
                                }}
                            />

                            {/* 0.7 + 0.2*/}

                            {/* not add image but before flat List*/}
                            <View
                                style={{
                                    height: 60,
                                    // borderRadius:1000,
                                }}
                            >
                                <View
                                    style={{
                                        // flex:0.8,
                                        width: deviceWidth * 0.7,
                                        // borderRadius:1000,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <View
                                        // elevation={100}
                                        style={{
                                            backgroundColor: '#E5E5EA',
                                            // flex:0.8,
                                            width: deviceWidth * 0.7,
                                            justifyContent: 'space-around',
                                            borderRadius: deviceWidth,
                                            // height/5
                                            marginLeft: 10,
                                            flexDirection: 'row',
                                        }}
                                    >
                                        {/*until clear Search*/}
                                        <View style={{ flexDirection: 'row', flex: 0.8 }}>
                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    flex: 0.1,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Ionicons
                                                    style={DashBoardStyles.searchIcon}
                                                    name="ios-search"
                                                    size={20}
                                                    color="#ffffff"
                                                />
                                            </View>

                                            <TextInput
                                                // style={DashBoardStyles.input}
                                                style={[
                                                    DashBoardStyles.input,
                                                    {
                                                        height: 50,
                                                    },
                                                ]}
                                                placeholder="Search"
                                                ref={refSearch}
                                                onChangeText={(value) => setSearch({ value })}
                                                autoCorrect={false}
                                                textContentType={'none'}
                                                // autoCapitalize={'none'}
                                                keyboardType={'default'}
                                            />
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                flex: 0.1,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <TouchableOpacity onPress={clearSearch}>
                                                <Entypo
                                                    style={DashBoardStyles.closeIcon}
                                                    name="circle-with-cross"
                                                    size={20}
                                                    color="#000"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            width: deviceWidth * 0.3,
                                            // flex:0.3,
                                            alignItems: 'stretch',
                                            justifyContent: 'flex-end',
                                        }}
                                        onPress={handleSearchButton}
                                    >
                                        <View style={DashBoardStyles.MiddleTextViewSearch}>
                                            <Text style={DashBoardStyles.MiddleTextSearch}>
                                                Search
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* 1.4*/}

                            {/*0.8+ 0.2 = 1*/}

                            <QueryCategoriesComponent updateCategoryResult={handleSelect} />
                        </View>

                        {/*flex 3 ends */}

                        <View
                            style={{
                                height: 10,
                                // borderRadius:1000,
                            }}
                        />

                        {/*// flux :8*/}

                        <View
                            style={{
                                marginHorizontal: 0,
                                marginVertical: 0,
                                // marginTop:100,
                                // paddingTop:30,
                                flex: 5.5,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                            }}
                        >
                            <ScrollView
                                style={{
                                    marginBottom: 10,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    {filteredItems.map((oneElement, index: number) => (
                                        <ExpenseItems
                                            currentIndex={index}
                                            // navigation={props.navigation}

                                            key={index.toString()}
                                            // ImageResource

                                            property={oneElement}
                                            newItemSelected={handleEditUpdate}
                                            itemToBeDeleted={handleDeleteItem}
                                        />
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
    } else if (
        filterCategoryState === '' &&
        itemDataState != null &&
        filterByStringInputState.trim() !== ''
    ) {
        console.log('for search input and button press');
        console.log(`condition 7:
    (filterCategoryState==='')
     && (itemDataState!=null) &&
      (filterByStringInputState.trim()!=='')`);

        console.log(
            'filterByStringInputState at return method :',
            filterByStringInputState
        );
        // console.log('size____',size);
        //  console.log('serverDataState____',serverDataState);
        // console.log('arr____',arr);
        // console.log('arr____+__________________________________________________');

        const allItems = [...itemDataState];

        const filteredItems = allItems.filter((oneItem) =>
            oneItem.itemData.nameTextHalfWidth
                .toLocaleLowerCase()
                .match(filterByStringInputState.toLocaleLowerCase())
        );

        // const filteredItemsByCategoryAndInputString = filteredItemsByCategory.filter(
        //   oneItem => oneItem.itemData.nameText.toLocaleLowerCase().match(filterByStringInputState.toLocaleLowerCase())
        // );

        if (Array.isArray(filteredItems) && filteredItems.length === 0) {
            return (
                <View style={DashBoardStyles.HomePageFullViewWithStatusBar}>
                    <SafeAreaView style={DashBoardStyles.safeAreaViewcontainer}>
                        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                        <View style={DashBoardStyles.HomePageFullViewWithOutStatusBar}>
                            <View
                                style={{
                                    flex: 2.9,
                                    flexDirection: 'column',
                                }}
                            >
                                <View
                                    style={{
                                        flex: 0.5,
                                        flexDirection: 'column',
                                    }}
                                />
                                {/* 0.2 +0.9*/}

                                <MoneyHeaderComponent
                                    // updateCategoryResult={handleSelect}
                                    navigation={navigation}
                                    priceCalculateForm={filteredItems}
                                />

                                {/* 0.7 + 0.2*/}

                                {/* not add image but before flat List*/}
                                <View
                                    style={{
                                        height: 60,
                                        // borderRadius:1000,
                                    }}
                                >
                                    <View
                                        style={{
                                            // flex:0.8,
                                            width: deviceWidth * 0.7,
                                            // borderRadius:1000,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                        }}
                                    >
                                        <View
                                            // elevation={100}
                                            style={{
                                                backgroundColor: '#E5E5EA',
                                                // flex:0.8,
                                                width: deviceWidth * 0.7,
                                                justifyContent: 'space-around',
                                                borderRadius: deviceWidth,
                                                // height/5
                                                marginLeft: 10,
                                                flexDirection: 'row',
                                            }}
                                        >
                                            {/*until clear Search*/}
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    flex: 0.8,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: 'column',
                                                        flex: 0.1,
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Ionicons
                                                        style={DashBoardStyles.searchIcon}
                                                        name="ios-search"
                                                        size={20}
                                                        color="#ffffff"
                                                    />
                                                </View>

                                                <TextInput
                                                    // style={DashBoardStyles.input}
                                                    style={[
                                                        DashBoardStyles.input,
                                                        {
                                                            height: 50,
                                                        },
                                                    ]}
                                                    placeholder="Search"
                                                    ref={refSearch}
                                                    onChangeText={(value) => setSearch({ value })}
                                                    autoCorrect={false}
                                                    textContentType={'none'}
                                                    // autoCapitalize={'none'}
                                                    keyboardType={'default'}
                                                />
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    flex: 0.1,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <TouchableOpacity onPress={clearSearch}>
                                                    <Entypo
                                                        style={DashBoardStyles.closeIcon}
                                                        name="circle-with-cross"
                                                        size={20}
                                                        color="#000"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <TouchableOpacity
                                            style={{
                                                width: deviceWidth * 0.3,
                                                // flex:0.3,
                                                alignItems: 'stretch',
                                                justifyContent: 'flex-end',
                                            }}
                                            onPress={handleSearchButton}
                                        >
                                            <View style={DashBoardStyles.MiddleTextViewSearch}>
                                                <Text style={DashBoardStyles.MiddleTextSearch}>
                                                    Search
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* 1.4*/}

                                {/*0.8+ 0.2 = 1*/}

                                <QueryCategoriesComponent updateCategoryResult={handleSelect} />
                            </View>

                            {/*flex 3 ends */}

                            {/*// flux :8*/}

                            <View
                                style={{
                                    height: 10,
                                    // borderRadius:1000,
                                }}
                            />
                            <View
                                style={{
                                    marginHorizontal: 0,
                                    marginVertical: 0,
                                    flex: 5.5,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <View
                                    style={DashBoardStyles.noDataRecentForm}
                                    key={'sasas1251231234123r33Arefin'}
                                >
                                    <Text
                                        style={{
                                            // color: '#C4C805',

                                            color: '#8E8E93',
                                            // fontWeight: 'bold',
                                            backgroundColor: 'transparent',
                                            fontSize: 24,
                                            paddingBottom: 5,
                                        }}
                                    >
                                        No Search Results.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
            );
        } else {
            return (
                <View style={DashBoardStyles.HomePageFullViewWithStatusBar}>
                    <SafeAreaView style={DashBoardStyles.safeAreaViewcontainer}>
                        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                        <View style={DashBoardStyles.HomePageFullViewWithOutStatusBar}>
                            <View
                                style={{
                                    flex: 2.9,
                                    flexDirection: 'column',
                                }}
                            >
                                <View
                                    style={{
                                        flex: 0.5,
                                        flexDirection: 'column',
                                    }}
                                />
                                {/* 0.2 +0.9*/}

                                <MoneyHeaderComponent
                                    // updateCategoryResult={handleSelect}
                                    navigation={navigation}
                                    priceCalculateForm={filteredItems}
                                />

                                {/* 0.7 + 0.2*/}

                                {/* not add image but before flat List*/}
                                <View
                                    style={{
                                        height: 60,
                                        // borderRadius:1000,
                                    }}
                                >
                                    <View
                                        style={{
                                            // flex:0.8,
                                            width: deviceWidth * 0.7,
                                            // borderRadius:1000,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                        }}
                                    >
                                        <View
                                            // elevation={100}
                                            style={{
                                                backgroundColor: '#E5E5EA',
                                                // flex:0.8,
                                                width: deviceWidth * 0.7,
                                                justifyContent: 'space-around',
                                                borderRadius: deviceWidth,
                                                // height/5
                                                marginLeft: 10,
                                                flexDirection: 'row',
                                            }}
                                        >
                                            {/*until clear Search*/}
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    flex: 0.8,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: 'column',
                                                        flex: 0.1,
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Ionicons
                                                        style={DashBoardStyles.searchIcon}
                                                        name="ios-search"
                                                        size={20}
                                                        color="#ffffff"
                                                    />
                                                </View>

                                                <TextInput
                                                    // style={DashBoardStyles.input}
                                                    style={[
                                                        DashBoardStyles.input,
                                                        {
                                                            height: 50,
                                                        },
                                                    ]}
                                                    placeholder="Search"
                                                    ref={refSearch}
                                                    onChangeText={(value) => setSearch({ value })}
                                                    autoCorrect={false}
                                                    textContentType={'none'}
                                                    // autoCapitalize={'none'}
                                                    keyboardType={'default'}
                                                />
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    flex: 0.1,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <TouchableOpacity onPress={clearSearch}>
                                                    <Entypo
                                                        style={DashBoardStyles.closeIcon}
                                                        name="circle-with-cross"
                                                        size={20}
                                                        color="#000"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <TouchableOpacity
                                            style={{
                                                width: deviceWidth * 0.3,
                                                // flex:0.3,
                                                alignItems: 'stretch',
                                                justifyContent: 'flex-end',
                                            }}
                                            onPress={handleSearchButton}
                                        >
                                            <View style={DashBoardStyles.MiddleTextViewSearch}>
                                                <Text style={DashBoardStyles.MiddleTextSearch}>
                                                    Search
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* 1.4*/}

                                {/*0.8+ 0.2 = 1*/}

                                <QueryCategoriesComponent updateCategoryResult={handleSelect} />
                            </View>

                            {/*flex 3 ends */}

                            {/*// flux :8*/}

                            <View
                                style={{
                                    height: 10,
                                    // borderRadius:1000,
                                }}
                            />
                            <View
                                style={{
                                    marginHorizontal: 0,
                                    marginVertical: 0,
                                    flex: 5.5,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <ScrollView
                                    style={{
                                        marginBottom: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        {filteredItems.map((oneElement, index: number) => (
                                            <ExpenseItems
                                                currentIndex={index}
                                                // navigation={props.navigation}

                                                key={index.toString()}
                                                property={oneElement}
                                                newItemSelected={handleEditUpdate}
                                                itemToBeDeleted={handleDeleteItem}
                                            />
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
            );
        }
    } else if (
        filterCategoryState !== '' &&
        itemDataState != null &&
        filterByStringInputState.trim() !== ''
    ) {
        console.log(
            'for search input with and button press inside categry wise filtering'
        );
        console.log(`condition 8:
    (filterCategoryState!=='')
     && (itemDataState!=null) &&
      (filterByStringInputState.trim()!=='')`);

        console.log('filterCategoryState: ', filterCategoryState);
        console.log(
            'filterByStringInputState.trim(): ',
            filterByStringInputState.trim()
        );

        const allItems = [...itemDataState];

        const filteredItemsByCategory = allItems.filter((oneItem) =>
            oneItem.itemData.categoryText
                .toLocaleLowerCase()
                .match(filterCategoryState.toLocaleLowerCase())
        );
        // ===
        // filterCategoryState.toLocaleLowerCase());

        // console.log('filterByStringInputState at return method :',filterByStringInputState);
        // console.log('size____',size);
        //  console.log('serverDataState____',serverDataState);
        // console.log('arr____',arr);
        // console.log('arr____+__________________________________________________');

        // const allItems = [...itemDataState];

        const filteredItemsByCategoryAndInputString = filteredItemsByCategory.filter(
            (oneItem) =>
                oneItem.itemData.nameTextHalfWidth
                    .toLocaleLowerCase()
                    .match(filterByStringInputState.toLocaleLowerCase())
        );

        if (
            Array.isArray(filteredItemsByCategoryAndInputString) &&
            filteredItemsByCategoryAndInputString.length === 0
        ) {
            return (
                <View style={DashBoardStyles.HomePageFullViewWithStatusBar}>
                    <SafeAreaView style={DashBoardStyles.safeAreaViewcontainer}>
                        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                        <View style={DashBoardStyles.HomePageFullViewWithOutStatusBar}>
                            <View
                                style={{
                                    flex: 2.9,
                                    flexDirection: 'column',
                                }}
                            >
                                <View
                                    style={{
                                        flex: 0.5,
                                        flexDirection: 'column',
                                    }}
                                />
                                {/* 0.2 +0.9*/}

                                <MoneyHeaderComponent
                                    // updateCategoryResult={handleSelect}
                                    navigation={navigation}
                                    priceCalculateForm={filteredItemsByCategoryAndInputString}
                                />

                                {/* 0.7 + 0.2*/}

                                {/* not add image but before flat List*/}
                                <View
                                    style={{
                                        height: 60,
                                        // borderRadius:1000,
                                    }}
                                >
                                    <View
                                        style={{
                                            // flex:0.8,
                                            width: deviceWidth * 0.7,
                                            // borderRadius:1000,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                        }}
                                    >
                                        <View
                                            // elevation={100}
                                            style={{
                                                backgroundColor: '#E5E5EA',
                                                // flex:0.8,
                                                width: deviceWidth * 0.7,
                                                justifyContent: 'space-around',
                                                borderRadius: deviceWidth,
                                                // height/5
                                                marginLeft: 10,
                                                flexDirection: 'row',
                                            }}
                                        >
                                            {/*until clear Search*/}
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    flex: 0.8,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: 'column',
                                                        flex: 0.1,
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Ionicons
                                                        style={DashBoardStyles.searchIcon}
                                                        name="ios-search"
                                                        size={20}
                                                        color="#ffffff"
                                                    />
                                                </View>

                                                <TextInput
                                                    // style={DashBoardStyles.input}
                                                    style={[
                                                        DashBoardStyles.input,
                                                        {
                                                            height: 50,
                                                        },
                                                    ]}
                                                    placeholder="Search"
                                                    ref={refSearch}
                                                    onChangeText={(value) => setSearch({ value })}
                                                    autoCorrect={false}
                                                    textContentType={'none'}
                                                    // autoCapitalize={'none'}
                                                    keyboardType={'default'}
                                                />
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    flex: 0.1,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <TouchableOpacity onPress={clearSearch}>
                                                    <Entypo
                                                        style={DashBoardStyles.closeIcon}
                                                        name="circle-with-cross"
                                                        size={20}
                                                        color="#000"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <TouchableOpacity
                                            style={{
                                                width: deviceWidth * 0.3,
                                                // flex:0.3,
                                                alignItems: 'stretch',
                                                justifyContent: 'flex-end',
                                            }}
                                            onPress={handleSearchButton}
                                        >
                                            <View style={DashBoardStyles.MiddleTextViewSearch}>
                                                <Text style={DashBoardStyles.MiddleTextSearch}>
                                                    Search
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* 1.4*/}

                                {/*0.8+ 0.2 = 1*/}

                                <QueryCategoriesComponent updateCategoryResult={handleSelect} />
                            </View>

                            {/*flex 3 ends */}

                            {/*// flux :8*/}

                            <TouchableWithoutFeedback
                                onPress={() => {
                                    Keyboard.dismiss();

                                    console.log('keyboard dismissed');
                                }}
                            >
                                <View
                                    style={{
                                        marginHorizontal: 0,
                                        marginVertical: 0,
                                        flex: 6,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <View
                                        style={DashBoardStyles.noDataRecentForm}
                                        key={'sasas1251231234123r33Arefin'}
                                    >
                                        <Text
                                            style={{
                                                // color: '#C4C805',

                                                color: '#8E8E93',
                                                // fontWeight: 'bold',
                                                backgroundColor: 'transparent',
                                                fontSize: 24,
                                                paddingBottom: 5,
                                            }}
                                        >
                                            No Search Results.
                                        </Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </SafeAreaView>
                </View>
            );
        } else {
            return (
                <View style={DashBoardStyles.HomePageFullViewWithStatusBar}>
                    <SafeAreaView style={DashBoardStyles.safeAreaViewcontainer}>
                        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                        <View style={DashBoardStyles.HomePageFullViewWithOutStatusBar}>
                            <View
                                style={{
                                    flex: 2.9,
                                    flexDirection: 'column',
                                }}
                            >
                                <View
                                    style={{
                                        flex: 0.5,
                                        flexDirection: 'column',
                                    }}
                                />
                                {/* 0.2 +0.9*/}

                                <MoneyHeaderComponent
                                    // updateCategoryResult={handleSelect}
                                    navigation={navigation}
                                    priceCalculateForm={filteredItemsByCategoryAndInputString}
                                />
                                <View
                                    style={{
                                        flex: 0.1,
                                        flexDirection: 'column',
                                    }}
                                />

                                {/* 0.7 + 0.2*/}

                                {/* not add image but before flat List*/}
                                <View
                                    style={{
                                        height: 60,
                                        // borderRadius:1000,
                                    }}
                                >
                                    <View
                                        style={{
                                            // flex:0.8,
                                            width: deviceWidth * 0.7,
                                            // borderRadius:1000,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                        }}
                                    >
                                        <View
                                            // elevation={100}
                                            style={{
                                                backgroundColor: '#E5E5EA',
                                                // flex:0.8,
                                                width: deviceWidth * 0.7,
                                                justifyContent: 'space-around',
                                                borderRadius: deviceWidth,
                                                // height/5
                                                marginLeft: 10,
                                                flexDirection: 'row',
                                            }}
                                        >
                                            {/*until clear Search*/}
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    flex: 0.8,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: 'column',
                                                        flex: 0.1,
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Ionicons
                                                        style={DashBoardStyles.searchIcon}
                                                        name="ios-search"
                                                        size={20}
                                                        color="#ffffff"
                                                    />
                                                </View>

                                                <TextInput
                                                    // style={DashBoardStyles.input}
                                                    style={[
                                                        DashBoardStyles.input,
                                                        {
                                                            height: 50,
                                                        },
                                                    ]}
                                                    placeholder="Search"
                                                    ref={refSearch}
                                                    onChangeText={(value) => setSearch({ value })}
                                                    autoCorrect={false}
                                                    textContentType={'none'}
                                                    // autoCapitalize={'none'}
                                                    keyboardType={'default'}
                                                />
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    flex: 0.1,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <TouchableOpacity onPress={clearSearch}>
                                                    <Entypo
                                                        style={DashBoardStyles.closeIcon}
                                                        name="circle-with-cross"
                                                        size={20}
                                                        color="#000"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <TouchableOpacity
                                            style={{
                                                width: deviceWidth * 0.3,
                                                // flex:0.3,
                                                alignItems: 'stretch',
                                                justifyContent: 'flex-end',
                                            }}
                                            onPress={handleSearchButton}
                                        >
                                            <View style={DashBoardStyles.MiddleTextViewSearch}>
                                                <Text style={DashBoardStyles.MiddleTextSearch}>
                                                    Search
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* 1.4*/}

                                {/*0.8+ 0.2 = 1*/}

                                <QueryCategoriesComponent updateCategoryResult={handleSelect} />
                            </View>

                            {/*flex 3 ends */}

                            {/*// flux :8*/}
                            <View
                                style={{
                                    height: 10,
                                    // borderRadius:1000,
                                }}
                            />

                            <View
                                style={{
                                    marginHorizontal: 0,
                                    marginVertical: 0,
                                    flex: 5.5,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <ScrollView
                                    style={{
                                        marginBottom: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        {filteredItemsByCategoryAndInputString.map(
                                            (oneElement, index: number) => (
                                                <ExpenseItems
                                                    currentIndex={index}
                                                    // navigation={props.navigation}

                                                    key={index.toString()}
                                                    property={oneElement}
                                                    newItemSelected={handleEditUpdate}
                                                    itemToBeDeleted={handleDeleteItem}
                                                />
                                            )
                                        )}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
            );
        }
    } else {
        console.log(
            'condition final (9/10), else, default, no searchString  and Category'
        );

        // console.log('size____',size);
        //  console.log('serverDataState____',serverDataState);
        // console.log('arr____',arr);
        // console.log('arr____+__________________________________________________');

        const allItems = [...itemDataState];

        // const filteredItems = allItems.filter(oneItem => oneItem.itemData.categoryText.toLocaleLowerCase() ===
        //   filterCategoryState.toLocaleLowerCase());
        return (
            <View style={DashBoardStyles.HomePageFullViewWithStatusBar}>
                <SafeAreaView style={DashBoardStyles.safeAreaViewcontainer}>
                    <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                    <View style={DashBoardStyles.HomePageFullViewWithOutStatusBar}>
                        <View
                            style={{
                                flex: 2.9,
                                flexDirection: 'column',
                            }}
                        >
                            <View
                                style={{
                                    flex: 0.5,
                                    flexDirection: 'column',
                                }}
                            />
                            {/* 0.2 +0.9*/}

                            <MoneyHeaderComponent
                                // updateCategoryResult={handleSelect}
                                navigation={navigation}
                                priceCalculateForm={allItems}
                            />

                            <View
                                style={{
                                    flex: 0.1,
                                    flexDirection: 'column',
                                }}
                            />

                            {/* 0.7 + 0.2*/}
                            {/* not add image but before flat List*/}
                            <View
                                style={{
                                    height: 60,
                                    // borderRadius:1000,
                                }}
                            >
                                <View
                                    style={{
                                        // flex:0.8,
                                        width: deviceWidth * 0.7,
                                        // borderRadius:1000,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <View
                                        // elevation={100}
                                        style={{
                                            backgroundColor: '#E5E5EA',
                                            // flex:0.8,
                                            width: deviceWidth * 0.7,
                                            justifyContent: 'space-around',
                                            borderRadius: deviceWidth,
                                            // height/5
                                            marginLeft: 10,
                                            flexDirection: 'row',
                                        }}
                                    >
                                        {/*until clear Search*/}
                                        <View style={{ flexDirection: 'row', flex: 0.8 }}>
                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    flex: 0.1,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Ionicons
                                                    style={DashBoardStyles.searchIcon}
                                                    name="ios-search"
                                                    size={20}
                                                    color="#ffffff"
                                                />
                                            </View>

                                            <TextInput
                                                // style={DashBoardStyles.input}
                                                style={[
                                                    DashBoardStyles.input,
                                                    {
                                                        height: 50,
                                                    },
                                                ]}
                                                placeholder="Search"
                                                ref={refSearch}
                                                onChangeText={(value) => setSearch({ value })}
                                                autoCorrect={false}
                                                textContentType={'none'}
                                                // autoCapitalize={'none'}
                                                keyboardType={'default'}
                                            />
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                flex: 0.1,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <TouchableOpacity onPress={clearSearch}>
                                                <Entypo
                                                    style={DashBoardStyles.closeIcon}
                                                    name="circle-with-cross"
                                                    size={20}
                                                    color="#000"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            width: deviceWidth * 0.3,
                                            // flex:0.3,
                                            alignItems: 'stretch',
                                            justifyContent: 'flex-end',
                                        }}
                                        onPress={handleSearchButton}
                                    >
                                        <View style={DashBoardStyles.MiddleTextViewSearch}>
                                            <Text style={DashBoardStyles.MiddleTextSearch}>
                                                Search
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* 1.4*/}

                            {/*0.8+ 0.2 = 1*/}

                            <QueryCategoriesComponent updateCategoryResult={handleSelect} />
                        </View>

                        {/*flex 3 ends */}

                        {/*// flux :8*/}

                        <View
                            style={{
                                height: 10,
                                // borderRadius:1000,
                            }}
                        />

                        <View
                            style={{
                                marginHorizontal: 0,
                                marginVertical: 0,
                                flex: 5.5,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                            }}
                        >
                            <ScrollView
                                style={{
                                    marginBottom: 10,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    {itemDataState.map((oneElement, index: number) => (
                                        <ExpenseItems
                                            currentIndex={index}
                                            // navigation={props.navigation}

                                            key={index.toString()}
                                            property={oneElement}
                                            newItemSelected={handleEditUpdate}
                                            itemToBeDeleted={handleDeleteItem}
                                        />
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
};

const DashBoardStyles = StyleSheet.create({
    HomePageFullViewWithStatusBar: {
        flex: 10,
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignContent: 'center',
        backgroundColor: '#ffffff',
    },
    safeAreaViewcontainer: {
        flex: 10,
        flexDirection: 'column',
    },
    HomePageFullViewWithOutStatusBar: {
        flex: 10,
        flexDirection: 'column',
    },

    TextViewStyle: {
        flexDirection: 'column',
        marginLeft: 20,
        flex: 1,
    },
    textInputStyle: {
        color: '#aac',
    },

    pageBottomView: {
        flex: 0.5,
        flexDirection: 'row',
        // width:'110%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    container01_for_login_only: {
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },

    noDataRecentForm: {
        flex: 1,
        textAlign: 'center',
        flexDirection: 'column',
        textAlignVertical: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    separator: {
        marginVertical: 8,
        borderTopColor: '#737373',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        color: '#C4C805',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        fontSize: 20,
    },

    MiddleTextSearch: {
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        fontSize: 20,
        textAlign: 'center',
        color: '#8E8E93',
    },
    MiddleText: {
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        fontSize: 20,
        textAlign: 'center',
    },

    MiddleTextViewSearch: {
        flex: 1,
        justifyContent: 'center',
    },
    MiddleTextView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    KeyboardHideViewTest: {
        flex: 4,
        flexDirection: 'column',
    },
    InputContainer: {
        flex: 1.5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'center',
        marginLeft: 10,
    },

    ForgetPasswordView: {
        flex: 2,
    },
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        paddingRight: 5,
    },
    closeIcon: {
        paddingRight: 5,
    },
    input: {
        flex: 0.6,
        // backgroundColor:'#c0c0c0',
        backgroundColor: '#E5E5EA',
        // silver (#c0c0c0)
        paddingLeft: 0,
        color: '#ffffff',
        fontWeight: 'normal',
        fontSize: 16,
    },
});

export default DashBoardHome;
