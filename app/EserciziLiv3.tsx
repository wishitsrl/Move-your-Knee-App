import * as React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image, Alert } from 'react-native';
import Button from '../components/UX/Button'
import Background from '../components/Background'
import LogoViola from '../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text,  } from '@/components/Themed';
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import client, { databases } from "./lib/appwrite-service";
import { Permission, Role,  ID, Query, } from "appwrite";
import { Card } from 'react-native-paper';
import { useRef, useState, useCallback } from "react";
import BackgroundTimer from 'react-native-background-timer';

const router = useRouter();
const CardData = [
  {
    esercizio: 'BLOCCO 1',
	nomeEsercizio: 'Cammino',
    titolo: 'Cammino',
	sottoTitolo: '',
	minuti: '10 minuti',
	img: require('../assets/IllustrazioniSchede/PNG/B1_Cammino_Icon.png'),
	page: '/ilTuoAllenamento',
  },
  {
    esercizio: 'BLOCCO 2',	
	nomeEsercizio: 'Weight training x 2',
    titolo: 'Weight training',
	sottoTitolo: '',
	minuti: '15 minuti x 2',
	img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_3_Icon.png'),
	page: '',
  },
  {
    esercizio: 'BLOCCO 3',
	nomeEsercizio: 'Calisthenics',
    titolo: 'Calisthenics',
	sottoTitolo: '',
	minuti: '15 minuti',
	img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_3_Icon.png'),
	page: '',
  },
  {
    esercizio: 'BLOCCO 4',
	nomeEsercizio: 'Stretching',
    titolo: 'Stretching',
	sottoTitolo: '',
	minuti: '5 minuti',
	img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_3_Icon.png'),
	page: '',
  },
];

const CardSottoData = [
  {
	nomeEsercizio: 'Rinforzo quadricipite',
	serie: '2 serie',
	ripetizioni: '10 ripetizioni x lato',
	riposo: '30 secondi di riposo',
	img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_1_Icon.png'),
	page: '',
  },
  {
	nomeEsercizio: 'Rinforzo muscoli posteriori',
	serie: '2 serie',
	ripetizioni: '10 ripetizioni',
	riposo: '30 secondi di riposo',
	img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_2_Icon.png'),
	page: '',
  },
  {
	nomeEsercizio: 'Rinforzo glutei',
	serie: '2 serie',
	ripetizioni: '10 ripetizioni x lato',
	riposo: '30 secondi di riposo',
	img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_3_Icon.png'),
	page: '',
  },
  {
	nomeEsercizio: 'Rinforzo quadricipite dorsiflessori della caviglia',
	serie: '3 SERIE - 10 RIP.',
	ripetizioni: '',
	riposo: '30 secondi di riposo',
	img: require('../assets/IllustrazioniSchede/PNG/B3_Squat.png'),
	page: '',
  },
  {
	nomeEsercizio: 'Rinforzo muscoli posteriori della coscia dorsiflessori della caviglia',
	serie: '3 SERIE - 10 RIP.',
	ripetizioni: '',
	riposo: '30 secondi di riposo',
	img: require('../assets/IllustrazioniSchede/PNG/B3_Affondi.png'),
	page: '',
  },
  {
	nomeEsercizio: 'Rinforzo della parete addominale',
	serie: '3 SERIE - 10 RIP.',
	ripetizioni: '',
	riposo: '30 secondi di riposo',
	img: require('../assets/IllustrazioniSchede/PNG/B3_Sit-Up.png'),
	page: '/sitUps',
  },
  {
	nomeEsercizio: 'POSA 1',
	serie: '3 SERIE - 10 RIP. (PER LATO)',
	ripetizioni: '',
	riposo: '30 secondi di riposo',
	img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching_1_Icon.png'),
	page: '',
  },
  {
	nomeEsercizio: 'POSA 2',
	serie: '3 SERIE - 10 RIP.',
	ripetizioni: '',
	riposo: '',
	img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching_2_Icon.png'),
	page: '',
  },
  {
	nomeEsercizio: 'POSA 3',
	serie: '3 SERIE - 10 RIP. (PER LATO)',
	ripetizioni: '',
	riposo: '',
	img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching_3_Icon.png'),
	page: '',
  },
];

