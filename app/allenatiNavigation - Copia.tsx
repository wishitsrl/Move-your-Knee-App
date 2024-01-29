import * as React from 'react';
import { View, Alert, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, ScrollView, StatusBar, NavigationContainer, Image } from 'react-native';
import LogoViola from '../components/UX/LogoViola'
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import { useRef, useState, useCallback, useEffect } from "react";
import client, { databases } from "./lib/appwrite-service";
import { Permission, Role,  ID, Query, } from "appwrite";
import { Card } from 'react-native-paper';
import Dialog from "react-native-dialog";

const router = useRouter();

const CardData = [
  {
    livello: 'LIVELLO 0',
    titolo: 'Bradipo',
	body: '0 PUNTI.',
	avanzamento : 'Inattivo.',
	img: require('../assets/ICONE/PNG/BRADIPONEUTRO_1.png'),
	page: "/EserciziLiv1"
  },
  {
    livello: 'LIVELLO 1',
    titolo: 'Tartaruga',
	body: '450 PUNTI.',
	avanzamento : 'Poco attivo.',
	img: require('../assets/ICONE/PNG/TARTARUGASELEZIONATO.png'),
	page: "/EserciziLiv2"
  },
  {
    livello: 'LIVELLO 2',
    titolo: 'Toro',
	body: '700 PUNTI.',
	avanzamento : 'Mediamente attivo.',
	img: require('../assets/ICONE/PNG/TOROSELEZIONATO.png'),
	page: "/EserciziLiv3"
  },
    {
    livello: 'LIVELLO 3',
    titolo: 'Tigre',
	body: '1250 PUNTI.',
	avanzamento : 'Più che attivo.',
	img: require('../assets/ICONE/PNG/TIGRESELEZIONATO.png'),
	page: "/EserciziLiv4"
  },
  {
    livello: 'LIVELLO 4',
    titolo: 'Falco',
	body: '1800 PUNTI.',
	avanzamento : 'Molto attivo.',
	img: require('../assets/ICONE/PNG/FALCOSELEZIONATO.png'),
	page: "/EserciziLiv5"
  },
  {
    livello: 'LIVELLO 5 (OPZIONALE)',
    titolo: 'Super Falco',
	body: 'PIÙ DI 1800 PUNTI.',
	avanzamento : 'Straordinariamente attivo.',
	img: require('../assets/ICONE/PNG/FALCOSELEZIONATO.png'),
	page: "/EserciziLiv6"
  },
];

