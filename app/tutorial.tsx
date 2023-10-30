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

 const handleNextScreen = () => {
        if (screen <= 1) {
            setScreen((screen) => screen + 1)
        }
    }
	
export default function tutorial() {

   const { user } = useAuth();
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
	<Background>
		<Stack.Screen options={{ title: 'Tutorial' }} />
			<SafeAreaView style={styles.container}>			
			<StatusBar hidden={true} />
				<ScrollView style={styles.scrollView}>  
				<View style={styles.container}>
					<Logo/>
				</View>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<View style={{flex: 1, height: 2, backgroundColor: '#FFFFFF'}} />
					</View>
					<View style={styles.container}>
						<Swiper showsButtons={true} autoplay={true}
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
							  <AntDesign name="arrowright" size={22} color="#560CCE" />
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
							  <AntDesign name="arrowleft" size={22} color="#560CCE" />
							</View>
						  }
						 >
						 <View style={styles.slide}>
							<Text style={styles.title}>CONOSCITI</Text>
							<Text style={styles.subtitle}>Calcola le tue calorie e impara a conoscere il tuo corpo</Text>
							<Image source={require('../assets/ICONE/PNG/CONOSCITIBIANCO.png')} style={styles.image} />
							<Text style={styles.descrizione}>MOVE YOUR KNEE</Text>
						 </View>
						  <View style={styles.slide}>
							<Text style={styles.title}>ALLENATI</Text>
							<Text style={styles.subtitle}>Che aspetti ad allenarti ?! Tieniti in forma e vedrai che starai sempre meglio, giorno dopo giorno!</Text>
							<Image source={require('../assets/ICONE/PNG/ALLENATIBIANCO.png')} style={styles.image} />
							<Text style={styles.descrizione}>MOVE YOUR KNEE</Text>
						 </View>
						 <View style={styles.slide}>
							<Text style={styles.title}>DATI</Text>
							<Text style={styles.subtitle}>Monitora il tuo allenamento e i tuoi avanzamenti. In men che non si dica, sarai un FALCOOOO!</Text>
							<Image source={require('../assets/ICONE/PNG/DATIBIANCO.png')} style={styles.image} />
							<Text style={styles.descrizione}>STEP-BY-STEP</Text>
						  </View>
						  <View style={styles.slide}>
							<Text style={styles.title}>CHAT</Text>
							<Text style={styles.subtitle}>Non sei solo! Scrivi al tuo medico, come supportarti.</Text>
							<Image source={require('../assets/ICONE/PNG/CHATBIANCO.png')} style={styles.image} />
							<Text style={styles.descrizione}></Text>						
						  </View>
						  <View style={styles.slide}>
							<Text style={styles.title}>PROFILO</Text>
							<Text style={styles.subtitle}>Accedendo alla sezione profilo potrai rivedere e modificare i tuoi dati medici, ripetendo il questionario. Così saprai sempre di quanto sei migliorato!</Text>
							<Image source={require('../assets/ICONE/PNG/ALLENATIBIANCO.png')} style={styles.image} />
							<Text style={styles.descrizione}></Text>						
						  </View>
						</Swiper>	

						<View style={styles.buttonContainer}>
							<Button mode="contained" onPress={() => router.push("/CONOSCITI")}>SALTA IL TUTORIAL</Button>    
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
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: "center",
	width: 300,
    height: 300,
  },
  title: {
    fontFamily: 'ultra-black-regular',
    fontSize: 48,
    color: '#FFFFFF',
  },
  subtitle: {
    fontFamily: 'ultra-black-regular',
    fontSize: 20,
    color: '#FFFFFF'
  },
  buttonContainer: {
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  },
  descrizione: {
	color: '#560CCE',
    fontSize: 20,
	fontFamily: 'ultra-black-regular',
	flex:1,
  }
});
