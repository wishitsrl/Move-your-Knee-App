import * as React from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, ScrollView, StatusBar, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, } from 'react-native';
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

export default function Questionario() {
    const day = [
	  {key:'1', value:'Nessuno'},
      {key:'1', value:'1 giorno'},
      {key:'2', value:'2 giorno'},
      {key:'3', value:'3 giorno'},
      {key:'4', value:'4 giorno'},
      {key:'5', value:'5 giorno'},
      {key:'6', value:'6 giorno'},
      {key:'7', value:'7 giorno'},
  ]
  const { user } = useAuth();
  const router = useRouter();
  const [domanda1, setDomanda1] = React.useState('');  
  const [domanda2, setDomanda2] = React.useState('');
  const [domanda3, setDomanda3] = React.useState('');
  const [domanda4, setDomanda4] = React.useState('');
  const [domanda5, setDomanda5] = React.useState('');
  const [domanda6, setDomanda6] = React.useState('');
  const [domanda7, setDomanda7] = React.useState('');
  const [domanda8, setDomanda8] = React.useState('');
  const [domanda9, setDomanda9] = React.useState('');
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

	//attivita intense comprendono le 2 attività (met unità di misura) 
	attMetIntense = 8 * domanda2 * domanda1
	attMetModerate = 4 * domanda3 * domanda4
	let livello = 'Bradipo';
	
	if (domanda7 == 'Intenso')
	{
		console.log(domanda7); 
		attMetCammino = domanda5 * domanda6 * 3.3
	}
	else if (domanda7 == 'Moderato')
	{
		console.log(domanda7); 
		attMetCammino = domanda5 * domanda6 * 3	
	}
	else if (domanda7 == 'Lento')
	{
		console.log(domanda7); 
		attMetCammino = domanda5 * domanda6 * 2.5	
	}
	
	totAttMet = attMetIntense + attMetModerate + attMetCammino
	
	if(totAttMet<450)
		livello = 'Bradipo'
	else if(totAttMet==450)
		livello = 'Tartaruga'
	else if(totAttMet>=450 && totAttMet<900)
		livello = 'Toro'
	else if(totAttMet>=900 && totAttMet<1800)
		livello = 'Tigre'
	else if(totAttMet>=1800)
		livello = 'Falco'
	
	console.log("Totale: " + totAttMet + " Met"); 
	const putPunteggio = databases.createDocument('652e8e4607298ced5902', '652e8e563085d6a5aad0', ID.unique(),
		{
			'idPaziente': user.$id, 
			'punteggio': totAttMet, 
			'tempoSedutoLavorativo': domanda8,
			'tempoSedutoFestivo': domanda9,
			'livello': livello,
		},
        [Permission.update(Role.any())],				
	  );	
	  
		putPunteggio.then(function (response) {
			console.log(response); // Success
			router.push('/punteggio');   	
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
					ATTIVITA' INTENSE
				</Text> 
			</View>

			<View style={styles.container}>	
				
				<View>
					<Text style={styles.domande}>
						DOMANDA 1
					</Text>
				</View>
			
				<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
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

				<View>
					<Text style={styles.paragrafo1Text}>
						Giorni alla settimana
					</Text>
					<Text style={styles.paragrafo0Text}>
						(nemmeno 1? Vai alla sezione successiva)					
					</Text>
					<View style={styles.pickerStyles}>
						<SelectList
						setSelected={(value, index) => setDomanda1(value)}
						data={day} 
						search={false} 
						boxStyles={{borderRadius:0}}
						defaultOption={{ key:'1', value:'Nessuno' }}
						/>
					</View>
			</View>	

			<View>
				<Text style={styles.domande}>
					DOMANDA 2
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
			
			<View>
				<Text style={styles.sottotitoloText}>
					Quanto tempo in totale dedichi normalmente ad un'attività fisica <Text style={styles.boldText}>intensa</Text> in uno di questi giorni?
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Minuti					
				</Text>
				<TextInput
					style={styles.input}
					onChangeText={Domanda2 => setDomanda2(Domanda2)}
					value={domanda2}
					placeholder=" "
					keyboardType="phone-pad"
				/>
			</View>	

			<View>
				 <Text style={styles.titoloText}>
					ATTIVITA' MODERATE
				</Text> 
			</View>

			<View>
				<Text style={styles.domande}>
					DOMANDA 3
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
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
				
			<View>
				<Text style={styles.paragrafo1Text}>
					Giorni alla settimana
				</Text>
			<Text style={styles.paragrafo0Text}>
				(nemmeno 1? Vai alla sezione successiva)					
			</Text>
			<View style={styles.pickerStyles}>
						<SelectList
						setSelected={(value, index) => setDomanda3(value)}
						data={day} 
						search={false} 
						boxStyles={{borderRadius:0}}
						defaultOption={{ key:'1', value:'Nessuno' }}
						/>
					</View>
			</View>	

			<View>
				<Text style={styles.domande}>
					DOMANDA 4
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Quanto tempo in totale hai trascorso normalmente compiendo attività fisiche <Text style={styles.boldText}>moderate</Text> in uno di questi giorni?
				</Text>
			</View>

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

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
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

			<View>
				<Text style={styles.paragrafo1Text}>
					Giorni alla settimana
			</Text>
			<Text style={styles.paragrafo0Text}>
					(nemmeno 1? Vai alla sezione successiva)					
			</Text>
				<View style={styles.pickerStyles}>
						<SelectList
						setSelected={(value, index) => setDomanda5(value)}
						data={day} 
						search={false} 
						boxStyles={{borderRadius:0}}
						defaultOption={{ key:'1', value:'Nessuno' }}
						/>
				</View>
			</View>	
			
			<View>
				<Text style={styles.domande}>
					DOMANDA 6
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Normalmente, per quanto tempo in totale hai camminato uno di questi giorni?
				</Text>
			</View>

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

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					A che passo hai camminato?
				</Text>
			</View>

			<View> 
			<View style={styles.radioGroup}> 
                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="Intenso"
                        status={domanda7 === 'Intenso' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setDomanda7('Intenso')} 
                        color="#007BFF"
                    /> 
                    <View>
						<Text style={styles.boldTextViolet}>INTENSO</Text>
						<Text style={styles.paragrafo0Text}>Ritmo del respiro molto più elevato del normale</Text>
					</View>
                </View> 
  
  
                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="Moderato"
                        status={domanda7 === 'Moderato' ?  
                                 'checked' : 'unchecked'} 
                        onPress={() => setDomanda7('Moderato')} 
                        color="#007BFF"
                    /> 
                    <View>
						<Text style={styles.boldTextViolet}>MODERATO</Text>
						<Text style={styles.paragrafo0Text}>Ritmo del respiro mormalmente più elevato del normale</Text>
					</View>
                </View> 
  
                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="Lento"
                        status={domanda7 === 'Lento' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setDomanda7('Lento')} 
                        color="#007BFF"
                    /> 
                    <View>
						<Text style={styles.boldTextViolet}>LENTO</Text>
						<Text style={styles.paragrafo0Text}>Ritmo del respiro normale</Text>
					</View>					
                </View> 
            </View> 				
			</View>

			<View>
				 <Text style={styles.titoloText}>
					ATTIVITA' DA SEDUTO
				</Text> 
			</View>

			<View>
				<Text style={styles.domande}>
					DOMANDA 8
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
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

			<View>
				<Text style={styles.paragrafo1Text}>
					Minuti 					
			</Text>
			<TextInput
					style={styles.input}
					onChangeText={domanda8 => setDomanda8(domanda8)}
					value={domanda8}
					placeholder=" "
    				keyboardType="phone-pad"
			/>
			</View>

			<View>
				<Text style={styles.domande}>
					DOMANDA 9
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Negli ultimi 7 giorni, quanto tempo in totale hai trascorso <Text style={styles.boldText}>rimanendo seduto, durante un giorno del fine settimana?</Text>
				</Text>
			</View>

			<View>
			<Text style={styles.paragrafo1Text}>
					Minuti 					
			</Text>
			<TextInput
					style={styles.input}
					onChangeText={domanda9 => setDomanda9(domanda9)}
					value={domanda9}
					placeholder=" "
					keyboardType="phone-pad"
			/>
			</View>

			<View style={styles.buttonContainer}>
				<Button mode="contained" onPress={() => handleSubmit()}>CONCLUDI</Button>    
			</View>
			
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
  sottotitoloText: {
	marginHorizontal: 10,
	color: '#560CCE',
    fontSize: 20,
	fontFamily: 'roboto-flex-regular',
	marginTop: 20,
	fontWeight: 'bold'
  },
  domande: {
  	marginHorizontal: 10,
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'roboto-flex',
	marginTop: 20,
	alignItems: 'center',
  },
  paragrafo0Text: {
    fontSize: 18,
	fontFamily: 'roboto-flex',
	marginHorizontal: 10,
	marginTop: 0,
	marginBottom: 30,
  },
  paragrafo1Text: {
    fontSize: 20,
	color: '#48d1cc',
	fontFamily: 'roboto-flex',
	marginHorizontal: 10,
	marginTop: 0,
  },
  attenzione: {
	fontSize: 15,
	fontFamily: 'ultra-black-regular',
	fontWeight: 'bold',
	marginHorizontal: 10,
	marginTop: 15,
	marginBottom: 15,
	textDecorationLine: 'underline',
  },
   boldText: {
    color: '#560CCE',
    fontSize: 20,
    fontFamily: 'ultra-black-regular',
	fontWeight: 'bold',
  },
  buttonContainer: {
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  },
  pickerStyles: {
    flex: 1,
    marginHorizontal: 10,
	flexDirection: 'row',    
    justifyContent: 'center',
  },
   input: {
	marginHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "gray",
	color: '#560CCE',
    borderRadius: 10,
    padding: 15, 
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  },
   radioButton: { 
		marginHorizontal: 10,
        paddingVertical: 12, 
        paddingHorizontal: 16, 
        borderRadius: 8, 
        marginVertical: 8, 
        borderWidth: 0, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        width: 300,  
    }, 
    radioLabel: { 
        marginLeft: 8, 
        fontSize: 16, 
        color: '#333', 
    }, 
	boldTextViolet: {
    	color: '#560CCE',
		fontSize: 20,
		fontFamily: 'ultra-black-regular',
		fontWeight: 'bold',
  },	
});

