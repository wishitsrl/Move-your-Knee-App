import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native';
import Button from '../components/UX/Button'
import Background from '../components/Background'
import LogoViola from '../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";

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
				 <Text style={styles.titoloText}>
					PROFILO
				</Text>
				<TouchableOpacity onPress={() => router.push('/modal')} >
					<Image style={styles.image} source={require('../assets/ICONE/PNG/CHIUDISELEZIONATO.png')} />
				</TouchableOpacity>		
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
						onChangeText={nome => setNome(nome)}
						value={nome}
						placeholder=" "
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					In quale area? (Ginocchio destro, sinistro o entrambi)
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={nome => setNome(nome)}
						value={nome}
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
						onChangeText={eta => setEta(eta)}
						value={eta}
						placeholder=" "
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Da 0 a 10, provi una sensazione di rigidità?*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={genere => setGenere(genere)}
						value={genere}
						placeholder=" "
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Da 0 a 10, senti il ginocchio debole?*
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={statoCivile => setStatoCivile(statoCivile)}
						value={statoCivile}
						placeholder=" "
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
						placeholder=" "
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
						onChangeText={peso => setPeso(peso)}
						value={peso}
						placeholder=" "
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Da 0 a 10, trovi difficoltà nel vestirti?
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={altezza => setAltezza(altezza)}
						value={altezza}
						placeholder=" "
					/>
				</View>	
			</View>

			<View>
				<Text style={styles.paragrafo2Text}>
					Hai mai assunto farmaci per il dolore al ginocchio? Se si quali?
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={altezza => setAltezza(altezza)}
						value={altezza}
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
						onChangeText={altezza => setAltezza(altezza)}
						value={altezza}
						placeholder=" "
					/>
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
