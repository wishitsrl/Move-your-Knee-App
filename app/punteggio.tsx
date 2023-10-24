import * as React from 'react';
import { StyleSheet, Image, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
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
import { Permission, Role,  ID, Query, } from "appwrite";

export default function Punteggio() {
  
  const { user } = useAuth();
  const router = useRouter();
  const [punteggio, setPunteggio] = React.useState('');   
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

	const promise = databases.listDocuments('652e8e4607298ced5902', '652e8e563085d6a5aad0',   
	[
        Query.equal('idPaziente', user.$id)
    ]);
		
	promise.then(function (response) {			
		setPunteggio(response.documents[1].punteggio)
		console.log("Livello Allenati: " + punteggio); // Success
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
				 <Text style={styles.titoloText}>
					BUON LAVORO
				</Text> 
			</View>
			
			<View>
				 <Text style={styles.sottotitoloText}>
					Sei sufficiente attivo,
					allenati e continua a migliorare!
				</Text> 
			</View>
			
			
			<View>
			<TouchableOpacity onPress={() => router.push("/ALLENATI")}>
				 <Text style={styles.paragrafo0Text}>
					Vai alla sezione  <Text style={styles.boldText}> ALLENATI </Text> 
					e inizia a muoverti!
				</Text> 
			</TouchableOpacity>
			</View>
			
		</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignItems: 'center',
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
  paragrafo0Text: {
	marginHorizontal: 10,
	color: '#560CCE',
    fontSize: 30,
	fontFamily: 'roboto-flex-regular',
	marginTop: 50,
	fontWeight: 'bold'
  },
  paragrafo1Text: {
    fontSize: 20,
	color: '#48d1cc',
	fontFamily: 'roboto-flex',
	marginHorizontal: 10,
	marginTop: 0,
  },
   boldText: {
    color: '#560CCE',
    fontSize: 30,
    fontFamily: 'ultra-black-regular',
	fontWeight: 'bold',
  },
  image: {
    alignSelf: "center",
	flex: 1,
    height: 200,
    width: 200,
  },	
});
