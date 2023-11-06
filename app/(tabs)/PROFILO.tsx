import * as React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar, Image, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, } from 'react-native';
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
   
   const [loaded] = useFonts({
		"roboto-flex": require('../../assets/fonts/RobotoFlex.ttf'),
		"roboto-flex-regular": require('../../assets/fonts/RobotoFlex-Regular.ttf'),
		"roboto-flex-variable": require('../../assets/fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),		
		"ultra-black": require('../../assets/fonts/ultrablackitalic.ttf'),
		"ultra-black-regular": require('../../assets/fonts/UltraBlackRegular.ttf'),
  });

  if (!loaded) {
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
			console.log(response); // Success 	
		}, function (error) {
			console.log(error); // Failure
		});
	}
	
  return (
    <SafeAreaView style={styles.container}>
	    <StatusBar hidden={true} />
		<KeyboardAwareScrollView>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<View style={styles.inner}>
		
			<View style={styles.container}>
				<LogoViola/>
			</View>
			
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
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
			
			<View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Nome*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={nome => setNome(nome)}
						value={nome}
						placeholder={ getNome }
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
						value={cognome}
						placeholder={ getCognome }
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Età*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={eta => setEta(eta)}
						value={eta.toString()}
						placeholder={ getEta.toString() }
						keyboardType="phone-pad"
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Genere*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={genere => setGenere(genere)}
						value={genere}
						placeholder={ getGenere }
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Stato Civile*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={statoCivile => setStatoCivile(statoCivile)}
						value={statoCivile}
						placeholder={ getStatoCivile }
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
						value={attivitaLavorativa}
						placeholder={ getSttivitaLavorativa.toString() }
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Peso*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={peso => setPeso(peso)}
						value={peso.toString()}
						placeholder={ getPeso.toString() }
						keyboardType="phone-pad"
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Altezza*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={altezza => setAltezza(altezza)}
						value={altezza.toString()}
						placeholder={ getAltezza.toString() }
						keyboardType="phone-pad"
					/>
				</View>	
			</View>
			
			<View style={styles.buttonContainer}>
				<Button mode="contained" onPress={() => handleSubmit()}>MODIFICA</Button>    
			</View>
			<View style={styles.buttonContainer}>
				<Button mode="contained" onPress={() => router.push('/datiMedici')}>RIPETI QUESTIONARIO DATI MEDICI</Button>    
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
	marginHorizontal: 10,
	marginTop: 10,
	color: '#560CCE',
    fontSize: 48,
	fontFamily: 'ultra-black-regular',
  },
  form: {
    flex: 1,   
	justifyContent: 'center',
	flexDirection: 'row',    
  },
  paragrafo1Text: {
	marginHorizontal: 10,
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'roboto-flex',
	marginTop: 10,
  },
  paragrafo2Text: {
	marginHorizontal: 20,
    fontSize: 20,
	color: '#48d1cc',
	fontFamily: 'roboto-flex',
	marginTop: 0,
  },
  buttonContainer: {
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  },
  image: {
    alignSelf: "center",
	flex: 1,
    height: 200,
    width: 200,
  },
  input: {
	marginHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "gray",
	color: '#560CCE',
    width: "90%",
    borderRadius: 10,
    padding: 15, 
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  },
});

