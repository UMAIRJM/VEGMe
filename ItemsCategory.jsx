import { View, Modal,Text ,StyleSheet,ImageBackground,TextInput,ScrollView,TouchableOpacity,FlatList,Image} from 'react-native'
import React ,{useState,useEffect}from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import  app from './firebase'
import {getDatabase , ref, onValue} from 'firebase/database'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ItemsCategory = ({route}) => {
  const navigation = useNavigation();
    const { itemName } = route.params;
    const[itemList,setItemList] = useState([])
    const[searchedText,setSearchedText] = useState()
    useEffect (()=>{
        const db = getDatabase(app);
        const dbRef = ref(db,itemName);
        console.log('Receiving data');
        onValue(dbRef,(snapshot)=>{
          let data = snapshot.val();
          setItemList(data)
          console.log('Received')
        })
      },[])
      const handleSearch=(text)=>{
        setSearchedText(text)
        
      }
      handleFlatListOnPress=(item)=>{
        console.log(item.key)
        navigation.navigate(
          'ItemDetail',
          {key:item.key, ItemImage : item.Image,ItemTitle:item.title,ItemPrice:item.Price,ItemDescription:item.Description,ItemAvailable:item.AvailableQTY,Category:itemName})
      }
  return (
    <SafeAreaView style={{flex:1,padding:0}}>
    <View style={styles.container}>
    
    <ScrollView >
        <View style={{flex:0.3,backgroundColor:'rgba(0,0,0,0)',flexDirection: 'row',}}>
          <TextInput style={styles.searchBox} placeholder='Search here' value={searchedText} onChangeText={handleSearch}></TextInput>
          <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={24} color="#ffffff" style={{marginLeft:20,marginTop:6}}/>
          </TouchableOpacity>
        </View>
        <Text style={{marginTop:10,fontSize:25,fontWeight:'bold',alignSelf:'center',marginBottom:20}}>{itemName} List</Text>
        </ScrollView>   
        <FlatList
        data={itemList}
        keyExtractor={(item) => item.key}
        renderItem={({item})=>(
            <TouchableOpacity style={styles.FlatListStyle} onPress={() =>handleFlatListOnPress(item)}>
                <View style={{height:150,width:"43%",borderWidth:0.5,borderRadius:20,borderBottomRightRadius:0,borderTopRightRadius:0,overflow: 'hidden'}}>
                <Image source={{ uri:item.Image }} style={{height:"100%",width:"100%"}}/>
                </View>
                <View style={{height:150,width:"57%",borderWidth:0.5,borderRadius:20,borderBottomLeftRadius:0,borderTopLeftRadius:0,padding:10}}>

                    <Text style={{fontWeight:'bold',fontSize:20}}>{item.title}</Text>
                    <Text style={{fontWeight:'bold',fontSize:20}}>Price per KG RS: {item.Price} </Text>
                    <Text style={{fontSize:18}}>Available QTY : {item.AvailableQTY}</Text>
                    <Text>Origins: {item.Origin}</Text>
                    <Text>{item.Description}</Text>
                </View>
                            
            </TouchableOpacity>
          

        )}
        />
        </View>
        </SafeAreaView>
    
  )
}

export default ItemsCategory


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:15
      // backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    searchBox:{
        backgroundColor:"white",
        borderWidth:1,
        width:"80%",
        marginTop:8,
        borderRadius:10,
        height:40,
        fontSize:20,
        borderBottomRightRadius:0,
        borderTopRightRadius:0,
        padding:10
    
    
      },
      searchButton:{
        marginTop:8,
        backgroundColor:'#000000',
        borderRadius:10,
        height:40,
        width:"20%",
        borderWidth:1,
        borderTopLeftRadius:0,
        borderBottomLeftRadius:0
    
      },
      FlatListStyle:{
        marginTop:10,
        flexDirection:'row',
        marginBottom:10,
        
      }
  });
