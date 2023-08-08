import { View,ActivityIndicator, Modal,Text ,StyleSheet,ImageBackground,TextInput,ScrollView,TouchableOpacity,FlatList,Image} from 'react-native'
import React ,{useState,useEffect}from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { RemoveItemFromCart } from './ReduxFiles/Action';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {

  const isFocused = useIsFocused()
  const item =useSelector(state => state)
 
  const dispatch = useDispatch()
  const  navigation = useNavigation()

  const[DeliveryCharges,setDeliveryCharges] = useState(150)
  const deleteRecord=(item)=>{
    
    dispatch(RemoveItemFromCart(item.key))
    
  }
  const[totalAmount,setTotalAmount] = useState()
  const[grandTotal,setGrandTotal] = useState()
  const[displayQuestionMark,setDisplayQuestionMark] = useState(false)

  
  let total = 0
  const TotalAmount =()=>{
     
    item.forEach((item)=>{
      total = item.TotalPrice + total
      
    })
    
    setTotalAmount(total)
    
  }
  const grand=()=>{
    setGrandTotal(totalAmount+DeliveryCharges)
  }
  // useEffect(()=>{
    
  //   TotalAmount()
  // },[])
  useEffect(()=>{
    grand()
    TotalAmount()
    
    if (item.length === 0)
    {
      
      setDisplayQuestionMark(true)
    }
    else{
      setDisplayQuestionMark(false)
    }
    if(displayQuestionMark === true){
      
    setGrandTotal(0)
    setDeliveryCharges(0)
    
    }
    else{
     
      // setDisplayQuestionMark(false)
      setDeliveryCharges(150)
    }
  })
  const handleCheckOut =()=>{
   
    navigation.navigate('Orders',{item})
    

    
  }
  return (
    
    <SafeAreaView  style={styles.container}>
      
      <View style={{flexDirection:'row',justifyContent:'center',borderBottomWidth:1}}>
      <Icon name="shopping-cart" size={90} color="black" />
      <Text style={{fontSize:80,color:"black"}}>CART</Text>
      </View>
     {displayQuestionMark ?
      <View style={{alignSelf:'center',alignItems:'center',margin:20}}>
        <Icon name="report" size={120} color="red" />
        <Text style={{fontSize:50,fontWeight:'bold',margin:20}}>Cart is Empty</Text>
        </View>
        :
     <FlatList
          data={item}
          style={{flex:0.5,borderBottomWidth:1,borderTopWidth:1}}
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
          }
      <View style={{flex:0.3,borderTopWidth:1}}>
        <View style={{flexDirection:'row',alignItems: 'flex-start', justifyContent: 'space-between'}}>
        <Text style={{fontSize:25,marginLeft:10}}>Amount </Text>
        <Text style={{fontSize:25,marginRight:10}}>+{totalAmount}</Text>
        </View>
      
        <View style={{flexDirection:'row',alignItems: 'flex-start', justifyContent: 'space-between'}}>
        <Text style={{fontSize:20,marginLeft:10}}>Delievery Charges</Text>
        <Text style={{fontSize:25,marginRight:10}}>+{DeliveryCharges}</Text>
      </View>

      <View style={{flexDirection:'row',alignItems: 'flex-start', justifyContent: 'space-between',marginTop:10,borderBottomWidth:1,borderTopWidth:1}}>
        <Text style={{fontSize:35,marginLeft:10}}>Total Amount</Text>
        <Text style={{fontSize:35,fontWeight:'bold',marginRight:10}}>{grandTotal}</Text>
      </View>
    </View>
    {displayQuestionMark ?
    null:<View style={{flex:0.2,alignItems:'center'}}>
    <TouchableOpacity style={styles.button} onPress={handleCheckOut}><Text style={{fontSize:22,color:'#ffffff'}}>Checkout</Text></TouchableOpacity>

    </View>
    
  }
    

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

    },
    button:{
    
      width:"90%",
      height:50,
      borderWidth:0.7,
      marginTop:10,
      alignItems:'center',
      borderRadius:10,
      backgroundColor:'#000000',
      padding:10
      
  }
  });
  