import { Link, Stack, useRouter } from 'expo-router';
import Swiper from 'react-native-swiper/src';
import AntDesign from "@expo/vector-icons/AntDesign";
import Onboarding from 'react-native-onboarding-swiper';
import Background from '../components/UX/Background'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, ScrollView, StatusBar, NavigationContainer, Image } from 'react-native';
import Logo from '../components/UX/Logo';
import Button from '../components/UX/Button';
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';

export default function NotFoundScreen() {

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
	<Background>
		<Stack.Screen options={{ title: 'Tutorial' }} />
			<SafeAreaView style={styles.container}>			
			<StatusBar hidden={true} />
				<ScrollView style={styles.scrollView}>  
					<Logo/>  
					<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
						<View style={{flex: 1, height: 4, backgroundColor: '#FFFFFF'}} />
					</View>
					
					<View>
						<Text style={styles.sottotitoloText}>PRONTI PER INIZIARE!</Text>				
					</View>
					
					<View>
						<Text style={styles.paragrafo1Text}>Move Your Knee è l'APP che ti aiuta a tenerti in forma, ad allenarti e prendere cura di te, ma soprattutto delle tue ginocchia!</Text>				
					</View>

					<View>
						<Text style={styles.paragrafo2Text}>Conosci il tuo corpo, allenati, passa di livello, comunica con il tuo medico... e torna sui tuoi passi ogni volta che vorrai.</Text>
					</View>

					<View>
						<Text style={styles.paragrafo2Text}>Con Move Your Knee lascerai gli OPPLA' agli altri!</Text>
					</View>
					
					<View style={styles.buttonContainer}>
						<Button mode="contained" onPress={() =>  router.replace("/tutorial")}>AVVIA IL TUTORIAL</Button>    
					</View>	

					<View style={styles.buttonContainer}>
						<Button mode="contained" onPress={() => router.push("/CONOSCITI")}>SALTA IL TUTORIAL</Button>    
					</View>	
					
				</ScrollView>
			</SafeAreaView>
		</Background>
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
  title: {
    fontFamily: 'Helvetica',
    fontSize: 40,
    color: '#FFFFFF',
	
  },
  subtitle: {
    fontFamily: 'Helvetica',
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
	marginBottom: 30,
    fontSize: 15,
	fontFamily: 'roboto-flex',
	alignItems: 'center', 
	flex:1,
  },
   paragrafo2Text: {
	color: '#fff',
	marginTop: 10,
    fontSize: 20,
	fontFamily: 'ultra-black-regular',
	alignItems: 'center', 
	flex:1,
  },
  buttonContainer: {
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  }
});