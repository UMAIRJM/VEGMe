import { View,ActivityIndicator, Modal,Text ,StyleSheet,ImageBackground,TextInput,ScrollView,TouchableOpacity,FlatList,Image} from 'react-native'
import React ,{useState,useEffect}from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import  app from './firebase'
import {getDatabase , ref, onValue} from 'firebase/database'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';



const Home = () => {
  const[searchedText,setSearchedText] = useState()
  const[categories,setCategories]= useState([])
  const[mostlyOrdered,setMostlyOrdered]= useState([])
  const[name,setName] = useState()
  const[seeAll,setSeeAll] =useState(false)
  const[isLoading,setIsLoading] = useState(false)
  const navigation = useNavigation();
  const handleFlatlist1=(item)=>{
     
    setName(item.title)
      navigation.navigate('ItemCategory',{ itemName: item.title })
      setSeeAll(false)
      
  }
  const handleSearch=(text)=>{
    setSearchedText(text)
    
  }
  const handleSeeAll=()=>{
    setSeeAll(true)

  }
  const closeModal=()=>{
    setSeeAll(false)
  }
  //This useEffect is totally fetching data from our firebase realtime.
  useEffect (()=>{
    setIsLoading(true)
    const db = getDatabase(app);
    const dbRef = ref(db,'VegetableCategory');
    console.log('Receiving data');
    onValue(dbRef,(snapshot)=>{
      setIsLoading(false)
      let data = snapshot.val();
      setCategories(data)
      console.log('Received')
    })
  },[])
  useEffect (()=>{
    setIsLoading(true)
    const db = getDatabase(app);
    const dbRef = ref(db,'MostlyOrdered');
    console.log('Receiving data');
    onValue(dbRef,(snapshot)=>{
      setIsLoading(false)
      let data2 = snapshot.val();
      setMostlyOrdered(data2)
      console.log('received')
    })
  },[])
  return (
<SafeAreaView style={{flex:1}}>    
      
        <ScrollView style={styles.container}>
        <View style={{flex:0.3,backgroundColor:'rgba(0,0,0,0)',flexDirection: 'row',}}>
          <TextInput style={styles.searchBox} placeholder='Search here' value={searchedText} onChangeText={handleSearch}></TextInput>
          <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={24} color="black" style={{marginLeft:20,marginTop:6}}/>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor:'rgba(0,0,0,0)',marginTop:20,height:30,flexDirection:'row',justifyContent: 'space-between'}}>
          <Text style={{fontSize:25,fontWeight:'bold',color:"black"}}>Vegetables Categories</Text>
          <TouchableOpacity style={{textAlign:'left',marginTop:5}} onPress={handleSeeAll}><Text style={{fontSize:20,color:"black"}}>See All</Text></TouchableOpacity>
        </View>
        {isLoading? <ActivityIndicator size="large" color='#90EE90' style={styles.ActivityIndicatorStyle}/>:null}
        <Modal visible ={seeAll} transparent={true} animationType="fade"style={{backgroundColor:"white",}}>
          
          <View style={{flex:1,backgroundColor:"white",marginHorizontal:40,marginVertical:130,padding:10,borderRadius:10,borderWidth:1}}>
            <TouchableOpacity  style={{padding:5}} onPress={closeModal}>
            <Icon name="close" size={30} color="grey" style={{marginLeft:"90%"}}/>

            </TouchableOpacity>
            <Text style={{fontSize:20,fontWeight:'bold',alignSelf:'center',borderBottomWidth:1,marginBottom:10}}>Vegetable Categories</Text>
            <FlatList
        style={{marginTop:15}}
        horizontal={false}
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({item})=>(
          <TouchableOpacity style={styles.ModalflatlistView} onPress={() => handleFlatlist1(item)}>

          <Image source={{ uri:item.image }} style={{height:90,width:150,borderRadius:30}}/>
          <Text style={{fontSize:20,marginTop:10,color:"black",marginLeft:10}}>{item.title}</Text>

          </TouchableOpacity>
        )}
        />

          </View>
          
        </Modal>
        <FlatList
        style={{marginTop:15}}
        horizontal={true}
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({item})=>(
          <TouchableOpacity style={styles.flatlistView} onPress={() => handleFlatlist1(item)}>

          <Image source={{ uri:item.image }} style={{height:90,width:150,borderRadius:30,borderBottomLeftRadius:0,borderBottomRightRadius:0}}/>
          <Text style={{fontSize:20,color:"black",margin:6,alignSelf:'center'}}>{item.title}</Text>

          </TouchableOpacity>
        )}
        />
        <View style={{backgroundColor:'rgba(0,0,0,0)',marginTop:20,height:30,flexDirection:'row',justifyContent: 'space-between' }}>
          <Text style={{fontSize:25,fontWeight:'bold',color:"black",}}>Mostly  Ordered</Text>
          <TouchableOpacity style={{textAlign: 'left',marginTop:5}}><Text style={{fontSize:20,color:"black"}}>See All</Text></TouchableOpacity>
        </View>
        {isLoading? <ActivityIndicator size="large" color='#90EE90' style={styles.ActivityIndicatorStyle}/>:null}
        <FlatList
        style={{marginTop:15}}
        horizontal={true}
        data={mostlyOrdered}
        keyExtractor={(item) => item.key}
        renderItem={({item})=>(
          <TouchableOpacity style={styles.flatlistView}>
            

          <Image source={{ uri:item.image }} style={{height:90,width:150,borderRadius:30,borderBottomLeftRadius:0,borderBottomRightRadius:0}}/>
          <Text style={{fontSize:20,color:"black",alignSelf:'center',margin:6}}>{item.title}</Text>
          <Text style={{fontSize:20,color:"black",alignSelf:'center',fontWeight:'bold'}}>Price per Kg RS:{item.price}</Text>

          </TouchableOpacity>
        )}
        />
        <View style={{backgroundColor:'rgba(0,0,0,0)',marginTop:20,height:30,flexDirection:'row',justifyContent: 'space-between' }}>
          <Text style={{fontSize:25,fontWeight:'bold',color:"black",}}>Fruits you like</Text>
          <TouchableOpacity style={{textAlign: 'left',marginTop:5}}><Text style={{fontSize:20,color:"black"}}>See All</Text></TouchableOpacity>
        </View>
        </ScrollView>

      
   </SafeAreaView> 
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  Background:{
    flex:1
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
    backgroundColor:'#90EE90',
    borderRadius:10,
    height:40,
    width:"20%",
    borderWidth:1,
    borderTopLeftRadius:0,
    borderBottomLeftRadius:0

  },
  flatlistView:{
    
    padding:0,
    marginLeft:15,
    borderRadius:30,
    // backgroundColor:'#90EE90',
    backgroundColor:'rgba(0,0,0,0)',
    borderWidth:1,
    borderColor:"black"
  },
  ModalflatlistView:{
    borderWidth:1,
    marginBottom:10,
    padding:10,
    borderRadius:15

  },
  ActivityIndicatorStyle:{
    transform: [{ scale: 2 }],
    marginTop:15
  }
});
