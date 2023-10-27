import * as React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image, Alert } from 'react-native';
import Button from '../../components/UX/Button'
import Background from '../../components/Background'
import LogoViola from '../../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text,  } from '@/components/Themed';
import { useAuth } from '../context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import client, { databases } from "../lib/appwrite-service";
import { Permission, Role,  ID, Query, } from "appwrite";
import { Card } from 'react-native-paper';

const router = useRouter();

const CardData = [
  {
    livello: 'LIVELLO 1',
    titolo: 'Bradipo',
	body: 'MENO DI 450 PUNTI.',
	avanzamento : 'Inattivo.',
	img: require('../../assets/ICONE/PNG/BRADIPONEUTRO_1.png'),
	page: "/EserciziLiv1"
  },
  {
    livello: 'LIVELLO 2',
    titolo: 'Tartaruga',
	body: 'PIÙ DI 450 PUNTI.',
	avanzamento : 'Poco attivo.',
	img: require('../../assets/ICONE/PNG/TARTARUGASELEZIONATO.png'),
	page: "/EserciziLiv2"
  },
  {
    livello: 'LIVELLO 3',
    titolo: 'Toro',
	body: 'DA 450 A 900 PUNTI.',
	avanzamento : 'Mediamente attivo.',
	img: require('../../assets/ICONE/PNG/TOROSELEZIONATO.png'),
	page: "/EserciziLiv3"
  },
    {
    livello: 'LIVELLO 4',
    titolo: 'Tigre',
	body: 'DA 900 A 1800 PUNTI.',
	avanzamento : 'Più che attivo.',
	img: require('../../assets/ICONE/PNG/TIGRESELEZIONATO.png'),
	page: "/EserciziLiv4"
  },
    {
    livello: 'LIVELLO 5',
    titolo: 'Falco',
	body: 'PIÙ DI 1800 PUNTI.',
	avanzamento : 'Molto attivo.',
	img: require('../../assets/ICONE/PNG/FALCOSELEZIONATO.png'),
	page: "/EserciziLiv5"
  },
];

export default function ALLENATI() {
   const { user } = useAuth();
  
   const [livelloAttuale, setLivelloAttuale] = React.useState('Bradipo');  
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
				console.log("Livello Allenati: " + livelloAttuale); // Success
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

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
				
			<View>
				 <Text style={styles.titoloText}>
					ALLENATI
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Il tuo livello è { livelloAttuale }.
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Svolgi gli esercizi e continua a migliorare.
				</Text>
			</View>
			
			<View style={styles.livello}>
				<Text style={styles.paragrafo1Text}>
						{CardData[0].livello}
					</Text>
					<View style={{flexDirection: 'row', alignItems: 'center',}}>
						<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
					</View>

				<TouchableOpacity onPress={() => router.push(CardData[0].page)}>		
					<Card style={styles.item}>
						<View style={{alignItems:"left", flex:1}}>
								<Text style={styles.titoloText}>{CardData[0].titolo}</Text>
								<Text style={styles.paragrafo1Text}>{CardData[0].body}</Text>
								<Text style={styles.paragrafo1Text}>{CardData[0].avanzamento}</Text>
								<Image source= {CardData[0].img}  style={{width:100, height:100}} />						
						</View>
					</Card>
				</TouchableOpacity>
				
					<Text style={styles.paragrafo1Text}>
						{CardData[1].livello}
					</Text>
					<View style={{flexDirection: 'row', alignItems: 'center',}}>
						<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
					</View>

				<TouchableOpacity onPress={() => router.push(CardData[1].page)}>		
					<Card style={styles.item}>
						<View style={{alignItems:"left", flex:1}}>
								<Text style={styles.titoloText}>{CardData[1].titolo}</Text>
								<Text style={styles.paragrafo1Text}>{CardData[1].body}</Text>
								<Text style={styles.paragrafo1Text}>{CardData[1].avanzamento}</Text>
								<Image source= {CardData[1].img}  style={{width:100, height:100}} />						
						</View>
					</Card>
				</TouchableOpacity>
				
				<Text style={styles.paragrafo1Text}>
						{CardData[2].livello}
					</Text>
					<View style={{flexDirection: 'row', alignItems: 'center',}}>
						<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
					</View>

				<TouchableOpacity onPress={() => router.push(CardData[2].page)}>		
					<Card style={styles.item}>
						<View style={{alignItems:"left", flex:1}}>
								<Text style={styles.titoloText}>{CardData[2].titolo}</Text>
								<Text style={styles.paragrafo1Text}>{CardData[2].body}</Text>
								<Text style={styles.paragrafo1Text}>{CardData[2].avanzamento}</Text>
								<Image source= {CardData[2].img}  style={{width:100, height:100}} />						
						</View>
					</Card>
				</TouchableOpacity>
				
				<Text style={styles.paragrafo1Text}>
						{CardData[3].livello}
					</Text>
					<View style={{flexDirection: 'row', alignItems: 'center',}}>
						<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
					</View>

				<TouchableOpacity onPress={() => router.push(CardData[3].page)}>		
					<Card style={styles.item}>
						<View style={{alignItems:"left", flex:1}}>
								<Text style={styles.titoloText}>{CardData[3].titolo}</Text>
								<Text style={styles.paragrafo1Text}>{CardData[3].body}</Text>
								<Text style={styles.paragrafo1Text}>{CardData[3].avanzamento}</Text>
								<Image source= {CardData[3].img}  style={{width:100, height:100}} />						
						</View>
					</Card>
				</TouchableOpacity>
			
					<Text style={styles.paragrafo1Text}>
						{CardData[4].livello}
					</Text>
					<View style={{flexDirection: 'row', alignItems: 'center',}}>
						<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
					</View>

				<TouchableOpacity onPress={() => router.push(CardData[4].page)}>		
					<Card style={styles.item}>
						<View style={{alignItems:"left", flex:1}}>
								<Text style={styles.titoloText}>{CardData[4].titolo}</Text>
								<Text style={styles.paragrafo1Text}>{CardData[4].body}</Text>
								<Text style={styles.paragrafo1Text}>{CardData[4].avanzamento}</Text>
								<Image source= {CardData[4].img}  style={{width:100, height:100}} />						
						</View>
					</Card>
				</TouchableOpacity>
			
			</View>
		</ScrollView>		
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
	marginTop: 50,
	fontWeight: 'bold'
  },
  paragrafo1Text: {
	marginHorizontal: 10,
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'roboto-flex',
	marginTop: 10,
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
  item: {
    padding: 20,
	borderRadius: 8,
	borderColor: "grey",
	borderWidth: 3,
	flexDirection: 'row',
	margin: 10,
  },
  livello: {
	flex:1,
	fontWeight: 'bold',
	marginHorizontal: 10,
  }  
});

