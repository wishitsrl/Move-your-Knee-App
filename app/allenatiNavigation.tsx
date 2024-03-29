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
	id: 1,
    livello: 'LIVELLO 1',
    titolo: 'Tartaruga',
	body: '450 PUNTI.',
	avanzamento : 'Poco attivo.',
	img: require('../assets/ICONE/PNG/TARTARUGASELEZIONATO.png'),
	imgAtt: require('../assets/ICONE/PNG/TARTARUGABIANCO.png'),
	imgDis: require('../assets/ICONE/PNG/TARTARUGAGRIGIO.png'),
	page: "/EserciziLiv2"
  },
  {
  	id: 2,
    livello: 'LIVELLO 2',
    titolo: 'Toro',
	body: '700 PUNTI.',
	avanzamento : 'Mediamente attivo.',
	img: require('../assets/ICONE/PNG/TOROSELEZIONATO.png'),
	imgAtt: require('../assets/ICONE/PNG/TOROBIANCO.png'),
	imgDis: require('../assets/ICONE/PNG/TOROGRIGIO.png'),
	page: "/EserciziLiv3"
  },
  {
	id: 3,
    livello: 'LIVELLO 3',
    titolo: 'Tigre',
	body: '1250 PUNTI.',
	avanzamento : 'Più che attivo.',
	img: require('../assets/ICONE/PNG/TIGRESELEZIONATO.png'),
	imgAtt: require('../assets/ICONE/PNG/TIGREBIANCO.png'),
	imgDis: require('../assets/ICONE/PNG/TIGREGRIGIO.png'),
	page: "/EserciziLiv4"
  },
  {
  	id: 4,
    livello: 'LIVELLO 4',
    titolo: 'Falco',
	body: '1800 PUNTI.',
	avanzamento : 'Molto attivo.',
	img: require('../assets/ICONE/PNG/FALCOSELEZIONATO.png'),
	imgAtt: require('../assets/ICONE/PNG/FALCOBIANCO.png'),
	imgDis: require('../assets/ICONE/PNG/FALCOGRIGIO.png'),
	page: "/EserciziLiv5"
  },
  {
  	id: 5,
    livello: 'LIVELLO 5 (OPZIONALE)',
    titolo: 'Super Falco',
	body: 'PIÙ DI 1800 PUNTI.',
	avanzamento : 'Straordinariamente attivo.',
	img: require('../assets/ICONE/PNG/FALCOSELEZIONATO.png'),
	imgAtt: require('../assets/ICONE/PNG/FALCOBIANCO.png'),
	imgDis: require('../assets/ICONE/PNG/FALCOGRIGIO.png'),
	page: "/EserciziLiv6"
  },
];

export default function ALLENATI() {

	const { user } = useAuth();
	const [livelloAttuale, setLivelloAttuale] = useState(''); 
    const [buttonColor, setButtonColor] = useState('transparent');
	const [buttonStates, setButtonStates] = useState([false, false, false, false, false]);
	const [indiceLivello, setIndiceLivello] = useState();	
	const [numTouchablesToDisable, setNumTouchablesToDisable] = useState(0);
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
	//*******************
	// -> il tuo grado è "bradipo" visualizza TARTARUGA  
	// -> il tuo grado è "tartaruga" visualizza TORO 
	// -> il tuo grado è "toro" visualizza TIGRE
	// -> il tuo grado è "tigre" visualizza FALCO 
	// -> il tuo grado è "falco" visualizza SUPER FALCO 
	//*******************
	const promise = databases.listDocuments('652e8e4607298ced5902', '656f2a8e31adc68dc82d',   
	[
        Query.equal('idPaziente', user.$id)
    ]);
	promise.then(function (response) {			
			let length = response.documents.length;
			if(length!=0) {
				setLivelloAttuale(response.documents[length-1].livello)
				setIndiceLivello(response.documents[length-1].idLivello)
				console.log("Livello Allenati: " + livelloAttuale); // Success
				console.log("Indice Livello: " + indiceLivello); // Success
				setNumTouchablesToDisable(indiceLivello)
			}
			else 
				Alert.alert("Riempire il questionario");
	}, function (error) {
		console.log(error); // Failure
	});

	const handleTouchablePress = (touchableIndex) => {
		if (touchableIndex > numTouchablesToDisable) {
		  // Disattiva il TouchableOpacity solo se il suo indice è inferiore al numero da disattivare
		  // Puoi implementare qui la logica specifica del TouchableOpacity disattivato
		  console.log(`Touchable ${touchableIndex + 1} disabled`);
		} else {
			  // Gestisci il tocco normale del TouchableOpacity
			  console.log(`Touchable ${touchableIndex + 1} pressed`);
				// Crea una copia dell'array degli stati
			const newButtonStates = [...buttonStates];
			// Cambia lo stato del pulsante specificato
			newButtonStates[touchableIndex] = !newButtonStates[touchableIndex];
			// Aggiorna lo stato
			setButtonStates(newButtonStates);
			
			 setTimeout(() => {
				// Puoi inserire qui l'azione che vuoi eseguire dopo il ritardo
				console.log(`Azione dopo il ritardo per il pulsante ${touchableIndex + 1}`);
				newButtonStates[touchableIndex] = false;
				setButtonStates(newButtonStates)
				router.push(CardData[touchableIndex].page)
			}, 1000);
		}
	  };
	 
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
				{ buttonStates.map((isPressed, i) => (
					<View key={i}>
						<Text style={styles.paragrafo2Text}> {CardData[i].livello} </Text>
					<View style={{flexDirection: 'row', alignItems: 'center',}}>
						<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
					</View>
					<TouchableOpacity
						key={i}
						style={[ styles.buttonContainer, {  backgroundColor:  !isPressed ? buttonColor : '#560CCE', },]}
						onPress={() => handleTouchablePress(i)}
						disabled={ i > numTouchablesToDisable}>
						<View style={{ flexDirection: 'row' }}>		
							<View style={{ marginTop: 5, marginBottom: 0, flex: 1 }}>
								<Text style={[styles.boldText, { color: i > numTouchablesToDisable ? 'grey' : "white" && !isPressed ? '#560CCE' : 'white' }]}>{CardData[i].titolo}</Text>
								<Text style={[styles.sottotitoloItemText, { color: i > numTouchablesToDisable ? 'grey' : "white" && !isPressed ? '#560CCE' : 'white' }]}>{CardData[i].body}</Text>
								<Text style={[styles.sottotitoloItemText, { color: i > numTouchablesToDisable ? 'grey' : "white" && !isPressed ? '#560CCE' : 'white' }]}>{CardData[i].avanzamento}</Text>					
							</View>
						<Image style={{width:100, height:100}} source={i > numTouchablesToDisable ? CardData[i].imgDis : CardData[i].img && isPressed ? CardData[i].imgAtt : CardData[i].img}/>
						</View>
					</TouchableOpacity>
					{	
						i > numTouchablesToDisable && 
						<Text style={[styles.livelloBloccato, { color: i > numTouchablesToDisable ? 'grey' : "white" }]}>* livello bloccato</Text>
					}					
					</View>
				))} 
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
  livelloBloccato: {
	marginHorizontal: 15,
	color: 'grey',
    fontSize: 18,
	fontFamily: 'roboto-flex-regular',
	marginBottom: 10,
	marginTop: 0,
  },
});

