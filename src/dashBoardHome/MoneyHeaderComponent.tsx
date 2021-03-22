import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  // Picker,
  ActivityIndicator,
  Platform,
  ActionSheetIOS,
  PermissionsAndroid,
} from 'react-native';

// import {Picker} from '@react-native-community/picker';

import {Picker} from '@react-native-picker/picker';

import {NavigationRoute} from 'react-navigation';

// import { CirclesLoader,
//   TextLoader,
//   DotsLoader,
//   LinesLoader
// } from 'react-native-indicator';

import MTI from 'react-native-vector-icons/MaterialCommunityIcons';
import helpers from '../../../../Helpers';
import {PERMISSIONS} from 'react-native-permissions';

export interface Props {
  priceCalculateForm: {
    date: Date;
    id: string;
    itemData: {
      amountNumber: Number;
      categoryText: string;
      detailText: string;
      imageURL: string;
      nameText: string;
      nameTextHalfWidth: string;
      tagText: string;
      urlText: string;
      priceText: Number;
      haveItCondition: Boolean;
    };
    uploadedBy: string;
    user: string;
    itemId: number;
  }[];
  navigation: NavigationRoute;
}

const ConversionRate = {
  'DollarToTaka': '84.89',
  'DollarToEuro': '0.92',
  'EuroToDollar':'1.08',
  'DollarToYen': '109.79',
};

const MonetaryUnits = [
  {'index':0,'name':'Dollar','unicode':'\u0024' },
  {'index':1,'name': 'Euro','unicode':'\u20AC'},
  {'index':2,'name': 'Yen','unicode':'\u00A5',},
  {'index':3,'name': 'Taka','unicode':'\u09F3',},
];
const Buttons = ['\u0024', '\u20AC', '\u00A5', '\u09F3'];

const MoneyHeaderComponent: React.FC<Props> = props => {
  const [allMonetaryUnitsStates, setAllMonetaryUnitsStates] = useState(
    MonetaryUnits,
  );
  const [selectedOneCategoryState, setSelectedOneCategoryState] = useState(
    MonetaryUnits[0].unicode,
  );

  useState(MonetaryUnits[0].unicode);
  const [priceState, setPriceState] = useState();
  const [androidState, setAndroidState] = useState(
    Platform.OS === 'android' ? true : false,
  );

  const deviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (
      Object.entries(props.priceCalculateForm).length === 0 &&
      props.priceCalculateForm.constructor === Object
    ) {
      setPriceState('_ _');
    } else {
      const reducer = (accumulator, currentValue) => {
        if (
          Number(currentValue.itemData.priceText) === undefined ||
          !Number(currentValue.itemData.priceText)
        ) {
          return accumulator + 0;
        } else {
          return accumulator + Number(currentValue.itemData.priceText);
        }
      };

      return setPriceState(
        props.priceCalculateForm.reduce(reducer, 0).toFixed(3),
      );
    }
  }, [props.priceCalculateForm]);

  const AddNewAssetItem = /*async */ ()=>{
    console.log('at Add New Asset Item: ');

    return props.navigation.navigate('AddItemModalPage');
  };


  const pricePikcerData = allMonetaryUnitsStates.map((Element, index) => {
    return (
      <Picker.Item
        key={index}
        value={Element.unicode}
        label={Element.unicode}
        // label={'\u0024'}U+00A5
      />
    );
  });

  const showActionSheet = () => {
    //var CANCEL_INDEX = 4;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: Buttons,
        //cancelButtonIndex: CANCEL_INDEX,
      },
      buttonIndex => {
        setSelectedOneCategoryState(Buttons[buttonIndex]);
      },
    );
  };

  const MoneTaryUnitX = props => {
    console.log('props.name: ', props.name);
    console.log('props.price: ', props.price);

    return (
      <View
        style={{
          flexDirection: 'row-reverse',
          height: 50,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingRight: 20,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 10,
            /*backgroundColor:'#aaffcc',*/
          }}>
          <TouchableOpacity onPress={AddNewAssetItem}>
            <MTI name="plus-circle-outline" size={40} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 10,
            marginRight: deviceWidth * 0.03,
            marginLeft: deviceWidth * 0.03,
          }}>
          {androidState ? (
            <Picker
              selectedValue={selectedOneCategoryState}
              style={{
                width: deviceWidth * 0.08,
                backgroundColor: '#FFFFFF',
              }}
              itemStyle={{
                flexDirection: 'column',
              }}
              mode={'dropdown'}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedOneCategoryState(itemValue)
              }>
              {pricePikcerData}
            </Picker>
          ) : (
            <View
              style={{
                width: deviceWidth * 0.08,
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                paddingTop: 3,
              }}>
              <TouchableOpacity onPress={showActionSheet}>
                <Text style={{fontSize: 18}}>{selectedOneCategoryState}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {props.price ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 28}}>{props.price}</Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'column',
                // flex:0.1,
                justifyContent: 'center',
              }}>
              {/*TextLoader, DotsLoader,LinesLoader*/}
              {/*<DotsLoader/>*/}
              <Text>_ _</Text>
            </View>
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            // marginLeft:deviceWidth*0.03,
            marginRight: deviceWidth * 0.03,
            alignItems: 'center',
            paddingBottom: 10,
          }}>
          <MTI name="stack-overflow" size={40} color="#8E8E93" />
        </View>
      </View>
    );
  };


  const convertedPrice =
    selectedOneCategoryState === MonetaryUnits[0].unicode
      ? Number(priceState).toFixed(3)
      : // above is dollar
      selectedOneCategoryState === MonetaryUnits[1].unicode
      ? (Number(priceState) * Number(ConversionRate.DollarToEuro)).toFixed(3)
      : // // above is Euro to dollar
      selectedOneCategoryState === MonetaryUnits[2].unicode
      ? (Number(priceState) * Number(ConversionRate.DollarToYen)).toFixed(3)
      : // above is  Yen to dollar
        (Number(priceState) * Number(ConversionRate.DollarToTaka)).toFixed(3);

  return selectedOneCategoryState === MonetaryUnits[0].unicode ? (
    <MoneTaryUnitX name={'dollar'} price={convertedPrice} />
  ) : // above is dollar
  selectedOneCategoryState === MonetaryUnits[1].unicode ? (
    <MoneTaryUnitX name={'Euro'} price={convertedPrice} />
  ) : // above is Euro to dollar
  selectedOneCategoryState === MonetaryUnits[2].unicode ? (
    <MoneTaryUnitX name={'Yen'} price={convertedPrice} />
  ) : (
    // above is  Yen to dollar
    <MoneTaryUnitX name={'Taka'} price={convertedPrice} />
  );
};



const MoneyHeaderComponentStyles = StyleSheet.create({
  MiddleTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
export default MoneyHeaderComponent;
