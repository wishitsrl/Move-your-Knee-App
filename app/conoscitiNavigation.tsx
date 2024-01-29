import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, ImageBackground, ScrollView, StatusBar, NavigationContainer, Image } from 'react-native';
import Background from '../components/Background'
import LogoViola from '../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import { useRef, useState, useCallback, useEffect } from "react";

export default function CONOSCITI() {
	
	const { signOut, user } = useAuth();
	const router = useRouter();	
	const [isSwitchedOn, setIsSwitchedOn] = useState(false);	  
	const [buttonColor, setButtonColor] = useState('transparent');
	const [textColor, setTextColor] = useState('#560CCE');
	const [fontsLoaded, fontError] = useFonts({
		"RobotoFlex": require('../assets/fonts/RobotoFlex.ttf'),
		"RobotoFlex-Regular": require('../assets/fonts/RobotoFlex-Regular.ttf'),
		"Acumin-Variable-Concept": require('../assets/fonts/Acumin-Variable-Concept.ttf'),
		"AcuminVariableConcept-WideUltraBlack": require('../assets/fonts/AcuminVariableConcept-WideUltraBlack.ttf'),
		"ultrablackitalic": require('../assets/fonts/ultrablackitalic.ttf'),
		"AcuminProMedium": require('../assets/fonts/AcuminProMedium.otf'),
		"UltraBlackRegular": require('../assets/fonts/UltraBlackRegular.ttf'),});
		
	 const handlePress = () => {
		setIsSwitchedOn(true);
		setButtonColor('#560CCE');
		setTextColor('white');
		setTimeout(() => {
			setIsSwitchedOn(false);
			setButtonColor('transparent');
			setTextColor('#560CCE');
			router.push('/questionario')
		}, 1000);
	  };
	  
	  useEffect(() => {
		if (isSwitchedOn) {
		  console.log('Pulsante disabilitato');
		} else {
		  console.log('Pulsante abilitato');
		}
	  }, [isSwitchedOn]);

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
					CONOSCITI
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Calcola le tue calorie rispondendo a queste semplici domande
				</Text>
			</View>

			<View style={{alignItems: 'center', marginTop: 20}}></View>

			<View>
				<Text style={styles.sottotitoloText}>
					Alcune indicazioni
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Il questionario ti aiuta a misurare
					il tipo e la quantità di attività fisica che fai normalmente.
				</Text>
			</View>	

			<View>
				<Text style={styles.paragrafo2Text}>
					Per questo, le domande fanno riferimento 
					all' attività che hai svolto negli<Text style={styles.boldTextBlack}> ultimi 7 giorni </Text> 
					al lavoro, per spostarti da un posto all'altro,
					e nel tuo tempo libero, e che ti hanno tenuto impegnato 
					per<Text style={styles.boldTextBlack}> almeno 10 minuti consecutivi.</Text>
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Le attività fisiche <Text style={styles.boldText}>intense</Text>, sono quelle che richiedono uno sforzo fisico elevato.
				</Text>
			</View>
			
			<View>			
				<Text style={styles.paragrafo2Text}>
					Dunque sentirai che il ritmo del respiro è molto più elevato del normale,
					oltre a sudare tanto e a non riuscire a parlare.
				</Text>
			</View>
			
			<View>	
				<Text style={styles.paragrafo1Text}>
					Le attività fisiche <Text style={styles.boldText}>moderate</Text>, richiedono uno sforzo fisico moderato.
				</Text>
			</View>

			<View>				
				<Text style={styles.paragrafo2Text}>
					Vuol dire che sono quelle che ti costringono a respirare con un ritmo 
					moderatamente più elevato del normale. Dunque, anche se non dovessi riuscire a cantare
					la tua canzone preferita, potrai sempre parlare.
				</Text> 
			</View>		
			
			<View>				
				<TouchableOpacity 
					style={[styles.buttonContainer, { backgroundColor: isSwitchedOn ? '#560CCE' : buttonColor}]} 
					onPress={!isSwitchedOn ? handlePress : null}
					disabled={isSwitchedOn}>
					<Text style={[styles.buttonTextStyle, { color: textColor }]}>INIZIA IL QUESTIONARIO</Text>					
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
    fontSize: 35,
	fontFamily: 'AcuminVariableConcept-WideUltraBlack',
  },
  sottotitoloText: {
	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 27,
	fontFamily: 'UltraBlackRegular',
	marginTop: 25,
	fontWeight: 'bold',
  },
  paragrafo1Text: {
	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 23,
	fontFamily: 'AcuminProMedium',
	marginTop: 10,
  },
  paragrafo2Text: {
	marginHorizontal: 30,
    fontSize: 18,
	color: 'grey',
	fontFamily: 'RobotoFlex',
	marginTop: 0,
	marginBottom: 30,
  },
  boldText: {
    color: '#560CCE',
    fontSize: 23,
	fontFamily: 'UltraBlackRegular',
	fontWeight: 'bold',
  },
  boldTextBlack: {
    fontSize: 20,
	fontFamily: 'UltraBlackRegular',
	fontWeight: 'bold',
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
	justifyContent: 'center',
	textAlign: 'center',
  },
});

