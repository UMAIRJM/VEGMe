import { View, Text,ActivityIndicator ,StyleSheet, ImageBackground, TextInput,TouchableOpacity,ScrollView} from 'react-native'
import React ,{useState,useEffect}from 'react'
import {auth} from "./firebase"
import  {createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"


const Signin = ({ navigation }) => {
  const[checker,setChecker] = useState(true)
  const[name,setName]=useState()
  const[email,setEmail]=useState()
  const[password,setPassword]=useState()
  const[errorMessage,setErrorMessage]=useState()
  const[confirmPassword,setConfirmPassword]=useState()
  const[isLoading,setIsLoading] = useState(false)
  const handleName=(text)=>{
    setName(text)
  }
  const handleEmail=(text)=>{
    setEmail(text)
    
  }
  const handlePassword=(text)=>{
    if(text.length<=10){
    setPassword(text)
    setErrorMessage(null)
  }else{
    setErrorMessage('Password cannot  exceed limit of 10 characters')
  }
 }
  const handleConfirmPassword=(text)=>{
    if(text.length<=10){
    setConfirmPassword(text)
    setErrorMessage(null)
  }else
  {
    setErrorMessage('Password cannot  exceed limit of 10 characters')
  }
    
  } 
  const handleSignup= async ()=>{
    if(password === confirmPassword){
      setErrorMessage(null)
      setChecker(true)

    }
    else{
      setErrorMessage('Password did not match please  try again')
      setChecker(false)
    }
     if(!password || !name || !email || !confirmPassword)
    {
      setErrorMessage('Please fill the all fields')
      setChecker(false)
    }
    if(checker === true){
      setIsLoading(true)
    await createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) =>{
      setIsLoading(false)
      navigation.navigate('Signin')

    })
    .catch((error)=>{
      setIsLoading(false)
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorMessage){
      setErrorMessage(errorMessage)
      }
    })
    
  }
  } 

  return (
   // <ImageBackground source={require('./assets/Background.jpg')} resizeMode="cover" style={styles.Background}>
    <ScrollView style={styles.container}>
      <Text style={{marginTop:80,fontSize:60,color:"black"}}>Create {"\n"}Account</Text>
      <TextInput placeholder='Your Name' style={styles.input} value={name} onChangeText={handleName}/>
      <TextInput placeholder='Your Email' style={styles.input} value={email} onChangeText={handleEmail}/>
      <TextInput placeholder='Password' secureTextEntry={true} style={styles.input} value={password} onChangeText={handlePassword}/>
     
     <TextInput placeholder='Confirm Password' secureTextEntry={true} style={styles.input} value={confirmPassword} onChangeText={handleConfirmPassword}/>
     {errorMessage? <Text style={{fontSize:20,marginTop:10,color:'#8B0000'}}>{errorMessage}</Text>:null}
    {isLoading ? <ActivityIndicator size={'large'} color='#90EE90' />:null}
    <TouchableOpacity style={styles.button} onPress={handleSignup}><Text style={{fontSize:22}}>Sign up</Text></TouchableOpacity>
   
    </ScrollView>
    // </ImageBackground>
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
        marginTop:25,
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
        marginTop:38,
        alignItems:'center',
        borderRadius:50,
        backgroundColor:'#90EE90',
        padding:10
        
    }
  });
  