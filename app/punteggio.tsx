import * as React from 'react';
import { View, StyleSheet, Image, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
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

export default function Punteggio() {
  
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

	const promise = databases.listDocuments('652e8e4607298ced5902', '656f2a8e31adc68dc82d',   
	[
        Query.equal('idPaziente', user.$id)
    ]);	
	promise.then(function (response) {
		let length = response.documents.length;
		if(length!=0) {
			setPunteggio(response.documents[length-1].punteggio)
			console.log("Livello Punteggio: " + punteggio); // Success
		}
	}, function (error) {
		console.log(error); // Failure
	});
   
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
					<Text style={styles.sottotitoloText}>
					Ecco il tuo punteggio!
					</Text>
				</View>
			
			<View>
				 <Text style={styles.titoloText}>
					{ punteggio }
				</Text> 
			</View>

			<View>
				<Image style={styles.image}  
				source={require('../assets/ICONE/PNG/STATOSUFFICIENTESELEZIONATO.png')} />
			</View>	
		
			<View>
				 <Text style={styles.lavoro}>
					BUON LAVORO
				</Text> 
			</View>
			
			<View>
				 <Text style={styles.paragrafo0Text}>
					Sei sufficiente attivo,
				 </Text> 
			</View>
			<View>
				 <Text style={styles.paragrafo0Text}>
					allenati e continua a migliorare!
				 </Text> 
			</View>

			<View>
				<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => router.replace("/ALLENATI")}>
						<View style={styles.paragrafoSpazio}>
							<Text style={styles.paragrafo0Text}>
								Vai alla sezione <Text style={styles.boldText}>ALLENATI</Text>
							</Text>
							<Text style={styles.paragrafo0Text}>
								e inizia a muoverti!
							</Text> 
						</View>		
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
	color: '#560CCE',
    fontSize: 40,
	fontFamily: 'AcuminVariableConcept-WideUltraBlack',
	alignSelf: "auto",
  },
  lavoro: {
  	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 30,
	fontFamily: 'AcuminVariableConcept-WideUltraBlack',
	alignSelf: 'center',
  },
  sottotitoloText: {
	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 23,
	fontFamily: 'RobotoFlex',
	marginTop: 20,
  },
  sottotitoloText2: {
	color: '#560CCE',
    fontSize: 22,
	fontFamily: 'RobotoFlex',
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
    alignSelf: 'center',
    height: 300,
    width: 300,
  },	
});

