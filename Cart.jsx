import { View,ActivityIndicator, Modal,Text ,StyleSheet,ImageBackground,TextInput,ScrollView,TouchableOpacity,FlatList,Image} from 'react-native'
import React ,{useState,useEffect}from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createSelectorHook, useDispatch, useSelector } from 'react-redux';

import { RemoveItemFromCart } from './ReduxFiles/Action';
const Cart = () => {
  const item =useSelector(state => state)
  const dispatch = useDispatch()
  useEffect(()=>{
    console.log(item)
  })
  const deleteRecord=(item)=>{
    dispatch(RemoveItemFromCart(item.key))
    console.log(item.Title)
  }
  return (
    
    <SafeAreaView  style={styles.container}>
      
      <View style={{flexDirection:'row',justifyContent:'center',}}>
      <Icon name="shopping-cart" size={90} color="black" />
      <Text style={{fontSize:80,color:"black"}}>CART</Text>
      </View>
      <FlatList
          data={item}
          style={{flex:0.5}}
          keyExtractor={(item) => item.key}
          renderItem={({item})=>(
            <View style={{flexDirection:'row',padding:3,borderBottomWidth:1,marginLeft:9}} >
                          
              <Image source={{uri:item.Image}} style={{ marginLeft:10,height:70,width:70,borderRadius:10}} resizeMode="stretch"/>
              <View style={{flex:1,flexDirection:'column'}}>
                <View style={{flex:0.5,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:0.6}}>
                  <Text style={{fontWeight:'bold'}}>Title</Text>
                  <Text style={styles.TitlesStyle}>Price</Text>
                  <Text style={styles.TitlesStyle}>Quantity</Text>
                  <Text style={styles.TitlesStyle}>Total</Text>
                </View>
                <View style={{flex:0.5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={{}}>{item.Title}</Text>
                  <Text style={styles.dataStyle}>{item.Price}</Text>
                  <Text style={styles.dataStyle}>{item.Quantity} KG</Text>
                  <Text style={styles.dataStyle}>{item.TotalPrice}</Text>
                </View>

              </View>
              <TouchableOpacity  onPress={()=>deleteRecord(item)}><Icon name="close" size={18} color="black"/></TouchableOpacity>
            </View>
  
          )}
  
      />
      <View style={{backgroundColor:"brown",flex:0.5}}>
        <Text>Delievery Charges</Text>
        <Text>Total Amount</Text>
      </View>
      
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    TitlesStyle:{
      fontWeight:'bold',
      marginLeft:30

    },
    dataStyle:{
      marginLeft:30

    }
  });
  