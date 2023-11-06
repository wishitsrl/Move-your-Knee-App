import * as React from 'react';
import { Text, StyleSheet, TextInput, View, SafeAreaView, ScrollView, StatusBar, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Button from '../components/UX/Button'
import Background from '../components/Background'
import LogoViola from '../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import client, { databases } from "./lib/appwrite-service";
import { Permission, Role,  ID, Query, } from "appwrite";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function registrazioneDatiMedici() {
   const { user } = useAuth();
   const router = useRouter(); 
   const [annoDiagnosi, setAnnoDiagnosi] = React.useState('');  
   const [areaGinocchio, setAreaGinocchio] = React.useState(''); 
   const [intensitaDolore, setIntensitaDolore] = React.useState(''); 
   const [sensazioneRigidita, setSensazioneRigidita] = React.useState(''); 
   const [sensazioneDebole, setSensazioneDebole] = React.useState(''); 
   const [difficoltaCammino, setDifficoltaCammino] = React.useState('');   
   const [difficoltaVestirsi, setDifficoltaVestirsi] = React.useState(''); 
   const [assunzioneFarmaci, setAssunzioneFarmaci] = React.useState(''); 
   const [infiltrazioni, setInfiltrazioni] = React.useState(''); 
   
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
  
	function handleSubmit() {

		const datiMedici = databases.createDocument('652e8e4607298ced5902', '6538c6af1ca5781c351b', user.$id,
		{
			'idPaziente': user.$id, 
			'annoDiagnosi': annoDiagnosi, 
			'areaGinocchio': areaGinocchio,   
			'intensitaDolore': intensitaDolore,
			'sensazioneRigidita': sensazioneRigidita,
			'sensazioneDebole': sensazioneDebole,
			'difficoltaCammino': difficoltaCammino,
			'difficoltaVestirsi': difficoltaVestirsi, 
            'assunzioneFarmaci': assunzioneFarmaci,
			'infiltrazioni': infiltrazioni,
		},
        [Permission.update(Role.any())],				
	  );	
	  
		datiMedici.then(function (response) {
			console.log(response); // Success 
			router.replace('/')		
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
					DATI MEDICI
				</Text>
			</View>
			
			<View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					In che anno è stata ricevuta una diagnosi di artrosi al ginocchio?
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={annoDiagnosi => setAnnoDiagnosi(annoDiagnosi)}
						value={annoDiagnosi}
						placeholder=" "
						keyboardType="phone-pad"
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					In quale area? (Ginocchio destro, sinistro o entrambi)
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={areaGinocchio => setAreaGinocchio(areaGinocchio)}
						value={areaGinocchio}
						placeholder=" "
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Valuta da 0 a 10 il dolore che provi al ginocchio*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={intensitaDolore => setIntensitaDolore(intensitaDolore)}
						value={intensitaDolore}
						placeholder=" "
						keyboardType="phone-pad"
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Da 0 a 10, provi una sensazione di rigidità?*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={sensazioneRigidita => setSensazioneRigidita(sensazioneRigidita)}
						value={sensazioneRigidita}
						placeholder=" "
						keyboardType="phone-pad"
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Da 0 a 10, senti il ginocchio debole?*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={sensazioneDebole => setSensazioneDebole(sensazioneDebole)}
						value={sensazioneDebole}
						placeholder=" "
						keyboardType="phone-pad"
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					*In caso di gonartrosi bilaterale, 
					dovrai riferirti al ginocchio più dolente
					o dolente al momento della compilazione del modulo
				</Text>
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Da 0 a 10, trovi difficoltà nel cammino?
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={difficoltaCammino => setDifficoltaCammino(difficoltaCammino)}
						value={difficoltaCammino}
						placeholder=" "
						keyboardType="phone-pad"
					/>
				</View>	
			</View>
						
			<View>
				<Text style={styles.paragrafo2Text}>
					Da 0 a 10, trovi difficoltà nel vestirti?
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={difficoltaVestirsi => setDifficoltaVestirsi(difficoltaVestirsi)}
						value={difficoltaVestirsi}
						placeholder=" "
						keyboardType="phone-pad"
					/>
				</View>	
			</View>

			<View>
				<Text style={styles.paragrafo2Text}>
					Hai mai assunto farmaci per il dolore al ginocchio? Se si quali?
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={assunzioneFarmaci => setAssunzioneFarmaci(assunzioneFarmaci)}
						value={assunzioneFarmaci}
						placeholder=" "
					/>
				</View>	
			</View>			

			<View>
				<Text style={styles.paragrafo2Text}>
					Hai mai praticato infiltrazioni al ginocchio? Se si, con:
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={infiltrazioni => setInfiltrazioni(infiltrazioni)}
						value={infiltrazioni}
						placeholder=" "
					/>
				</View>	
			</View>	
			
			<View style={styles.buttonContainer}>
				<Button mode="contained" onPress={() => handleSubmit()}>CONCLUDI</Button>    
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
  form: {
    flex: 1,   
	marginHorizontal: 10,
	justifyContent: 'center',
	flexDirection: 'row',    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
   scrollView: {
	flex: 1,
  },
  text: {
    fontSize: 42,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  titoloText: {
	marginHorizontal: 10,
	color: '#560CCE',
    fontSize: 50,
	fontFamily: 'ultra-black-regular',
	fontWeight: 'bold'

  },
  sottotitoloText: {
	marginHorizontal: 10,
	color: '#560CCE',
    fontSize: 30,
	fontFamily: 'roboto-flex-regular',
	marginTop: 0,
	fontWeight: 'bold',
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
  boldText: {
    color: '#560CCE',
    fontSize: 25,
	fontFamily: 'ultra-black-regular',
	fontWeight: 'bold',
  },
  boldTextBlack: {
    fontSize: 20,
	fontFamily: 'ultra-black-regular',
	fontWeight: 'bold',
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
    width: "90%",
    borderRadius: 10,
    padding: 15, 
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  },
});

