import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStarted from './GetStarted';
import Signin from './Signin';
import Signup from './Signup'
import Home from './Home';
import ItemsCategory from './ItemsCategory';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ItemDetail from './ItemDetail';
import Cart from './Cart';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Orders from './Orders';
import { createSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabScreens (){
  const data  = useSelector(state => state)
  const cartItems = data.length
  
return(
  
  <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
  <Tab.Screen name="Home" component={Home}
  options={{
    tabBarLabel: ({ focused }) => (
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>Home</Text>
    ),
    tabBarIcon:({size,color,focused})=>(
      <Icon name  = "home" size={40}color={focused ? '#000000' : "gray"}  />
 )
}}
/>
  <Tab.Screen name="Cart" component={Cart}
  options={{
    tabBarLabel: ({ focused }) => (
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>Cart  </Text>
      
    ),
    tabBarIcon:({size,color,focused})=>(
      <View style={{flexDirection:'row'}}>
        
        <Icon name  = "shopping-cart" size={40}color={focused ? '#000000' : "gray"}  />
        <Text style={{}}>{cartItems}</Text>
      </View>
      
 )
}}
/>
 <Tab.Screen name="Orders" component={Orders}
  options={{
    tabBarLabel: ({ focused }) => (
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>Orders</Text>
    ),
    tabBarIcon:({size,color,focused})=>(
      <Icon name  = "receipt" size={40}color={focused ? '#000000' : "gray"}  />
 )
}}
/> 

</Tab.Navigator>

)
}

export default function NavigationWrapper() {
  
  return(

  
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: '#000000', },  // Set the background color of the navigation bar
        headerTintColor: "#ffffff",                   // Set the text color of the navigation bar
      }}>
        <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }}/>
        <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={TabScreens} options={{ headerShown: false }} />
        <Stack.Screen name="ItemCategory" component={ItemsCategory} options={{ headerShown: false }} />
        <Stack.Screen name="ItemDetail" component={ItemDetail} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
        <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  tabLabel: {
    color:'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabLabelFocused: {
    color: '#000000', // Customize the color when the tab is focused
  },
});

