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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: '#90EE90' },  // Set the background color of the navigation bar
        headerTintColor: "black",                   // Set the text color of the navigation bar
      }}>
        <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }}/>
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ItemCategory" component={ItemsCategory} />
        <Stack.Screen name="ItemDetail" component={ItemDetail} />
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
});

