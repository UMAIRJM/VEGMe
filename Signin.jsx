import { View, Text,ActivityIndicator ,StyleSheet, ImageBackground, TextInput,TouchableOpacity,ScrollView} from 'react-native'
import React ,{useState,useEffect}from 'react'
import {auth} from "./firebase"
import  {createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"

const Signin = ({navigation}) => {
 
  
  const[email,setEmail]=useState()
  const[password,setPassword]=useState()
  const[errorMessage,setErrorMessage]=useState()
  const[isLoading,setIsLoading] = useState(false)
  const handleChangeText1=(text) =>{
    setEmail(text)
  }
  const handleChangeText2=(text) =>{
    if(text.length<=10){
    setPassword(text)
    setErrorMessage(null)
  }
  else{
    setErrorMessage('Password cannot exceeds 10 characters')
  }
  }
  const handleSignin = async () =>{
    setIsLoading(true)
    await signInWithEmailAndPassword(auth,email,password)
    .then (()=>{
      setIsLoading(false)
      navigation.navigate('Home')

    })
    .catch((error)=>{
      const errorMessage  = error.message
      setErrorMessage(errorMessage)
      setIsLoading(false)
      

    })
  } 
  
  // useEffect(() => {
  //   console.log(email);
  // }, [email]);
  return (
    <ScrollView style={styles.container}>
      <Text style={{marginTop:80,marginBottom:30,fontSize:60,color:"black"}}>Welcome {"\n"}Back</Text>
      
      <TextInput placeholder='Enter Email' style={styles.input} value={email} onChangeText={handleChangeText1}/>
      <TextInput placeholder='Enter Password' style={styles.input} secureTextEntry={true} value={password} onChangeText={handleChangeText2}/>
      {errorMessage? <Text>{errorMessage}</Text>:null}
      <TouchableOpacity style={{marginTop:10,marginLeft:200}}><Text style={{fontSize:15}}>Forgot Password</Text></TouchableOpacity>
    {isLoading ? <ActivityIndicator size="large" color='#90EE90' />:null}
    <TouchableOpacity style={styles.button} onPress={handleSignin}><Text style={{fontSize:22}}>Sign in</Text></TouchableOpacity>
    <Text style={{marginLeft:"50%",fontSize:20}}>Or</Text>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
        <Text style={{fontSize:22}}>Sign up</Text>
        </TouchableOpacity>
    </ScrollView>
    
  )
}

export default Signin

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:35
      // backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    Background:{
        flex:1
    },
    input:{
        marginTop:30,
        height:50,
        borderColor: 'black',
        fontSize: 20,
        paddingHorizontal:10,
        borderBottomWidth:0.7
    },
    button:{
        width:"100%",
        height:50,
        borderWidth:0.7,
        marginTop:20,
        alignItems:'center',
        borderRadius:50,
        backgroundColor:'#90EE90',
        padding:10
        
    }
  });
  