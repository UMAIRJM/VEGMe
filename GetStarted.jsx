import { View, Text ,StyleSheet,SafeAreaView,ImageBackground,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import PagerView from 'react-native-pager-view';


const GetStarted = ({ navigation }) => {
    const image = {uri: 'https://legacy.reactjs.org/logo-og.png'}
  return (
    <ImageBackground source={require('./assets/vegetable2.png')} resizeMode="cover" style={styles.Background}>
    <View style={styles.container}>
      <View style={styles.View1}>
        <View style={{flex:0.18,backgroundColor:"Red",padding:10,width:"100%", backgroundColor: 'rgba(0, 0, 0, 0)',}}>
        <Image source={require('./assets/LOGO.png')} style={styles.image} />    
        </View>
        <View style={{flex:0.4,backgroundColor:"red",borderRadius:100,overflow: 'hidden',marginTop:40}}>
        <PagerView style={styles.viewPager} initialPage={0}>
        <View style={styles.page} key="1">
        <Image source={require('./assets/Vegetable1.png')} />
        </View>
        <View style={styles.page} key="2">
        <Image source={require('./assets/vegetable2.png')}/>
            
        </View>
        <View style={styles.page} key="3">
        <Image source={require('./assets/vegetable3.png')}/>
       
        </View>
        </PagerView>
        </View>
      
      </View>
      <View style={styles.View2}>
      <TouchableOpacity style={styles.Button1} onPress={() => navigation.navigate('Signin')}>
        <Text style={{fontSize:20,color:"black"}}>Get Started</Text>
      </TouchableOpacity>
      </View>
      
    </View>
    </ImageBackground>
  )
}

export default GetStarted

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding :35,
    //  backgroundColor: '#90EE90',
    //   alignItems: 'center',
    justifyContent: 'center',
    },
    Background:{
        flex:1,
        // padding:30,
        // margin:10

    },
    Button1:{
        padding:18,
        width:'100%',
        Height:80,
        backgroundColor:'#90EE90',
        marginTop:40,
        borderRadius:50,
        borderWidth:0.7,
        alignItems:'center',
        marginBottom:20
        
    },
    View1:{
        flex:0.87,
        backgroundColor:"green",
        padding:10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        
    },
    View2:{
        flex:0.2,
        backgroundColor:"red",
        backgroundColor: 'rgba(0, 0, 0, 0)',

    },
    viewPager:{
        marginLeft:0,
        width:"100%",
        flex:1,
        backgroundColor:"red",
        

    },
    image:{
        flex: 1,
        width: undefined,
        height: undefined,
     }
    
  });
  