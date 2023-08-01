import { StyleSheet, Text, View } from 'react-native';
import NavigationWrapper from './NavigationWrapper'
import { Provider } from 'react-redux';
import { Mystore } from './ReduxFiles/MyStore';
export default function App() {

  return (
    <Provider store={Mystore}>
    <NavigationWrapper/>
    </Provider>

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

