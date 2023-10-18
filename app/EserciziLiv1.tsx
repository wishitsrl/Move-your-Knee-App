import { Link, Stack, useRouter } from 'expo-router';
import Swiper from 'react-native-swiper/src';
import AntDesign from "@expo/vector-icons/AntDesign";
import Onboarding from 'react-native-onboarding-swiper';
import Background from '../components/UX/Background'
import { View, TouchableWithoutFeedback, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, ScrollView, StatusBar, NavigationContainer, Image } from 'react-native';
import Logo from '../components/UX/Logo';
import Button from '../components/UX/Button';
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';

export default function EserciziLiv1() {

   const { signOut, user } = useAuth();
   const router = useRouter();
   const [loaded] = useFonts({
		"roboto-flex": require('../assets/fonts/RobotoFlex.ttf'),
		"roboto-flex-regular": require('../assets/fonts/RobotoFlex-Regular.ttf'),
		"roboto-flex-variable": require('../assets/fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),		
		"ultra-black": require('../assets/fonts/ultrablackitalic.ttf'),
		"ultra-black-regular": require('../assets/fonts/UltraBlackRegular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <>
		<Stack.Screen options={{ title: 'EserciziLiv1' }} />
		<View style={styles.container}>	
			<Text style={styles.subtitle}> EserciziLiv1!</Text>
		</View>
    </>
  );
}

const styles = StyleSheet.create({
 	container: {
	flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  scrollView: {
	flex: 1,
  },
  slide: {
    flex: 1,
    paddingTop: 30,
    marginHorizontal: 30,
  },
  image: {
    alignSelf: "center",
	width: 300,
    height: 300,
  },
  title: {
    fontFamily: 'ultra-black-regular',
    fontSize: 40,
    color: '#FFFFFF',
	
  },
  subtitle: {
    fontFamily: 'ultra-black-regular',
    fontSize: 24,
    color: '#FFFFFF'
  },
  titoloText: {
	color: '#560CCE',
    fontSize: 50,
	fontFamily: 'ultra-black-regular',
	fontWeight: 'bold'
  },
   sottotitoloText: {
	color: '#fff',
	marginTop: 20,
    fontSize: 40,
	fontFamily: 'ultra-black-regular',
	fontWeight: 'bold',
	alignItems: 'center', 
	flex:1,
  },
  paragrafo1Text: {
	color: '#fff',
	marginBottom: 0,
    fontSize: 15,
	fontFamily: 'roboto-flex',
	alignItems: 'center', 
	flex:1,
  },
   paragrafo2Text: {
	color: '#fff',
	marginTop: 0,
    fontSize: 20,
	fontFamily: 'ultra-black-regular',
	alignItems: 'center', 
	flex:1,
  },
  buttonContainer: {
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  },
  descrizione: 
  {
	color: '#560CCE',
    fontSize: 30,
	fontFamily: 'ultra-black-regular',
	alignItems: 'center', 
	flex:1,
	alignItems: 'center',
    justifyContent: 'center',
  }
});
