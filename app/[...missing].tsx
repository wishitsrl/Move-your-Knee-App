import { Link, Stack, useRouter } from 'expo-router';
import Swiper from 'react-native-swiper/src';
import AntDesign from "@expo/vector-icons/AntDesign";
import Onboarding from 'react-native-onboarding-swiper';
import Background from '../components/UX/Background'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, ImageBackground, ScrollView, StatusBar, NavigationContainer, Image } from 'react-native';
import Logo from '../components/UX/Logo';
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';
import { useRef, useState, useCallback } from "react";

export default function NotFoundScreen() {

   const { user } = useAuth();
   const router = useRouter();
   const [isPressedSalta, setIsPressedSalta] = useState(false);
   const [isPressedTutorial, setIsPressedTutorial] = useState(false);

   const buttonSaltaColor = isPressedSalta ? 'white' : '#560CCE';
   const buttonTutorialColor = isPressedTutorial ? 'white' : '#560CCE';



   const [fontsLoaded, fontError] = useFonts({
		"roboto-flex": require('../assets/fonts/RobotoFlex.ttf'),
		"Acumin-Variable-Concept": require('../assets/fonts/Acumin-Variable-Concept.ttf'),
		"AcuminVariableConcept-WideUltraBlack": require('../assets/fonts/AcuminVariableConcept-WideUltraBlack.ttf'),
		"roboto-flex-regular": require('../assets/fonts/RobotoFlex-Regular.ttf'),
		"roboto-flex-variable": require('../assets/fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),		
		"ultra-black": require('../assets/fonts/ultrablackitalic.ttf'),
		"ultra-black-regular": require('../assets/fonts/UltraBlackRegular.ttf'),
  });

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
		  await SplashScreen.hideAsync();
		}
	  }, [fontsLoaded, fontError]);

	  if (!fontsLoaded && !fontError) {
		return null;
	  }
	  
  return (
	<Background>
		<SafeAreaView style={styles.container}>
			<StatusBar hidden={true} />
			<ScrollView style={styles.scrollView}>     
				<View style={styles.container}>
					<Logo/>
				</View>
				
				<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
					<View style={{flex: 1, height: 2, backgroundColor: '#fff'}} />
				</View>	
						
				<View style={styles.containerMain}>	
						<View>
							<Text style={styles.titoloText}>PRONTI PER INIZIARE!</Text>				
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
						
						<View style={{alignItems: 'center', marginTop: 50}}></View>
						
						<View>
							<TouchableOpacity 
								style={[styles.buttonContainer, { backgroundColor: isPressedTutorial ? '#560CCE' : 'transparent'}]}
								onPressIn={() => setIsPressedTutorial(!isPressedTutorial) }
								onPress={() => router.replace("/tutorial")}>
								<Text style={[styles.buttonTextStyle, { color: buttonTutorialColor }]}>AVVIA IL TUTORIAL</Text>
							</TouchableOpacity>
						</View>	

						<View>
							<TouchableOpacity 
								style={[styles.buttonContainer, { backgroundColor: isPressedSalta ? '#560CCE' : 'transparent'}]}
								onPressIn={() => setIsPressedSalta(!isPressedSalta) }
								onPress={() => router.push("/CONOSCITI")}>
								<Text style={[styles.buttonTextStyle, { color: buttonSaltaColor }]}>SALTA IL TUTORIAL</Text>
							</TouchableOpacity>
						</View>		
						
				</View>					
			</ScrollView>
		</SafeAreaView>
	</Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   scrollView: {
	flex: 1,
  },
  containerMain: {
	  marginHorizontal: 30,
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 40,
    color: '#FFFFFF',
  },
  titoloText: {
    fontSize: 35,
	fontFamily: 'AcuminVariableConcept-WideUltraBlack',
	color: '#FFFFFF',
  },
  paragrafo1Text: {
	color: '#fff',
	marginBottom: 30,
    fontSize: 20,
	fontFamily: 'RobotoFlex',
	alignItems: 'center', 
  },
   paragrafo2Text: {
	color: '#fff',
	marginTop: 20,
    fontSize: 30,
	fontWeight: 'bold',
	fontFamily: 'ultra-black-regular',
	alignItems: 'center', 
  },
  buttonMainContainer: {
	marginHorizontal: 30,
	borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 2,
	borderColor: '#560CCE',
	borderWidth: 2,
	justifyContent: 'center',

  },
  buttonTextStyle: {
    paddingVertical: 10,
	fontFamily: 'RobotoFlex',    
    fontSize: 20,
    lineHeight: 20,
	justifyContent: 'center',
	textAlign: 'center',
  },
    buttonContainer: {
	marginHorizontal: 50,
	borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 2,
	borderColor: '#560CCE',
	borderWidth: 1,
	alignItems: 'center',
    justifyContent: 'center',
  },
});
