import { Alert ,View,ActivityIndicator, Modal,Text ,StyleSheet,ImageBackground,TextInput,ScrollView,TouchableOpacity,FlatList,Image} from 'react-native'
import React, {useState,useEffect}from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AddItemToCart } from './ReduxFiles/Action';
import  app from './firebase'
import {getDatabase , ref, onValue} from 'firebase/database'
import { auth } from './firebase';

const ItemDetail = ({route}) => {
    const { key,ItemImage ,ItemTitle,ItemPrice,ItemDescription,ItemAvailable,Category} = route.params;
    const Available = ItemAvailable
    const Price = ItemPrice
    const[quantity,setQuatity] = useState(0)
    const[error,setError] = useState('')
    const[computedAmount,setComputedAmount] = useState(0)
    const navigation = useNavigation()
    const[pendingOrderData,setPendingOrderData] = useState([])
    const user = auth.currentUser;
    const  user_ID= user.uid
    const [order,setOrder] = useState(false)
    const Dispatch = useDispatch()
    const data = useSelector(state => state)

    const item ={
        key: key,
        Image: ItemImage,
        Title:ItemTitle,
        Price:Price,
        TotalPrice:computedAmount,
        Quantity:quantity,
        Available:Available - quantity,
        Category: Category
    }
    const handleRemove =()=>{
        if(quantity<=0){
            setError('Quantity cannot be less than zero')
        }else{
        setQuatity(quantity-0.25)
        
        setError('')
        }

    }
    const handleAddToCart=()=>{
        if(quantity<=0){
            setError('Please increase the quantity',)
        }else{
        setError('')
        //Dispatched is used to send Data to store we created in redux react native
       
        Dispatch(AddItemToCart(item))
        const filterData = data.filter((item) => item.key === key)
        console.log(filterData)
       if(filterData.length > 0){
        const newAvailable = filterData[0].Available
        const newQuantity = filterData[0].Quantity
        if(newAvailable < quantity)
        {
            const errorMess = `Item is not added to cart.
            \n Available Quantity is ${newAvailable}.
            \n And You Already Added ${newQuantity} kg in to Cart.`;
            console.log(newAvailable)
            Alert.alert('Exceed Available',errorMess.toString(), [{ text: 'OK' }]);
            
        }
        else{
            Alert.alert('Added', 'Item is added to cart', [{ text: 'OK' }]);
    
        }
    }
    else{
        Alert.alert('Added', 'Item is added to cart', [{ text: 'OK' }]);

    }
}
}
    const handleAdd =()=>{
        if (quantity >= Available){
            setError('Quantity cannot be greater than Available')
        }
        else{
        setQuatity(quantity+0.25)
        
        setError('')
        }
    }


    useEffect(()=>{
        setComputedAmount(quantity * Price)
        
    },[quantity])
   
useEffect(()=>{
    const db = getDatabase(app);
    const dbRef = ref(db,'PendingOrders');
    console.log('Receiving data');
    onValue(dbRef,(snapshot)=>{
      
      let data = snapshot.val();
      setPendingOrderData(data)
      
      console.log('Received',pendingOrderData)
    //   if(pendingOrderData !== null && pendingOrderData.length > 0){
    //     console.log('I am null')
    //     CheckOrder()

        
    //   }
    //   else{
    //     setOrder(false)
    //   }
       
    })
},[])
useEffect(()=>{
    const extractedData = Object.keys(pendingOrderData).filter(userId => userId === user_ID);
    if (extractedData.length > 0){
        setOrder(true)
        console.log(extractedData)
    }
    else{
        console.log('I am in else')
        setOrder(false)
    }
})

    return (
    <SafeAreaView style={styles.container}>
        <View style={{flex:35}}>
            <Image source = {{uri:ItemImage}} style={{height:"100%",width:"100%"}} resizeMode="stretch"/>
        </View>
        
        <View style={{flex:65,margin:20}}>
            <Text style={{fontSize:35,fontWeight:'bold',alignSelf:'center'}}>{ItemTitle}</Text>
            <Text style={{fontSize:25,margin:5}}>Price per KG : {ItemPrice}</Text>
            <Text style={{fontSize:25,fontWeight:'bold',margin:5}}>Description :</Text>
            <Text style={{fontSize:20,alignSelf:'center',marginLeft:5}}>{ItemDescription}</Text>
            <Text style={{fontSize:25,margin:5,marginTop:10}}>Available Quantity : {ItemAvailable}</Text>
            <View style={{flexDirection:'row',marginTop:10}}>
            <View style={{marginRight:25}}><Text style={{fontSize:20,margin:5}}>Please Select Quatity {'\n'}You Want to order in KG</Text></View>
            <View style={{flexDirection:'row',}}>
                <TouchableOpacity style={{height:50,borderWidth:1,padding:5,borderRadius:10,borderBottomRightRadius:0,borderTopRightRadius:0}} onPress={handleRemove}>
                    <Icon name="remove" size={30} color="black" />
                </TouchableOpacity>
                <View style={{height:50,borderWidth:1,width:50,fontSize:30}}>
                    <Text style={{alignSelf:'center',fontSize:25,marginTop:10}}>{quantity}</Text>
                </View>
                <TouchableOpacity style={{height:50,borderWidth:1,padding:5,borderRadius:10,borderBottomLeftRadius:0,borderTopLeftRadius:0}} onPress={handleAdd}>
                    <Icon name="add" size={30} color="black" />
                </TouchableOpacity>

            </View>
            
            </View>
            {error? <Text style={{fontSize:20,color:"red",margin:5}}>{error}</Text>:null}
            <Text style={{fontSize:30,marginTop:10,margin:5}}>Price: {computedAmount} </Text>
            {order ? <Text style={{fontSize:30,color:'red'}}>You already placed order{'\n'} wait  until first order is delivered</Text>:            <TouchableOpacity style={styles.button} onPress={handleAddToCart}><Text style={{fontSize:22,color:'#ffffff'}}>Add to cart</Text></TouchableOpacity>
}

        </View>
    </SafeAreaView>
  )
}

export default ItemDetail


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:0
      // backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    button:{
    
        width:"100%",
        height:50,
        borderWidth:0.7,
        marginTop:20,
        alignItems:'center',
        borderRadius:10,
        backgroundColor:'#000000',
        padding:10
        
    }
  });