export default function EserciziLiv3() {

	const { user } = useAuth();
	const router = useRouter();
    const params = useLocalSearchParams();
	const [fontsLoaded, fontError] = useFonts({
		"roboto-flex": require('../assets/fonts/RobotoFlex.ttf'),
		"roboto-flex-regular": require('../assets/fonts/RobotoFlex-Regular.ttf'),
		"roboto-flex-variable": require('../assets/fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),		
		"Acumin-Variable-Concept": require('../assets/fonts/Acumin-Variable-Concept.ttf'),
		"AcuminVariableConcept-WideUltraBlack": require('../assets/fonts/AcuminVariableConcept-WideUltraBlack.ttf'),
		"ultra-black": require('../assets/fonts/ultrablackitalic.ttf'),
		"ultra-black-regular": require('../assets/fonts/UltraBlackRegular.ttf'),
  });

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
		  await SplashScreen.hideAsync();
		}
	  }, [fontsLoaded, fontError]);

	  if (!fontsLoaded && !fontError) {
		return null;
	  } 
	  
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
				<View style={{ flexDirection: 'row',  }}>		
						<View style={{ flex: 1 }}>
							 <Text style={styles.titoloText}>
								LIVELLO TORO
							</Text>
						</View>
						<View>
						<TouchableOpacity onPress={() => router.push('/allenatiNavigation')}>
							<Image style={{width:36, height: 36,  marginRight: 30,  marginTop: 5}} source={require('../assets/ICONE/PNG/CHIUDINEUTRO.png')} />
						</TouchableOpacity>
						</View>
				</View>
			</View>
			
			<View>
				<Text style={styles.sottotitoloText}>
					45 minuti 3 volte a settimana, più 10 minuti camminata veloce per 2 volte a settimana 
				</Text>
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Seleziona un esercizio, apri la schermata e segui le istruzioni per il tuo allenamento
				</Text>
			</View>
			
			<View style={styles.livello}>
				<Text style={styles.paragrafo1Text}>
					{CardData[0].esercizio}
				</Text>
				<View style={{flexDirection: 'row', alignItems: 'center',}}>
					<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
				</View>
				
				<TouchableOpacity onPress={() => router.push( { pathname: '/ilTuoAllenamento/', params: { id:3, blocco:'CAMMINO' }}) }>		
				<Card style={styles.item}>
						<View style={{ flexDirection: 'row', marginHorizontal: 5 }}>		
							<View style={{  flex: 1 }}>
								<Text style={styles.paragrafo1BoldText}>{CardData[0].nomeEsercizio}</Text>
								<Text style={styles.textCard}>{CardData[0].minuti}</Text>	
							</View>
						<Image source= {CardData[0].img}  style={{width:100, height:100, }} />
					</View>
				</Card>
				</TouchableOpacity>
			
			<Text style={styles.paragrafo1Text}>
				{CardData[1].esercizio}
			</Text>

			<View style={{flexDirection: 'row', alignItems: 'center',}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<View style={{marginLeft: 15,}}>
					<Text style={styles.paragrafo1BoldText}>{CardData[1].nomeEsercizio}</Text>
				</View>
				<Text style={styles.indicazioniText}>
					Svolgere ogni esercizio seguendo le indicazioni.
					Concluso il primo circuito, ripetere gli stessi esercizi una seconda volta.
				</Text>
				<Text style={styles.indicazioniTextSenzaSpazio}>
					Utilizzare delle cavigliere da MAX 2 KG.
				</Text>
			</View>
			
			<TouchableOpacity onPress={() => router.push( { pathname: '/ilTuoAllenamento/', params: { id:3, blocco:'RINFORZO QUADRICIPITE' }}) }>		
			<Card style={styles.item}>
				<View style={{ flexDirection: 'row', marginHorizontal: 5 }}>		
					<View style={{ flex: 1 }}>
						<Text style={styles.paragrafo1BoldText}>{CardSottoData[0].nomeEsercizio}</Text>
						<Text style={styles.paragrafo1Text}>{CardSottoData[0].serie}</Text>
						<Text style={styles.paragrafo1Text}>{CardSottoData[0].ripetizioni}</Text>
						<Text style={styles.paragrafo1Text}>{CardSottoData[0].riposo}</Text>
					</View>					
					<Image source= {CardSottoData[0].img}  style={{width:100, height:100}} />
				</View>
			</Card>
			</TouchableOpacity>
			
			<TouchableOpacity onPress={() => router.push( { pathname: '/ilTuoAllenamento/', params: { id:3, blocco:'RINFORZO MUSCOLI' }}) }>		
			<Card style={styles.item}>
				<View style={{ flexDirection: 'row', marginHorizontal: 5}}>		
					<View style={{ flex: 1 }}>
						<Text style={styles.paragrafo1BoldText}>{CardSottoData[1].nomeEsercizio}</Text>
						<Text style={styles.paragrafo1Text}>{CardSottoData[1].serie}</Text>
						<Text style={styles.paragrafo1Text}>{CardSottoData[1].ripetizioni}</Text>
						<Text style={styles.paragrafo1Text}>{CardSottoData[1].riposo}</Text>
					</View>
					<Image source= {CardSottoData[1].img}  style={{width:100, height:100}} />
				</View>
			</Card>
			</TouchableOpacity>
	
			<TouchableOpacity onPress={() => router.push( { pathname: '/ilTuoAllenamento/', params: { id:3, blocco:'RINFORZO GLUTEI' }}) }>		
			<Card style={styles.item}>
				<View style={{ flexDirection: 'row', marginHorizontal: 5 }}>		
					<View style={{ flex: 1 }}>
						<Text style={styles.paragrafo1BoldText}>{CardSottoData[2].nomeEsercizio}</Text>
						<Text style={styles.paragrafo1Text}>{CardSottoData[2].serie}</Text>
						<Text style={styles.paragrafo1Text}>{CardSottoData[2].ripetizioni}</Text>
						<Text style={styles.paragrafo1Text}>{CardSottoData[2].riposo}</Text>
					</View>	
					<Image source= {CardSottoData[2].img}  style={{width:100, height:100}} />
				</View>
			</Card>			
			</TouchableOpacity>
			
			<Text style={styles.paragrafo1Text}>
				{CardData[2].esercizio}
			</Text>
				
			<View style={{flexDirection: 'row', alignItems: 'center',}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
				
			<View style={{marginLeft: 15,}}>
				<Text style={styles.paragrafo1BoldText}>{CardData[3].nomeEsercizio}</Text>
			</View>		
			<View>
				<Text style={styles.indicazioniText}>
					Svolgere ogni esercizio seguendo le indicazioni
				</Text>
			</View>
			
			<TouchableOpacity onPress={() => router.push( { pathname: '/ilTuoAllenamento/', params: { id:3, blocco:'POSA 1' }}) }>		
			<Card style={styles.item}>
				<View style={{ flexDirection: 'row', marginHorizontal: 5 }}>		
					<View style={{ flex: 1 }}>
						<Text style={styles.paragrafo1BoldText}>{CardSottoData[6].nomeEsercizio}</Text>
					</View>
					<Image source= {CardSottoData[6].img}  style={{width:100, height:100}} />
				</View>
			</Card>
			</TouchableOpacity>
			
			<TouchableOpacity onPress={() => router.push( { pathname: '/ilTuoAllenamento/', params: { id:3, blocco:'POSA 2' }}) }>		
			<Card style={styles.item}>
				<View style={{ flexDirection: 'row', marginHorizontal: 5 }}>		
					<View style={{ flex: 1 }}>
						<Text style={styles.paragrafo1BoldText}>{CardSottoData[7].nomeEsercizio}</Text>
					</View>
					<Image source= {CardSottoData[7].img}  style={{width:100, height:100}} />				
				</View>
			</Card>
			</TouchableOpacity>
			
			<TouchableOpacity onPress={() => router.push( { pathname: '/ilTuoAllenamento/', params: { id:3, blocco:'POSA 3' }}) }>		
			<Card style={styles.item}>
				<View style={{ flexDirection: 'row', marginHorizontal: 5 }}>		
					<View style={{ flex: 1 }}>
						<Text style={styles.paragrafo1BoldText}>{CardSottoData[8].nomeEsercizio}</Text>
					</View>		
						<Image source= {CardSottoData[8].img}  style={{width:100, height:100}} />
				</View>
			</Card>	
			</TouchableOpacity>
			<View>
				<TouchableOpacity 
					style={styles.buttonContainer}
					onPress={() => router.replace('/fineSessione')}>
					<Text style={styles.buttonTextStyle}>CONCLUDI ALLENAMENTO</Text>
				</TouchableOpacity>
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
  scrollView: {
	flex: 1,
  },
  text: {
    fontSize: 42,
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
    fontSize: 20,
	fontFamily: 'roboto-flex',
	marginTop: 10,
  },
  paragrafo1Text: {
	color: '#560CCE',
    fontSize: 20,
	fontFamily: 'roboto-flex-variable',
	marginTop: 6,
	marginBottom: 4,
  },
  paragrafo2Text: {
	marginHorizontal: 30,
    fontSize: 18,
	color: 'grey',
	fontFamily: 'roboto-flex',
	marginTop: 0,
	marginBottom: 15,
  },
  boldText: {
	fontWeight: 'bold',
  },
  item: {
    padding: 5,
	borderRadius: 7,
	borderColor: "lightgrey",
	borderWidth: 1,
	margin: 5,
	marginTop: 12,
  },
  livello: {
	marginHorizontal: 30,
  },
  paragrafo1BoldText: {
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'ultra-black-regular',
	marginTop: 15,
	marginBottom: 3,
	fontWeight: 'bold',
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
  textCard: {
	color: '#560CCE',
    fontSize: 20,
	fontFamily: 'roboto-flex',
  },
  indicazioniText: {
	marginHorizontal: 15,
    fontSize: 18,
	color: 'grey',
	fontFamily: 'roboto-flex',
	marginTop: 0,
  },
  indicazioniTextSenzaSpazio: {
  	marginHorizontal: 15,
    fontSize: 18,
	color: 'grey',
	fontFamily: 'roboto-flex',
	marginTop: 0,
	marginBottom: 15,
  }
});

