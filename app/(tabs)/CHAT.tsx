import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, ImageBackground, ScrollView, StatusBar, NavigationContainer, Image } from 'react-native';
import Background from '../../components/Background'
import LogoViola from '../../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { useAuth } from '../context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import { useRef, useState, useCallback } from "react";

export default function CHAT() {	
	const { user } = useAuth();
	const router = useRouter();
	const [isSwitchedOn, setIsSwitchedOn] = useState(false);	  
	const [buttonColor, setButtonColor] = useState('transparent');
	const [textColor, setTextColor] = useState('#560CCE');

	const handleButtonPress = () => {
			setIsSwitchedOn(true);
			setButtonColor('#560CCE');
			setTextColor('white');
			setTimeout(() => {
				setIsSwitchedOn(false);
				setButtonColor('transparent');
				setTextColor('#560CCE');
				router.push('/GiftedChat')
		}, 2000);
	  };
	
	const [fontsLoaded, fontError] = useFonts({
		"roboto-flex": require('../../assets/fonts/RobotoFlex.ttf'),
		"roboto-flex-regular": require('../../assets/fonts/RobotoFlex-Regular.ttf'),
		"roboto-flex-variable": require('../../assets/fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),		
		"Acumin-Variable-Concept": require('../../assets/fonts/Acumin-Variable-Concept.ttf'),
		"AcuminVariableConcept-WideUltraBlack": require('../../assets/fonts/AcuminVariableConcept-WideUltraBlack.ttf'),
		"ultra-black": require('../../assets/fonts/ultrablackitalic.ttf'),
		"ultra-black-regular": require('../../assets/fonts/UltraBlackRegular.ttf'),
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
    <SafeAreaView style={styles.container}>
	    <StatusBar hidden={true} />
		<ScrollView style={styles.scrollView}>     
			<View style={styles.container}>
				<LogoViola/>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
				
			<View>
				 <Text style={styles.titoloText}>
					CHAT
				</Text>
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Non sei solo!
				</Text>
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Scrivi al tuo medico, come supportarti!.
				</Text>
			</View>

			<View >
				<Image style={styles.image}  
				source={require('../../assets/ICONE/PNG/MEDICOSELEZIONATO.png')} />
			</View>	
				
			<View>		
				<TouchableOpacity
					style={[styles.buttonContainer, { backgroundColor: isSwitchedOn ? '#560CCE' : buttonColor}]} 
					onPress={!isSwitchedOn ? handleButtonPress : null}
					disabled={isSwitchedOn}>
					<Text style={[styles.buttonTextStyle, { color: textColor }]}>AVVIA LA CHAT</Text>
				</TouchableOpacity>	
			</View>
	</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   scrollView: {
	flex: 1,
  },
  titoloText: {
	marginHorizontal: 30,
	marginTop: 10,
	color: '#560CCE',
    fontSize: 40,
	fontFamily: 'AcuminVariableConcept-WideUltraBlack',
  },
  sottotitoloText: {
	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'roboto-flex-regular',
	marginBottom: 0,
  },
  image: {
    alignSelf: "center",
	flex: 1,
    height: 300,
    width: 300,
  },
    buttonContainer: {
	marginHorizontal: 50,
	borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 2,
	borderColor: '#560CCE',
	borderWidth: 1,
	alignItems: 'center',
	marginTop: 40,
	marginBottom: 40,
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
});

