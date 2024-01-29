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
import { useRef, useCallback } from "react";

 const handleNextScreen = () => {
        if (screen <= 1) {
            setScreen((screen) => screen + 1)
        }
    }
	
export default function tutorial() {

   const { user } = useAuth();
   const router = useRouter();
   const [fontsLoaded, fontError] = useFonts({
		"roboto-flex": require('../assets/fonts/RobotoFlex.ttf'),
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
					
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<View style={{flex: 1, height: 2, backgroundColor: '#FFFFFF'}} />
				</View>
					
				<View style={styles.containerMain}>	
						<Swiper showsButtons={true} autoplay={false}
						  buttonWrapperStyle={{
							backgroundColor: "transparent",
							flexDirection: "row",
							position: 'absolute',
							top: 0,
							left: 0,
							flex: 1,
							paddingHorizontal: 10,
							paddingVertical: 10,
							justifyContent: 'space-between',
							alignItems: 'flex-end'
						  }}
						  style={styles.wrapper}
						  showsButtons={true}
						  activeDotColor="#560CCE"
						  dotColor="#560CCE"
						  nextButton={
							<View
							  style={{
								height: 60,
								borderRadius: 30,
								alignItems: "right",
								width: 60,
								borderColor: "#560CCE",  
								backgroundColor: "transparent",
							  }}
							>
							  <AntDesign name="arrowright" size={25} color="#560CCE" />
							</View>
						  }
						  prevButton={
							<View
							  style={{
								height: 60,
								borderRadius: 30,
								alignItems: "left",
								width: 60,
								borderColor: "#560CCE",  
								backgroundColor: "transparent",
							  }}
							>
							  <AntDesign name="arrowleft" size={25} color="#560CCE" />
							</View>
						  }
						 >
						 <View style={styles.slide}>
							<View style={styles.left}>
								<Text style={styles.title}>CONOSCITI</Text>
								<Text style={styles.subtitle}>Calcola le tue calorie e impara a conoscere il tuo corpo</Text>
							</View>
							<View style={styles.containerImg}>	
								<Image source={require('../assets/ICONE/PNG/CONOSCITIBIANCO.png')} style={styles.image} />
								
								<View style={styles.left}>
									<Text style={styles.descrizione}>MOVE YOUR KNEE</Text>
								</View>
							</View>
						 </View>
						 <View style={styles.slide}>
							<View style={styles.left}>
								<Text style={styles.title}>ALLENATI</Text>
								<Text style={styles.subtitle}>Che aspetti ad allenarti ?! Tieniti in forma e vedrai che starai sempre meglio, giorno dopo giorno!</Text>
						</View>	
							<View style={styles.containerImg}>	
								<Image source={require('../assets/ICONE/PNG/ALLENATIBIANCO.png')} style={styles.image} />					
								<View style={styles.left}>
									<Text style={styles.descrizione}>MOVE YOUR KNEE</Text>
								</View>
							</View>
						 </View>
						 <View style={styles.slide}>
							<View style={styles.left}>
								<Text style={styles.title}>DATI</Text>
								<Text style={styles.subtitle}>Monitora il tuo allenamento e i tuoi avanzamenti. In men che non si dica, sarai un FALCOOOO!</Text>
							</View>	
							<View style={styles.containerImg}>
								<Image source={require('../assets/ICONE/PNG/DATIBIANCO.png')} style={styles.image} />
								<Text style={styles.descrizione}>STEP-BY-STEP</Text>
							</View>
						  </View>
						  <View style={styles.slide}>
							<View style={styles.left}>
								<Text style={styles.title}>CHAT</Text>
								<Text style={styles.subtitle}>Non sei solo! Scrivi al tuo medico, come supportarti.</Text>
							</View>
							<View style={styles.containerImg}>
								<Image source={require('../assets/ICONE/PNG/CHATBIANCO.png')} style={styles.image} /> 
								
								<View style={styles.left}>
									<Text style={styles.descrizione}></Text>
								</View>									
							</View>	
							</View>
							<View style={styles.slide}>
								<View style={styles.left}>
									<Text style={styles.title}>PROFILO</Text>
									<Text style={styles.subtitle}>Accedendo alla sezione profilo potrai rivedere e modificare i tuoi dati medici, ripetendo il questionario. Così saprai sempre di quanto sei migliorato!</Text>
								</View>
							<View style={styles.containerImg}>
								<Image source={require('../assets/ICONE/PNG/PROFILOBIANCO.png')} style={styles.image} />
								
								<View style={styles.left}>
									<Text style={styles.descrizione}></Text>	
								</View>	
							</View>								
						  </View>
						</Swiper>	
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								activeOpacity={0.5}
								onPress={() => router.push("/CONOSCITI")}>
							<Text style={styles.buttonTextStyle}>SALTA IL TUTORIAL</Text>
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
  containerImg: {
    flex: 1,
	marginTop: 10,
  },
  containerMain: {
    justifyContent: 'center',
	textAlign: 'center',
	marginHorizontal: 30,
  },
  scrollView: {
	flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
	width: 400,
    height: 400,
	resizeMode: 'contain'
  },
  title: {
    marginTop: 10,
    fontSize: 35,
	fontFamily: 'AcuminVariableConcept-WideUltraBlack',
    color: '#FFFFFF',
  },
  subtitle: {	
	fontFamily: 'UltraBlackRegular',
	fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF'
  },
  buttonContainer: {
	marginHorizontal: 30,
	borderRadius: 10,
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
	color: '#560CCE',
	justifyContent: 'center',
	textAlign: 'center',
  },
  descrizione: {
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'ultra-black-regular',
 },
  left:{
    marginTop: 10,
    alignSelf: "left",
    justifyContent: 'center',
  }
});