export default function ALLENATI() {

	const { user } = useAuth();
	const [livelloAttuale, setLivelloAttuale] = useState(''); 
	const [fontsLoaded, fontError] = useFonts({
		"roboto-flex": require('../assets/fonts/RobotoFlex.ttf'),
		"Acumin-Variable-Concept": require('../assets/fonts/Acumin-Variable-Concept.ttf'),
		"AcuminVariableConcept-WideUltraBlack": require('../assets/fonts/AcuminVariableConcept-WideUltraBlack.ttf'),
		"roboto-flex-regular": require('../assets/fonts/RobotoFlex-Regular.ttf'),
		"roboto-flex-variable": require('../assets/fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),		
		"ultra-black": require('../assets/fonts/ultrablackitalic.ttf'),
		"ultra-black-regular": require('../assets/fonts/UltraBlackRegular.ttf'),
	});

	  const [isSwitchedOn, setIsSwitchedOn] = useState(false);	  
	  const [buttonColor, setButtonColor] = useState('transparent');
	  const [textColor, setTextColor] = useState('#560CCE');
	  const [buttonImageTartaruga, setButtonImageTartaruga] = useState(require('../assets/ICONE/PNG/TARTARUGASELEZIONATO.png'));
	  const [buttonImageToro, setButtonImageToro] = useState(require('../assets/ICONE/PNG/TOROSELEZIONATO.png'));
	  const [buttonImageTigre, setButtonImageTigre] = useState(require('../assets/ICONE/PNG/TIGRESELEZIONATO.png'));
	  const [buttonImageFalco, setButtonImageFalco] = useState(require('../assets/ICONE/PNG/FALCOSELEZIONATO.png'));
	  const [buttonImageSuperFalco, setButtonImageSuperFalco] = useState(require('../assets/ICONE/PNG/FALCOSELEZIONATO.png'));

	  const handleButtonPressTartaruga = () => {
			setIsSwitchedOn(true);
			setButtonColor('#560CCE');
			setTextColor('white');
			setButtonImageTartaruga(require('../assets/ICONE/PNG/TARTARUGABIANCO.png'));
			setTimeout(() => {
				setIsSwitchedOn(false);
				setButtonColor('transparent');
				setTextColor('#560CCE');
				setButtonImageTartaruga(require('../assets/ICONE/PNG/TARTARUGASELEZIONATO.png'));
				router.push('/EserciziLiv2')
		}, 2000);
	  };

	  const handleButtonPressToro = () => {
		setIsSwitchedOn(true);
		setButtonColor('#560CCE');
		setTextColor('white');
		setButtonImageToro(require('../assets/ICONE/PNG/TOROBIANCO.png'));
		setTimeout(() => {
			setIsSwitchedOn(false);
			setButtonColor('transparent');
			setTextColor('#560CCE');
			setButtonImageToro(require('../assets/ICONE/PNG/TOROSELEZIONATO.png'));
			router.push('/EserciziLiv3')
		}, 2000);
	  };
	  
	 const handleButtonPressTigre = () => {
		setIsSwitchedOn(true);
		setButtonColor('#560CCE');
		setTextColor('white');
		setButtonImageTigre(require('../assets/ICONE/PNG/TIGREBIANCO.png'));
		setTimeout(() => {
			setIsSwitchedOn(false);
			setButtonColor('transparent');
			setTextColor('#560CCE');
			setButtonImageTigre(require('../assets/ICONE/PNG/TIGRESELEZIONATO.png'));
			router.push('/EserciziLiv4')
		}, 2000);
	  };
	 
	 const handleButtonPressFalco = () => {
		setIsSwitchedOn(true);
		setButtonColor('#560CCE');
		setTextColor('white');
		setButtonImageFalco(require('../assets/ICONE/PNG/TARTARUGABIANCO.png'));
		setTimeout(() => {
			setIsSwitchedOn(false);
			setButtonColor('transparent');
			setTextColor('#560CCE');
			setButtonImageFalco(require('../assets/ICONE/PNG/FALCOSELEZIONATO.png'));
			router.push('/EserciziLiv5')
		}, 2000);
	  };

	 const handleButtonPressSuperFalco = () => {
		setIsSwitchedOn(true);
		setButtonColor('#560CCE');
		setTextColor('white');
		setButtonImageSuperFalco(require('../assets/ICONE/PNG/FALCOBIANCO.png'));
		setTimeout(() => {
			setIsSwitchedOn(false);
			setButtonColor('transparent');
			setTextColor('#560CCE');
			setButtonImageSuperFalco(require('../assets/ICONE/PNG/FALCOSELEZIONATO.png'));
			router.push('/EserciziLiv6')
		}, 2000);
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
  
	//*******************
	// -> il tuo grado è "bradipo" visualizza TARTARUGA  
	// -> il tuo grado è "tartaruga" visualizza TORO 
	// -> il tuo grado è "toro" visualizza TIGRE
	// -> il tuo grado è "tigre" visualizza FALCO 
	// -> il tuo grado è "falco" visualizza SUPER FALCO 
	//*******************

  	const promise = databases.listDocuments('652e8e4607298ced5902', '652e8e563085d6a5aad0',   
	[
        Query.equal('idPaziente', user.$id)
    ]);
	promise.then(function (response) {			
		let length = response.documents.length;
			if(length!=0) {
				setLivelloAttuale(response.documents[length-1].livello)
				console.log("Livello Allenati: " + livelloAttuale); // Success
			}
			else 
				Alert.alert("Riempire il questionario");
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

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
				
			<View>
				 <Text style={styles.titoloText}>
					ALLENATI
				</Text>
			</View>
			
			<View>
				<Text style={styles.sottotitoloText}>
					Il tuo livello è <Text style={styles.boldText}>{ livelloAttuale }</Text>.
				</Text>
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Svolgi gli esercizi e continua a migliorare.
				</Text>
			</View>
			
			<View style={{alignItems: 'center', marginTop: 30}}></View>
				
			<View style={styles.livello}>
				
				<Text style={styles.paragrafo2Text}>
					{CardData[1].livello}
				</Text>
				<View style={{flexDirection: 'row', alignItems: 'center',}}>
					<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
				</View>

				<View>
					<TouchableOpacity
						style={[styles.buttonContainer, { backgroundColor: isSwitchedOn ? '#560CCE' : buttonColor}]} 
						onPress={!isSwitchedOn ? handleButtonPressTartaruga : null}
						disabled={isSwitchedOn}>
						<View style={{ flexDirection: 'row' }}>		
							<View style={{ marginTop: 5, marginBottom: 0, flex: 1 }}>
								<Text style={[styles.boldText, { color: textColor }]}>{CardData[1].titolo}</Text>
								<Text style={[styles.sottotitoloItemText, { color: textColor }]}>{CardData[1].body}</Text>
								<Text style={[styles.sottotitoloItemText, { color: textColor }]}>{CardData[1].avanzamento}</Text>					
							</View>
							<Image source={buttonImageTartaruga} style={{width:100, height:100}} />
						</View>
					</TouchableOpacity>
				</View>	
				
				<Text style={styles.paragrafo2Text}>
					{CardData[2].livello}
				</Text>
				<View style={{flexDirection: 'row', alignItems: 'center',}}>
					<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
				</View>
			
			<View>
				<TouchableOpacity
						style={[styles.buttonContainer, { backgroundColor: isSwitchedOn ? '#560CCE' : buttonColor}]} 
						onPress={!isSwitchedOn ? handleButtonPressToro : null}
						disabled={isSwitchedOn}>
						<View style={{ flexDirection: 'row' }}>		
							<View style={{ marginTop: 5, marginBottom: 0, flex: 1 }}>
								<Text style={[styles.boldText, { color: textColor }]}>{CardData[2].titolo}</Text>
								<Text style={[styles.sottotitoloItemText, { color: textColor }]}>{CardData[2].body}</Text>
								<Text style={[styles.sottotitoloItemText, { color: textColor }]}>{CardData[2].avanzamento}</Text>					
							</View>
							<Image source={buttonImageToro} style={{width:100, height:100}} />
						</View>
				</TouchableOpacity>
			</View>
				<Text style={styles.paragrafo2Text}>
					{CardData[3].livello}
				</Text>
				<View style={{flexDirection: 'row', alignItems: 'center',}}>
					<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
				</View>
			
			<View>
				<TouchableOpacity
						style={[styles.buttonContainer, { backgroundColor: isSwitchedOn ? '#560CCE' : buttonColor}]} 
						onPress={!isSwitchedOn ? handleButtonPressTigre : null}
						disabled={isSwitchedOn}>
						<View style={{ flexDirection: 'row' }}>		
							<View style={{ marginTop: 5, marginBottom: 0, flex: 1 }}>
								<Text style={[styles.boldText, { color: textColor }]}>{CardData[3].titolo}</Text>
								<Text style={[styles.sottotitoloItemText, { color: textColor }]}>{CardData[3].body}</Text>
								<Text style={[styles.sottotitoloItemText, { color: textColor }]}>{CardData[3].avanzamento}</Text>					
							</View>
							<Image source={buttonImageTigre} style={{width:100, height:100}} />
						</View>
				</TouchableOpacity>
			</View>
			
				<Text style={styles.paragrafo2Text}>
					{CardData[4].livello}
				</Text>
				<View style={{flexDirection: 'row', alignItems: 'center',}}>
					<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
				</View>

			<View>
				<TouchableOpacity
						style={[styles.buttonContainer, { backgroundColor: isSwitchedOn ? '#560CCE' : buttonColor}]} 
						onPress={!isSwitchedOn ? handleButtonPressFalco : null}
						disabled={isSwitchedOn}>
						<View style={{ flexDirection: 'row' }}>		
							<View style={{ marginTop: 5, marginBottom: 0, flex: 1 }}>
								<Text style={[styles.boldText, { color: textColor }]}>{CardData[4].titolo}</Text>
								<Text style={[styles.sottotitoloItemText, { color: textColor }]}>{CardData[4].body}</Text>
								<Text style={[styles.sottotitoloItemText, { color: textColor }]}>{CardData[4].avanzamento}</Text>					
							</View>
							<Image source={buttonImageFalco} style={{width:100, height:100}} />
						</View>
				</TouchableOpacity>
			</View>
			
				<Text style={styles.paragrafo2Text}>
					{CardData[5].livello}
				</Text>
				<View style={{flexDirection: 'row', alignItems: 'center',}}>
					<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
				</View>
			
			<View>
				<TouchableOpacity
						style={[styles.buttonContainer, { backgroundColor: isSwitchedOn ? '#560CCE' : buttonColor}]} 
						onPress={!isSwitchedOn ? handleButtonPressSuperFalco : null}
						disabled={isSwitchedOn}>
						<View style={{ flexDirection: 'row' }}>		
							<View style={{ marginTop: 5, marginBottom: 0, flex: 1 }}>
								<Text style={[styles.boldText, { color: textColor }]}>{CardData[5].titolo}</Text>
								<Text style={[styles.sottotitoloItemText, { color: textColor }]}>{CardData[5].body}</Text>
								<Text style={[styles.sottotitoloItemText, { color: textColor }]}>{CardData[5].avanzamento}</Text>					
							</View>
							<Image source={buttonImageSuperFalco} style={{width:100, height:100}} />
						</View>
				</TouchableOpacity>
			</View>
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
  sottotitoloItemText: {
	color: '#560CCE',
    fontSize: 18,
	fontFamily: 'roboto-flex-regular',
	
  },
  sottotitoloText: {
	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 23,
	fontFamily: 'roboto-flex-regular',
	marginBottom: 0,
	marginTop: 0,
  },
  paragrafo2Text: {
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'roboto-flex-regular',
  },
  item: {
    padding: 5,
	borderRadius: 7,
	borderColor: "lightgrey",
	borderWidth: 1,
	margin: 3,
  },
  livello: {
	marginHorizontal: 30,
  },
  boldText: {
    color: '#560CCE',
    fontSize: 23,
	fontFamily: 'AcuminVariableConcept-WideUltraBlack',
  },  
  buttonContainer: {
    marginVertical: 10,
	justifyContent: 'center',
	padding: 5,
	borderRadius: 7,
	borderColor: "lightgrey",
	borderWidth: 1,
	margin: 5,
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
  
  
  
  
  
  
  
  
  
  
  
  
  
    button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  
  
});

