import * as React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, Image, SafeAreaView, Alert } from 'react-native';
import LogoViola from '../../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text,  } from '@/components/Themed';
import { useFonts } from 'expo-font';
import { useAuth } from '../context/auth';
import { Stack, useRouter } from "expo-router";
import client, { databases } from "../lib/appwrite-service";
import { Permission, Role,  ID, Query, } from "appwrite";

export default function DATI() {
  const { user } = useAuth();
  const router = useRouter();
  const [livelloAttuale, setLivelloAttuale] = React.useState('Bradipo');  
  const [livelloImg, setLivelloImg] = React.useState(require("../../assets/ICONE/PNG/BRADIPONEUTRO_1.png"));  
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
	const promise = databases.listDocuments('652e8e4607298ced5902', '652e8e563085d6a5aad0',   
	[
        Query.equal('idPaziente', user.$id)
    ]);
	promise.then(function (response) {	
			let length = response.documents.length;
			if(length!=0) {
				setLivelloAttuale(response.documents[length-1].livello)
				console.log("Livello dati: " + livelloAttuale); // Success
		switch (livelloAttuale) {
		case 'Bradipo':
			setLivelloImg(require("../../assets/ICONE/PNG/BRADIPONEUTRO_1.png"));
			break;
		case 'Tartaruga':
			setLivelloImg(require("../../assets/ICONE/PNG/TARTARUGASELEZIONATO.png"));
			break;
		case 'Toro':
			setLivelloImg(require("../../assets/ICONE/PNG/TOROSELEZIONATO.png"));
			break;
		case 'Tigre':
			setLivelloImg(require("../../assets/ICONE/PNG/TIGRESELEZIONATO.png"));
			break;
		case 'Falco':
			setLivelloImg(require("../../assets/ICONE/PNG/FALCOSELEZIONATO.png"));
			break;			
		  default:
			setLivelloImg(require("../../assets/ICONE/PNG/BRADIPONEUTRO_1.png"));
		}
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

			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
				
			<View>
				 <Text style={styles.titoloText}>
					DATI
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Segui i tuoi miglioramenti e avanza di livello.
				</Text>
			</View>

			<View>
				 <Text style={styles.sottotitoloText}>
					LIVELLO ATTUALE
				</Text>
			</View>	

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Il tuo livello è { livelloAttuale }.
				</Text>
			</View>	
			
			<View>
				<Image source={livelloImg} style={styles.image} />
			</View>	
			
			<View>
				<Text style={styles.avanzamento}>
					Avanzamento livello
				</Text>
							
			</View>
			
			<View>
				<Text style={styles.sottotitoloText}>
					LE TUE STATISTICHE
				</Text>
			</View>
			
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
			
			<View>
				<Text style={styles.sottotitoloText}>
					Segui il diagramma, per visualizzare i tuoi avazamenti settimanali
				</Text>
			</View>

			<View>

			</View>
			
			<View>
				<Text style={styles.sottotitoloText}>
					PANORAMICA DEI DATI
				</Text>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Media attività 
				</Text>
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					700 MET 
				</Text>
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					2 H e 40 minuti 
				</Text>
			</View>

		</ScrollView>
    </SafeAreaView>
	
 )
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
  image: {
    alignSelf: "center",
	width: 200,
    height: 200,
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
	fontWeight: 'bold',
  },
  paragrafo1Text: {
	marginHorizontal: 10,
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'roboto-flex',
	marginTop: 10,
	marginBottom: 20,
  },
  paragrafo2Text: {
	marginHorizontal: 10,
    fontSize: 20,
	fontFamily: 'roboto-flex',
	marginTop: 0,
	marginBottom: 30,
  },
  boldText: {
	fontWeight: 'bold',
  },
  paragrafo1TextColorVerde: {
    fontSize: 20,
	color: '#48d1cc',
	fontFamily: 'roboto-flex',
	marginHorizontal: 10,
	marginTop: 0,
  },
  avanzamento: {
    fontSize: 20,
	color: '#48d1cc',
	fontFamily: 'roboto-flex',
	marginHorizontal: 10,
	marginTop: 0,
  
  }
});

