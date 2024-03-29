import * as React from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, ScrollView, StatusBar, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import Button from '../components/UX/Button'
import Background from '../components/Background'
import LogoViola from '../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text } from '@/components/Themed';
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import client, { databases } from "./lib/appwrite-service";
import { Permission, Role,  ID, } from "appwrite";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { SelectList } from 'react-native-dropdown-select-list'
import { useRef, useState, useCallback, useEffect } from "react";

export default function Questionario() {
	const day = [
	  {key:'1', value:'Nessuno'},
      {key:'1', value:'1 giorno'},
      {key:'2', value:'2 giorni'},
      {key:'3', value:'3 giorni'},
      {key:'4', value:'4 giorni'},
      {key:'5', value:'5 giorni'},
      {key:'6', value:'6 giorni'},
      {key:'7', value:'7 giorni'},
	]
	const { user } = useAuth();
	const router = useRouter();
	const [domanda1, setDomanda1] = useState('');  
	const [domanda2, setDomanda2] = useState('');
	const [domanda3, setDomanda3] = useState('');
	const [domanda4, setDomanda4] = useState('');
	const [domanda5, setDomanda5] = useState('');
	const [domanda6, setDomanda6] = useState('');
	const [domanda7, setDomanda7] = useState('');
	const [domanda8, setDomanda8] = useState('1');
	const [domanda9, setDomanda9] = useState('1');
	const [isSwitchedOn, setIsSwitchedOn] = useState(false);	  
	const [buttonColor, setButtonColor] = useState('transparent');
	const [textColor, setTextColor] = useState('#560CCE');
	const [fontsLoaded, fontError] = useFonts({
		"RobotoFlex": require('../assets/fonts/RobotoFlex.ttf'),
		"RobotoFlex-Regular": require('../assets/fonts/RobotoFlex-Regular.ttf'),
		"Acumin-Variable-Concept": require('../assets/fonts/Acumin-Variable-Concept.ttf'),
		"AcuminVariableConcept-WideUltraBlack": require('../assets/fonts/AcuminVariableConcept-WideUltraBlack.ttf'),
		"ultrablackitalic": require('../assets/fonts/ultrablackitalic.ttf'),
		"UltraBlackRegular": require('../assets/fonts/UltraBlackRegular.ttf'),
		"AcuminProMedium": require('../assets/fonts/AcuminProMedium.otf'),
		"AcuminProWideBold": require('../assets/fonts/AcuminProWideMedium.otf'),
		"FontsFree-Net-Acumin-Pro-Medium-1": require('../assets/fonts/FontsFree-Net-Acumin-Pro-Medium-1.ttf'),
	});
	
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

	function handlePress() {
		
		setIsSwitchedOn(true);
		setButtonColor('#560CCE');
		setTextColor('white');
		setTimeout(() => {
			setIsSwitchedOn(false);
			setButtonColor('transparent');
			setTextColor('#560CCE');
			router.push('/punteggio')
		}, 1000);
  
  //attivita intense comprendono le 2 attività (met unità di misura) 
	let attMetCammino = 1	
	let attMetIntense = 8 * domanda2 * domanda1
	let attMetModerate = 4 * domanda3 * domanda4
	let livello = 'Bradipo'
	let indice = 0

	if (domanda7 == 'Intenso')
	{
		attMetCammino = domanda5 * domanda6 * 3.3
	}
	else if (domanda7 == 'Moderato')
	{
		attMetCammino = domanda5 * domanda6 * 3	
	}
	else if (domanda7 == 'Lento')
	{ 
		attMetCammino = domanda5 * domanda6 * 2.5	
	}
	
	let totAttMet = attMetIntense + attMetModerate + attMetCammino
	
	//*******************
	// -> minore di 450 il tuo grado è "bradipo" visualizza TARTARUGA  
	// -> 450 a 700 il tuo grado è "tartaruga" visualizza TORO 
	// -> 700 a 900 il tuo grado è "toro" visualizza TIGRE
	// -> 900 a 1200 il tuo grado è "tigre" visualizza FALCO 
	// -> 1200 a 1800 il tuo grado è "falco" visualizza SUPER FALCO 
	//*******************
	
	if(totAttMet<450) {
		livello = 'Bradipo'
		indice = 0
	}
	else if(totAttMet>=450 && totAttMet<700) {
		livello = 'Tartaruga'
		indice = 1
	}
	else if(totAttMet>=700 && totAttMet<900) {
		livello = 'Toro'
		indice = 2
	}
	else if(totAttMet>=900 && totAttMet<1200) {
		livello = 'Tigre'
		indice = 3
	}
	else if(totAttMet>=1200 && totAttMet<1800) {
		livello = 'Falco'
		indice = 4
	}
	else if(totAttMet>=1800) {
		livello = 'Super Falco'
		indice = 5
	}
	//console.log("####Totale: " + totAttMet + " Met");	
	//console.log("###Livello: " + livello + "Indice: " + indice ); 
	const putPunteggio = databases.createDocument('652e8e4607298ced5902', '656f2a8e31adc68dc82d', ID.unique(),
		{
			'idPaziente': user.$id, 			 
			'tempoSedutoLavorativo': domanda8,
			'tempoSedutoFestivo': domanda9,
			'livello': livello,
			'punteggio': totAttMet,
			'idLivello': indice,
		},
        [Permission.update(Role.any())],				
	  );	
	  
		putPunteggio.then(function (response) {
			console.log(response); // Success
			router.replace('/punteggio');   	
		}, function (error) {
			console.log(error); // Failure
		});
	}
   
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
				 <Text style={styles.titoloText}>
					ATTIVITÀ INTENSE
				</Text> 
			</View>

				<View>
					<Text style={styles.domande}>
						DOMANDA 1
					</Text>
				</View>
			
				<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 30,}}>
					<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
				</View>

				<View>
					<Text style={styles.sottotitoloText}>
						Negli ultimi 7 giorni, per quanti giorni hai compiuto attività fisiche <Text style={styles.boldText}>intense</Text>
					</Text>
				</View>
			
				<View>
					<Text style={styles.paragrafo0Text}>	
						(ad esempio sollevato pesi, fatto lavori pesanti im giardino, o attività aerobiche come corse
						o un giro in bicicletta a velocità sostenuta?)
					</Text>
				</View>
			
				<View style={{alignItems: 'center', marginTop: 20}}></View>

				<View>
					<Text style={styles.paragrafo1Text}>
						Giorni alla settimana
					</Text>
					<Text style={styles.paragrafo0Text}>
						(nemmeno 1? Vai alla sezione successiva)					
					</Text>
					<View style={{backgroundColor: "white", width: 200, marginHorizontal: 30, color: '#560CCE', borderRadius: 5, borderWidth: 0,  borderColor: "lightgray", overflow: 'hidden'}}>
						<SelectList
						setSelected={(value, index) => setDomanda1(value)}
						data={day} 
						search={false} 
						boxStyles={{borderRadius:5, color:'#560CCE' }}
						defaultOption={{ key:'1', value:'Nessuno' }}
						/>
					</View>
			</View>	

			<View>
				<Text style={styles.domande}>
					DOMANDA 2
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 30,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
			
			<View>
				<Text style={styles.sottotitoloText}>
					Quanto tempo in totale dedichi normalmente ad un'attività fisica <Text style={styles.boldText}>intensa</Text> in uno di questi giorni?
				</Text>
			</View>
				
			<View style={{alignItems: 'center', marginTop: 20}}></View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Minuti					
				</Text>
				<TextInput
					style={styles.input}
					placeholder=""
					onChangeText={Domanda2 => setDomanda2(Domanda2)}
					keyboardType="phone-pad"
				/>
			</View>	

			<View>
				 <Text style={styles.titoloText}>
					ATTIVITÀ MODERATE
				</Text> 
			</View>

			<View>
				<Text style={styles.domande}>
					DOMANDA 3
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 30,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
				
			<View>
				<Text style={styles.sottotitoloText}>
					Negli ultimi 7 giorni, per quanti giorni hai compiuto attività fisiche <Text style={styles.boldText}>moderate</Text>
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo0Text}>
					(ad esempio sollevando pesi leggeri, fatto un giro in bicicletta a velocità regolare,
					sei andato in palestra, hai lavorato in giardino, oppure hai fatto un lavoro fisico prolungato a casa).	
				</Text>
				<Text style={styles.attenzione}>
					ATTENZIONE: non considerare le camminate.
				</Text>
			</View>
			
			<View style={{alignItems: 'center', marginTop: 20}}></View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Giorni alla settimana
				</Text>
			<Text style={styles.paragrafo0Text}>
				(nemmeno 1? Vai alla sezione successiva)					
			</Text>
					<View style={{backgroundColor: "white", width: 200, marginHorizontal: 30, borderRadius: 5, borderWidth: 0,  borderColor: "gray", overflow: 'hidden'}}>
						<SelectList
						setSelected={(value, index) => setDomanda3(value)}
						data={day} 
						search={false} 
						boxStyles={{borderRadius:5, color:'#560CCE' }}
						defaultOption={{ key:'1', value:'Nessuno' }}
						/>
					</View>
			</View>	

			<View>
				<Text style={styles.domande}>
					DOMANDA 4
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 30,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Quanto tempo in totale hai trascorso normalmente compiendo attività fisiche <Text style={styles.boldText}>moderate</Text> in uno di questi giorni?
				</Text>
			</View>
				
			<View style={{alignItems: 'center', marginTop: 20}}></View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Minuti					
			</Text>
			<TextInput
					style={styles.input}
					onChangeText={domanda4 => setDomanda4(domanda4)}
					value={domanda4}
					placeholder=" "
					keyboardType="phone-pad"
			/>
			</View>	

			<View>
				 <Text style={styles.titoloText}>
					CAMMINO
				</Text> 
			</View>

			<View>
				<Text style={styles.domande}>
					DOMANDA 5
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 30,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Negli ultimi 7 giorni, per quanti giorni<Text style={styles.boldText}> hai camminato per almemo 10 minuti?</Text> 
				</Text>
			</View>
			
			<View>
				<Text style={styles.paragrafo0Text}>
					(ad esempio per andare da casa a lavoro, per spostarti da un posto all' altro, o qualsiasi altra camminata fatta per piacere, esercizi o sport).
				</Text>
			</View>
				
			<View style={{alignItems: 'center', marginTop: 20}}></View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Giorni alla settimana
			</Text>
			<Text style={styles.paragrafo0Text}>
					(nemmeno 1? Vai alla sezione successiva)					
			</Text>
					<View style={{backgroundColor: "white", width: 200, marginHorizontal: 30, borderRadius: 5, borderWidth: 0,  borderColor: "gray", overflow: 'hidden'}}>
						<SelectList
						setSelected={(value, index) => setDomanda5(value)}
						data={day} 
						search={false} 
						boxStyles={{borderRadius:5, color:'#560CCE' }}
						defaultOption={{ key:'1', value:'Nessuno' }}
						/>
				</View>
			</View>	
			
			<View>
				<Text style={styles.domande}>
					DOMANDA 6
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 30,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Normalmente, per quanto tempo in totale hai camminato uno di questi giorni?
				</Text>
			</View>
				
			<View style={{alignItems: 'center', marginTop: 20}}></View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Minuti 					
				</Text>			
				<TextInput
					style={styles.input}
					onChangeText={domanda6 => setDomanda6(domanda6)}
					value={domanda6}
					placeholder=" "
					keyboardType="phone-pad"
			/>
			</View>	
			
			<View>
				<Text style={styles.domande}>
					DOMANDA 7
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 30,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					A che passo hai camminato?
				</Text>
			</View>

			<View style={styles.radioGroup}> 
                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="Intenso"
                        status={domanda7 === 'Intenso' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setDomanda7('Intenso')} 
                        color="#560CCE"
                    /> 
					<View>
						<Text style={styles.boldTextGrey}>Intenso</Text>
						<Text style={styles.boldSottoTextGrey}>Ritmo del respiro molto più elevato del normale</Text>
					</View>
				</View> 
  
                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="Moderato"
                        status={domanda7 === 'Moderato' ?  
                                 'checked' : 'unchecked'} 
                        onPress={() => setDomanda7('Moderato')} 
                        color="#560CCE"
                    /> 
					<View>
						<Text style={styles.boldTextGrey}>Moderato</Text>
						<Text style={styles.boldSottoTextGrey}>Ritmo del respiro mormalmente più elevato del normale</Text> 
					</View>               
				</View> 
  
                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="Lento"
                        status={domanda7 === 'Lento' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setDomanda7('Lento')} 
                        color="#560CCE"
                    /> 
					<View>
						<Text style={styles.boldTextGrey}>Lento</Text>
						<Text style={styles.boldSottoTextGrey}>Ritmo del respiro normale</Text> 
					</View>
                </View> 
            </View> 
			
			<View>
				 <Text style={styles.titoloText}>
					ATTIVITÀ DA SEDUTO
				</Text> 
			</View>

			<View>
				<Text style={styles.domande}>
					DOMANDA 8
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 30,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Negli ultimi 7 giorni, quanto tempo in totale hai trascorso <Text style={styles.boldText}>rimanendo seduto</Text>, durante un giorno lavorativo?
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo0Text}>
					(includi anche le attività svolte al lavoro, a casa, mentre ti rechi al lavoro e durante il tempo libero,
					ad esempio a scrivania, a tavola, mentre visiti degli amici, guardi la TV o leggi.)					
				</Text>
			</View>

			<View style={{alignItems: 'center', marginTop: 20}}></View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Minuti 					
			</Text>
			<TextInput
					style={styles.input}
					onChangeText={domanda8 => setDomanda8(domanda8)}
					placeholder=" "
    				keyboardType="phone-pad"
			/>
			</View>

			<View>
				<Text style={styles.domande}>
					DOMANDA 9
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 30,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Negli ultimi 7 giorni, quanto tempo in totale hai trascorso <Text style={styles.boldText}>rimanendo seduto, durante un giorno del fine settimana?</Text>
				</Text>
			</View>

			<View style={{alignItems: 'center', marginTop: 20}}></View>

			<View>
			<Text style={styles.paragrafo1Text}>
					Minuti 					
			</Text>
			<TextInput
					style={styles.input}
					onChangeText={domanda9 => setDomanda9(domanda9)}
					placeholder=" "
					keyboardType="phone-pad"
			/>
			</View>
			
			<View>				
				<TouchableOpacity 
					style={[styles.buttonContainer, { backgroundColor: isSwitchedOn ? '#560CCE' : buttonColor}]} 
					onPress={!isSwitchedOn ? handlePress : null}
					disabled={isSwitchedOn}>
					<Text style={[styles.buttonTextStyle, { color: textColor }]}>CONCLUDI</Text>					
				</TouchableOpacity>
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
    fontSize: 35,
	fontFamily: 'AcuminVariableConcept-WideUltraBlack',
  },
  sottotitoloText: {
	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 23,
	fontFamily: 'roboto-flex-regular',
	marginTop: 15,
	marginBottom: 4,
  },
  domande: {
  	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'roboto-flex',
	marginTop: 20,
	marginBottom: 10,
	alignItems: 'center',
  },
  paragrafo0Text: {
    fontSize: 18,
	color: 'grey',
	fontFamily: 'roboto-flex',
	marginHorizontal: 30,
	marginTop: 0,
	marginBottom: 5,
  },
  paragrafo1Text: {
	marginHorizontal: 30,
	color: '#1786aa',
    fontSize: 23,
	fontFamily: 'RobotoFlex',
	marginTop: 0,
	marginBottom: 0,
  },
  attenzione: {
	fontSize: 18,
    fontFamily: 'UltraBlackRegular',
	color: 'grey',
	marginHorizontal: 30,
	textDecorationLine: 'underline',
  },
   boldText: {
    color: '#560CCE',
    fontSize: 23,
    fontFamily: 'ultra-black-regular',
	fontWeight: 'bold',
  },
  pickerStyles: {
    marginHorizontal: 30,
	flexDirection: 'row',    
    justifyContent: 'center',
  },
   input: {
	marginHorizontal: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
	color: '#560CCE',
    borderRadius: 5,
    padding: 15, 
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
	width: 200, 
  },
   radioButton: { 
		marginHorizontal: 30,
        marginVertical: 10, 
        borderWidth: 0, 
        flexDirection: 'row', 
        alignItems: 'center', 
		color: 'grey',		
    }, 
    radioLabel: { 
        marginLeft: 8, 
        fontSize: 16, 
        color: '#333', 
    }, 
	boldTextGrey: {
    	color: 'grey',
		fontSize: 25,
		fontFamily: 'FontsFree-Net-Acumin-Pro-Medium-1',
	},
	boldSottoTextGrey: {
    	color: 'grey',
		fontSize: 18,
		fontFamily: 'FontsFree-Net-Acumin-Pro-Medium-1',
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

