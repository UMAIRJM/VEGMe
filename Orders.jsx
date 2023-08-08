import { View, Text,StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from './firebase';
import  app from './firebase'
import {getDatabase , ref, onValue,set,update} from 'firebase/database'
import {  useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { ClearFullState } from './ReduxFiles/Action';



const Orders = () => {
  const route = useRoute()
  const {item }=route.params
  const dispatch = useDispatch()
  const user = auth.currentUser;
  
  const  user_ID= user.uid
 
  const data = {
    [user_ID]:{
      Cart:
        [...item]
    
    }
    
  }

  useEffect(()=>{
    dispatch({ type: 'ClearAll' })
    const db = getDatabase(app)
    const dbRef = ref (db ,'PendingOrders')
    update (dbRef,data)
    
  })

  useEffect(()=>{
   
    item.forEach((item) => {
    const category = item.Category
    const quantity = item.Quantity
    const available = item.Available
    const key = item.key
    
    let array = []
    let counter 
    const db = getDatabase(app);
    const dbRef = ref(db, category);
    console.log('Receiving data');
    onValue(dbRef,  (snapshot)=>{
      let data2 = snapshot.val();
      console.log('received')
     

     data2.forEach((item)=>{
      
      if(item.key === key){
       
       item.AvailableQTY = available
     
       counter ++ 
       return
      }

     })
     array = data2
})
  const dbRef2 = ref (db ,category)
  set (dbRef2,array)
});
})
  
  return (
    <SafeAreaView style={styles.container}>
      <Text>I am orders</Text>
    </SafeAreaView>
  )
}

export default Orders
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:30,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});


