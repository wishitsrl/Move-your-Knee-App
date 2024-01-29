import * as React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar, Image, TextInput, KeyboardAvoidingView, Keyboard, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Button from '../../components/UX/Button'
import Background from '../../components/Background'
import LogoViola from '../../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text } from '@/components/Themed';
import { useAuth } from '../context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import client, { databases } from "../lib/appwrite-service";
import { Permission, Role,  ID, Query, } from "appwrite";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useRef, useState, useCallback } from "react";
import Spinner from 'react-native-loading-spinner-overlay';

export default function PROFILO() {
	
	const { signOut, user } = useAuth();
	const router = useRouter();
	const [nome, setNome] = React.useState(''); 
	const [cognome, setCognome] = React.useState('');  
	const [eta, setEta] = React.useState(''); 
	const [genere, setGenere] = React.useState(''); 
	const [statoCivile, setStatoCivile] = React.useState(''); 
	const [attivitaLavorativa, setAttivitaLavorativa] = React.useState(''); 
	const [peso, setPeso] = React.useState('');   
	const [altezza, setAltezza] = React.useState('');   
	
	const [getNome, setGetNome] = React.useState(''); 
	const [getCognome, setGetCognome] = React.useState('');  
	const [getEta, setGetEta] = React.useState(''); 
	const [getGenere, setGetGenere] = React.useState(''); 
	const [getStatoCivile, setGetStatoCivile] = React.useState(''); 
	const [getSttivitaLavorativa, setGetAttivitaLavorativa] = React.useState(''); 
	const [getPeso, setGetPeso] = React.useState('');   
	const [getAltezza, setGetAltezza] = React.useState(''); 
	const [loading, setLoading] = React.useState(false);

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
  const getDatiPersonali = databases.getDocument('652e8e4607298ced5902', '6538c5cc9690a2884b8d', user.$id);
		getDatiPersonali.then(function (response) {
		console.log(response); // Success
		setGetNome(response.nome);
		setGetCognome(response.cognome);
		setGetEta(response.eta);
		setGetGenere(response.genere);
		setGetStatoCivile(response.statoCivile);
		setGetAttivitaLavorativa(response.attivitaLavorativa);
		setGetPeso(parseFloat(response.peso));
		setGetAltezza(parseFloat(response.altezza));
	}, function (error) {
		console.log(error); // Failure
	});
  
	function handleSubmit() {

		const updateDatiPersonali = databases.updateDocument('652e8e4607298ced5902', '6538c5cc9690a2884b8d', user.$id,
		{
			'idPaziente': user.$id, 
			'nome': nome, 
			'cognome': cognome,   
			'eta': eta,
			'genere': genere,
			'statoCivile': statoCivile,
			'attivitaLavorativa': attivitaLavorativa,
			'peso': peso, 
            'altezza': altezza,
		},
        [Permission.update(Role.any())],				
	  );	
	  
		updateDatiPersonali.then(function (response) {
			setLoading(true);
			console.log(response); // Success 	
		}, function (error) {
			console.log(error); // Failure
			setLoading(false);
		});
	}
	
	  const handleNameChange = (text) => {
		setNome(text)
  };
	
  return (
    <SafeAreaView style={styles.container}>
	    <StatusBar hidden={true} />
		<KeyboardAwareScrollView>
		<TouchableWithoutFeedback>
		<View style={styles.inner}>
		
			<View style={styles.container}>
				<LogoViola/>
			</View>
			
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
			
			<View>
				<Spinner visible={loading} />
			</View>
		
			<View>
				 <Text style={styles.titoloText}>
					PROFILO
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo1Text}>
					DATI PERSONALI
				</Text>
			</View>
			
			<View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 30,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Nome*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={handleNameChange}
						//onChangeText={nome => setNome(nome)}
						value={getNome}
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Cognome*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={cognome => setCognome(cognome)}
						value={getCognome}
					/>
				</View>	
			</View>
			
			<View style={{flexDirection: 'row', }}>
				<View style={{flex:1}}>
					<Text style={styles.paragrafo2Text}>
						Età*
					</Text>
					<View style={styles.form}>
						<TextInput style={styles.input}
							onChangeText={eta => setEta(eta)}
							value={getEta.toString()}
							keyboardType="phone-pad"
						/>
					</View>	
				</View>
				<View style={{flex:1}}>
					<Text style={styles.paragrafo2Text}>
						Genere*
					</Text>
					<View style={styles.form}>
						<TextInput style={styles.input}
							onChangeText={genere => setGenere(genere)}
							value={getGenere}
						/>
					</View>	
				</View>
			</View>
		
			<View>
				<Text style={styles.paragrafo2Text}>
					Stato Civile*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={statoCivile => setStatoCivile(statoCivile)}
						value={getStatoCivile}
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Attività Lavorativa*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={attivitaLavorativa => setAttivitaLavorativa(attivitaLavorativa)}
						value={getSttivitaLavorativa}
					/>
				</View>	
			</View>
			
			<View>
				<View style={{flexDirection: 'row'}}>
					 <View style={{flex:1}}>
						<Text style={styles.paragrafo2Text}>
							Peso*
						</Text>
						<View style={styles.form}>
							<TextInput style={styles.input}
								onChangeText={peso => setPeso(peso)}
								value={getPeso.toString()}
								keyboardType="phone-pad"
							/>
						</View>	
					</View>
					<View style={{flex:1}}>
						<Text style={styles.paragrafo2Text}>
							Altezza*
						</Text>
						<View style={styles.form}>
							<TextInput style={styles.input}
								onChangeText={altezza => setAltezza(altezza)}
								value={getAltezza.toString()}
								keyboardType="phone-pad"
							/>
						</View>	
					</View>
				</View>
			</View>
			
			<View>
				<TouchableHighlight 
					style={styles.buttonContainer}
					activeOpacity={0.5}
					underlayColor="#560CCE"
					onPress={() => handleSubmit()}>
					<Text style={styles.buttonTextStyle}>MODIFICA</Text>
				</TouchableHighlight>
			</View>
			<View>
				<TouchableHighlight 
					style={styles.buttonContainer}
					activeOpacity={0.5}
					underlayColor="#560CCE"
					onPress={() => router.push('/datiMedici')}>
					<Text style={styles.buttonTextStyle}>RIPETI QUESTIONARIO DATI MEDICI</Text>
				</TouchableHighlight>
			</View>
			<View>
				<TouchableHighlight 
					style={styles.buttonContainer}
					activeOpacity={0.5}
					underlayColor="#560CCE"
					onPress={() => router.replace('/modal')}>
					<Text style={styles.buttonTextStyle}>LOGOUT</Text>
				</TouchableHighlight>
			</View>		
			<View>
				<Text style={styles.paragrafo2Text}>
					* Tutti i dati richiesti sono obbligatori per modificare.
				</Text>			
			</View>				
	</View>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>	
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
  form: {          
	justifyContent: 'flex-start',
	flexDirection: 'row',    
  },
  paragrafo1Text: {
	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'roboto-flex',
	marginTop: 4,
	marginBottom: 4,
  },
  paragrafo2Text: {
	marginHorizontal: 30,
    fontSize: 20,
	color: '#1786aa',
	fontFamily: 'roboto-flex',
	marginTop: 10,
	marginBottom: 4,
  },
  image: {
    alignSelf: "center",
	flex: 1,
    height: 200,
    width: 200,
  },
  input: {
	marginHorizontal: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
	color: '#560CCE',
	fontWeight: 'bold',
    borderRadius: 7,
    padding: 15, 
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
	width: 200, 
  },
  buttonContainer: {
	marginHorizontal: 30,
	borderRadius: 7,
    marginVertical: 10,
    paddingVertical: 2,
	borderColor: '#560CCE',
	borderWidth: 2,
	alignItems: 'center',
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

