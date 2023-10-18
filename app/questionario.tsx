import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import Button from '../components/UX/Button'
import Background from '../components/Background'
import LogoViola from '../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import client, { databases } from "./lib/appwrite-service";

export default function Questionario() {

   const [domanda1, setDomanda1] = React.useState('');
   const [domanda2, setDomanda2] = React.useState('');
   const [domanda3, setDomanda3] = React.useState('');
   const [domanda4, setDomanda4] = React.useState('');
   const [domanda5, setDomanda5] = React.useState('');
   const [domanda6, setDomanda6] = React.useState('');
   const [domanda7, setDomanda7] = React.useState('');
   const [domanda8, setDomanda8] = React.useState('');
   const [domanda9, setDomanda9] = React.useState('');

   const { user } = useAuth();
   const router = useRouter();
   const [loaded] = useFonts({
		"roboto-flex": require('../assets/fonts/RobotoFlex.ttf'),
		"roboto-flex-regular": require('../assets/fonts/RobotoFlex-Regular.ttf'),
		"roboto-flex-variable": require('../assets/fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),		
		"ultra-black": require('../assets/fonts/ultrablackitalic.ttf'),
		"ultra-black-regular": require('../assets/fonts/UltraBlackRegular.ttf'),
  });

  //console.log(user.$id);

  if (!loaded) {
    return null;
  }
  
  function handleSubmit() {

const questionarioData = [
  {
    idPaziente: user.$id,
  },
  {
    anno: domanda1,
  },
  {
	area: domanda2,
  },
  {
	dolore: domanda3,
  },
  {
	rigidita: domanda4,
  },
  {
	debole: domanda5,
  },
  {
	cammino: domanda6,
  },
  {
	vestirsi: domanda7,
  },
  {
	farmaci: domanda8,
  },
  {
	infiltrazioni: domanda9,
  },
];
	
//	console.log(questionarioData); 
     
	//const promise = databases.getDocument('652e39e4abfb8d628d46', '652e39f5db250173e640', '652e73a29c2cf2d06735');
	const promise = databases.createDocument('[DATABASE_ID]', '[COLLECTION_ID]', '[DOCUMENT_ID]', questionarioData);

	promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
	
	}
  
  return (
    <SafeAreaView style={styles.container}>
	    <StatusBar hidden={true} />
		<ScrollView style={styles.scrollView}>     
			<View style={styles.container}>
				<LogoViola/>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
				<View style={{flex: 1, height: 4, backgroundColor: '#560CCE'}} />
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
				<View style={{flex: 1, height: 4, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Negli ultimi 7 giorni, per quanti giorni hai compiuto attività fisiche intense
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
			<Picker style={styles.pickerStyles} 
					selectedValue={domanda1}
					onValueChange={(value, index) => setDomanda1(value)}
					mode="dropdown" // Android only
					style={styles.pickerStyles}>
						<Picker.Item label="Nessuno" value="0" />
						<Picker.Item label="1 giorno" value="1" />
						<Picker.Item label="2 giorni" value="2" />
						<Picker.Item label="3 giorni" value="3" />
						<Picker.Item label="4 giorni" value="4" />
						<Picker.Item label="5 giorni" value="5" />
						<Picker.Item label="6 giorni" value="6" />
						<Picker.Item label="7 giorni" value="7" />
				</Picker>
			</View>	

			<View>
				<Text style={styles.domande}>
					DOMANDA 2
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 4, backgroundColor: '#560CCE'}} />
			</View>
			
			<View>
				<Text style={styles.sottotitoloText}>
					Quanto tempo in totale dedichi normalmente ad un'attività fisica intensa in uno di questi giorni?
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
				/>
			</View>	

			<View>
				<Text style={styles.domande}>
					DOMANDA 3
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 4, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Negli ultimi 7 giorni, per quanti giorni hai compiuto attività fisiche moderate
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
			<Picker
					selectedValue={domanda3}
					onValueChange={(value, index) => setDomanda3(value)}
					mode="dropdown" // Android only
					style={styles.pickerStyles}>
						<Picker.Item label="Nessuno" value="0" />
						<Picker.Item label="1 giorno" value="1" />
						<Picker.Item label="2 giorni" value="2" />
						<Picker.Item label="3 giorni" value="3" />
						<Picker.Item label="4 giorni" value="4" />
						<Picker.Item label="5 giorni" value="5" />
						<Picker.Item label="6 giorni" value="6" />
						<Picker.Item label="7 giorni" value="7" />
				</Picker>
			</View>	

			<View>
				<Text style={styles.domande}>
					DOMANDA 4
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 4, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Quanto tempo in totale hai trascorso normalmente compiendo attività fisiche moderate in uno di questi giorni?
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Minuti					
			</Text>
			<TextInput
					style={styles.input}
					onChangeText={Domanda4 => setDomanda4(domanda4)}
					value={domanda4}
					placeholder=" "
			/>
			</View>	

			<View>
				<Text style={styles.domande}>
					DOMANDA 5
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 4, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Negli ultimi 7 giorni, per quanti giorni hai camminato per almemo 10 minuti?
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
			<Picker
					selectedValue={domanda5}
					onValueChange={(value, index) => setDomanda5(value)}
					mode="dropdown" // Android only
					style={styles.pickerStyles}>
						<Picker.Item label="Nessuno" value="0" />
						<Picker.Item label="1 giorno" value="1" />
						<Picker.Item label="2 giorni" value="2" />
						<Picker.Item label="3 giorni" value="3" />
						<Picker.Item label="4 giorni" value="4" />
						<Picker.Item label="5 giorni" value="5" />
						<Picker.Item label="6 giorni" value="6" />
						<Picker.Item label="7 giorni" value="7" />
				</Picker>
			</View>	
			
			<View>
				<Text style={styles.domande}>
					DOMANDA 6
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 4, backgroundColor: '#560CCE'}} />
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
			/>
			</View>	
			
			<View>
				<Text style={styles.domande}>
					DOMANDA 7
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 4, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					A che passo hai camminato?
				</Text>
			</View>

			<View>
			
			    <RadioButton.Group onValueChange={(value) => setDomanda7(value)} value={domanda7}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<RadioButton value="Intenso" color="blue" />					
							<View>
								<Text style={styles.paragrafo0Text}>INTENSO</Text>
							</View>
							<View>
								<Text style={styles.paragrafo0Text}>Ritmo del respiro molto più elevato del normale</Text>
							</View>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<RadioButton value="Moderato" color="blue" />
							<View>
								<Text style={styles.paragrafo0Text}>MODERATO</Text>
							</View>
							<View>
								<Text style={styles.paragrafo0Text}>Ritmo del respiro mormalmente più elevato del normale</Text>
							</View>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<RadioButton value="Lento" />
							<View>
								<Text style={styles.paragrafo0Text}>LENTO</Text>
							</View>
							<View>
								<Text style={styles.paragrafo0Text}>Ritmo del respiro normale</Text>
							</View>
					</View>
				</RadioButton.Group>			
			</View>
			
			<View>
				<Text style={styles.domande}>
					DOMANDA 8
				</Text>
				
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 4, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Negli ultimi 7 giorni, quanto tempo in totale hai trascorso rimanendo seduto, durante un giorno lavorativo?
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
			/>
			</View>

			<View>
				<Text style={styles.domande}>
					DOMANDA 9
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 4, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Negli ultimi 7 giorni, quanto tempo in totale hai trascorso rimanendo seduto, durante un giorno del fine settimana?
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
			/>
			</View>

			<View style={styles.buttonContainer}>
				<Button mode="contained" onPress={() => handleSubmit()}>Vai al punteggio</Button>    
			</View>
	 </View>
	 
		</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'center',
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
    marginHorizontal: 0,
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
	marginTop: 20,
	fontWeight: 'bold'
  },
  domande: {
  	marginHorizontal: 10,
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'roboto-flex',
	marginTop: 20,
	alignItems: 'left',
  },
  paragrafo0Text: {
    fontSize: 20,
	fontFamily: 'roboto-flex',
	marginHorizontal: 10,
	marginTop: 0,
	marginBottom: 30,
  },
  paragrafo1Text: {
    fontSize: 20,
	color: '#7fffd4',
	fontFamily: 'roboto-flex',
	marginHorizontal: 10,
	marginTop: 0,
  },
  attenzione: {
	fontSize: 25,
	fontFamily: 'roboto-flex',
	fontWeight: 'bold',
	marginHorizontal: 10,
	marginTop: 0,
	marginBottom: 0,
  },
  boldText: {
	fontWeight: 'bold',
  },
  buttonContainer: {
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  },
  pickerStyles: {
    marginHorizontal: 10,
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 2,
    borderColor: "#666",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
  }
});

