import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import My_nav from './navigation';
import { useFonts } from 'expo-font';







export default function App() {
  const [loaded] = useFonts({
    Montserrat: require('./assets/Montserrat-Regular.otf'),
  });
  
  if (!loaded) {
    return null;
  }
  return (
    <My_nav />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily:'Montserrat'
  },
});
