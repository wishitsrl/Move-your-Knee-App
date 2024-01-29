import * as React from 'react';
import { View, StyleSheet, Image, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import Button from '../components/UX/Button'
import Background from '../components/Background'
import LogoViola from '../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text } from '@/components/Themed';
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import client, { databases } from "./lib/appwrite-service";
import { Permission, Role,  ID, Query, } from "appwrite";
import { useRef, useCallback } from "react";

export default function fineSessione() {
  
  const { user } = useAuth();
  const router = useRouter();
  const [punteggio, setPunteggio] = React.useState('');   
  const [fontsLoaded, fontError] = useFonts({
		"RobotoFlex": require('../assets/fonts/RobotoFlex.ttf'),
		"roboto-flex-regular": require('../assets/fonts/RobotoFlex-Regular.ttf'),
		"roboto-flex-variable": require('../assets/fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),		
		"Acumin-Variable-Concept": require('../assets/fonts/Acumin-Variable-Concept.ttf'),
		"AcuminVariableConcept-WideUltraBlack": require('../assets/fonts/AcuminVariableConcept-WideUltraBlack.ttf'),		
		"ultra-black": require('../assets/fonts/ultrablackitalic.ttf'),
		"UltraBlackRegular": require('../assets/fonts/UltraBlackRegular.ttf'),
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
				<Image style={styles.image}  
				source={require('../assets/ICONE/PNG/CONFERMANEUTRO.png')} />
			</View>	
		
					
			
			<View>
				 <Text style={styles.paragrafo0Text}>
					SESSIONE DI ALLENAMENTO
				 </Text> 
			</View>
			<View>
				 <Text style={styles.paragrafo0Text}>
					CORRETTAMENTE SALVATA
				 </Text> 
			</View>
			
			<View>
				 <Text style={styles.paragrafo1Text}>
					I dati saranno visibili nella sezioni DATI
				 </Text> 
			</View>
			<View>
				 <Text style={styles.paragrafo1Text}>
					e trasmessi al tuo medico
				 </Text> 
			</View>
			<View>
				 <Text style={styles.paragrafo1Text}>
					per poter valutare i tuoi miglioramenti.
				 </Text> 
			</View>
			
			<View>
				<TouchableHighlight 
					style={styles.buttonContainer}
					underlayColor="#560CCE"
					activeOpacity={0.5}
					onPress={() => router.replace("/ALLENATI/")}>
					<Text style={styles.buttonTextStyle}>TORNA AI LIVELLI</Text>
				</TouchableHighlight>
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
	color: '#560CCE',
    fontSize: 40,
	fontFamily: 'AcuminVariableConcept-WideUltraBlack',
	alignSelf: "auto",
  },
  lavoro: {
  	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 28,
	fontFamily: 'RobotoFlex',
	alignSelf: 'center',
  },
  sottotitoloText: {
	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 23,
	fontFamily: 'RobotoFlex',
	marginTop: 20,
  },
  paragrafo1Text: {
	marginHorizontal: 30,
	color: '#1786aa',
    fontSize: 15,
	fontFamily: 'RobotoFlex',
	fontWeight: 'bold',
	alignSelf: 'center',
  },
  paragrafo0Text: {
	color: '#560CCE',
    fontSize: 22,
	fontFamily: 'RobotoFlex',
	alignSelf: 'center',
  },
  paragrafoSpazio: {
	marginTop: 40,
  },
   boldText: {
    color: '#560CCE',
    fontSize: 22,
	fontFamily: 'UltraBlackRegular',
	fontWeight: 'bold',
  },
  image: {
	marginTop: 80,
    alignSelf: 'center',
    height: 300,
    width: 300,
  },
    buttonContainer: {
		marginHorizontal: 30,
		borderRadius: 10,
		marginVertical: 10,
		paddingVertical: 2,
		borderColor: '#560CCE',
		borderWidth: 2,
		marginTop: 40,
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

