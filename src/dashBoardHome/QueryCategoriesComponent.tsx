import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import {useFocusEffect} from 'react-navigation-hooks';
// import { useIsFocused } from '@react-navigation/native';

import {useFocusEffect} from '@react-navigation/native';

// currentIndex={index}
// key={index.toString()}
// newBrandSelected={newBrand}
// isActive = {index===newIndexState}

export interface Props {
  // currentIndex:number,
  // newBrandSelected:(event: React.MouseEvent<HTMLButtonElement>) => void

  updateCategoryResult: (id: Number, title: String) => void;

  // newBrandSelected:(event: React.MouseEvent<HTMLButtonElement>) => void
  // isActive:boolean,
  // newItemSelected:functions
}

const QueryCategoriesComponent: React.FC<Props> = props => {
  const [loadingState, setLoadingState] = useState(true);
  const [emptyItemState, setEmptyItemState] = useState(false);

  const [queryOptionsState, setQueryOptionsState] = useState(
    new Array<{
      title: string;
      index: number;
      bgcolor: string;
    }>(),
  );

  const [selectedState, setSelectedState] = React.useState(1);
  const [errorState, setErrorState] = useState(false);

  // const isFocused = useIsFocused();
  console.log('props:', props);

  /*
    const LoadCategoryData = useCallback( () => {

      console.log('at LoadCategoryData: ','||||||||||||||||||||||||||');

      console.log('at changeHeaderTitle: ');

      const categoriesSet = new Set()
      let index = 0;
      const CategoriesObjectTemp:any[] = [];
      CategoriesObjectTemp.push({
        title:'All',
        index:++index,
        bgcolor:'#FFFFFF',
      })
      const user = auth().currentUser;
      if (user !== null){
        const myUserEmail = user.email
        let userCategoriesRef = firestore().collection('items').where('user', '==',
          myUserEmail).orderBy("date", 'desc');
        let query = userCategoriesRef.get()
          .then(snapshot => {
            if (snapshot.empty) {
              console.log('No matching documents.');
              console.log('CategoriesObjectTemp____________|||||||||||||||||||||||||||||||||||||||||||: ',CategoriesObjectTemp);

              setQueryOptionsState(CategoriesObjectTemp);

              setEmptyItemState(true);
              // setLoadingState(false);

              return;
            }
            // else
            snapshot.forEach(doc => {
              const oneItemData = doc.data();

              if((oneItemData && oneItemData.itemData && oneItemData.itemData.categoryText !== null)&&
                (
                  oneItemData && oneItemData.itemData && oneItemData.itemData.categoryText !== ""
                )){
                // console.log("at here: __________________________________________",
                //   oneItemData.itemData.categoryText);
                categoriesSet.add(oneItemData.itemData.categoryText);
              };
            });
            for (let item of categoriesSet){
              // console.log('item________________________: ',item);
              CategoriesObjectTemp.push({
                title:item,
                index:++index,
                bgcolor:'#FFFFFF',
              })
              console.log('CategoryItem: ',item);
            }
            setQueryOptionsState(CategoriesObjectTemp);
          })
          .catch(err => {
            console.log('Error getting documents in QueryCategories AssetLIsts Tab:', err);
            setErrorState(true);
          });
      }else{
        console.log('not logged in, in query Categories Asset List Component');
      }

    },[]);



    useFocusEffect(
      (LoadCategoryData)
    );



    const updateCategoryResult =(id:Number,title:String)=>{

      props.updateCategoryResult(id,title);
    };

    useEffect(() => {

      // navigation.setParams({ otherParam: 'Updated!' })
      console.log('at changeHeaderTitle: ');
      // navigation.setParams({ otherParam: 'Updated!' })
      // const documentId = navigation.getParam('documentId', 0);

      // let mySet = new Set()
      const categoriesSet = new Set()
      let index=0;
      const CategoriesObjectTemp:any[]=[];
      CategoriesObjectTemp.push({
          title:'All',
          index:++index,
          bgcolor:'#FFFFFF',
      })

      const user = auth().currentUser
      if (user !== null){
        const myUserEmail = user.email;
      let userCategoriesRef = firestore().collection('items').where('user', '==',
        myUserEmail).orderBy("date", 'desc');
      let query = userCategoriesRef.get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents in QueryCategoriesComponent');
            console.log('CategoriesObjectTemp____________|||||||||||||||||||||||||||||||||||||||||||: ',CategoriesObjectTemp);

            setQueryOptionsState(CategoriesObjectTemp);

            setEmptyItemState(true);
            setLoadingState(false);

            return;
          }
          snapshot.forEach(doc => {
            const oneItemData = doc.data();

            if((oneItemData && oneItemData.itemData && oneItemData.itemData.categoryText !==null)&&
              (
                oneItemData && oneItemData.itemData && oneItemData.itemData.categoryText !==""
              )){
              console.log("at here: __________________________________________",oneItemData.itemData.categoryText);
              categoriesSet.add(oneItemData.itemData.categoryText);
            };
          });
          for (let item of categoriesSet){
            console.log('item________________________: ',item);
            CategoriesObjectTemp.push({
              title:item,
              index:++index,
              bgcolor:'#FFFFFF',
            })
            console.log('item: ',item);
          }
          setQueryOptionsState(CategoriesObjectTemp);
        })
        .catch(err => {
          console.log('Error getting documents', err);
          setErrorState(true);
        });
      }else{
        console.log('not logged in / user not found in QueryCategories Component')
      }


    }, []);

    */

  const Item = ({
    id,
    title,
    selectedState,
    onSelect,
    bgColor,
    lengthCategories,
  }) => {
    // console.log('selectedState: ',selectedState);
    // console.log('lengthCategories: ',lengthCategories);
    return (
      <TouchableOpacity
        onPress={() => onSelect(id, title)}
        style={[
          QueryCategoriesComponentStyles.item,
          {backgroundColor: selectedState === id ? '#8E8E93' : '#ffffff'},

          {
            flexDirection: 'row',
            borderColor: '#8E8E93',
            borderWidth: StyleSheet.hairlineWidth,
            width:
              lengthCategories >= 3
                ? Dimensions.get('window').width / 3
                : lengthCategories === 2
                ? Dimensions.get('window').width / 2
                : Dimensions.get('window').width,
          },
        ]}>
        <View style={QueryCategoriesComponentStyles.MiddleTextViewScrollAble}>
          {/*<Text style={QueryCategoriesComponentStyles.MiddleText}>E-mail</Text>*/}

          <Text style={{color: selectedState === id ? '#ffffff' : '#8E8E93'}}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  {
    /*<WebView source={{ uri: 'https://facebook.github.io/react-native/' }} />*/
  }

  const onSelect = React.useCallback(
    (id, title) => {
      // console.log("id: ",id);
      // console.log("title: ",title);
      // props.newBrandSelected(indexValue);
      props.updateCategoryResult(id, title);
      // updateCategoryResult(id,title);

      //let tempqueryOptionsState = queryOptionsState;
      // tempqueryOptionsState[id].bgcolor='#ca00fc';
      // tempqueryOptionsState[id].bgcolor='#00DFFF';

      setSelectedState(id);
      // setQueryOptionsState(tempqueryOptionsState);
    },
    [props.updateCategoryResult],
  );
  // console.log('queryOptionsState_________________________bfore return: ',queryOptionsState);

  return (
    <View
      style={{
        height: 40,
        margin: 10,
        borderColor: '#8E8E93',
        borderWidth: StyleSheet.hairlineWidth,
      }}>
      <FlatList
        horizontal={true}
        data={queryOptionsState}
        renderItem={({item}) => (
          // onPress={ navigation.navigate('CheckFBase')}
          <Item
            bgColor={item.bgcolor}
            title={item.title}
            id={item.index}
            selectedState={selectedState}
            onSelect={onSelect}
            lengthCategories={queryOptionsState.length}
          />
        )}
        extraData={queryOptionsState}
        keyExtractor={item => item.index.toString()}
      />
    </View>
  );
};

// const withTernary = ({
//                        conditionA, conditionB
//                      }) => (
//   console.log("conditionA: ",conditionA),
//     console.log("conditionB: ",conditionB),
//     (!conditionA)
//       ? valueC
//       : (conditionB>100)
//       ? valueA
//       : (valueB>1000)
//         ?2000
//         :1
// );

const QueryCategoriesComponentStyles = StyleSheet.create({
  item: {
    // width:Dimensions.get('window').width/3,
  },
  MiddleTextViewScrollAble: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
});
export default QueryCategoriesComponent;
