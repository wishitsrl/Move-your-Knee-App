import * as React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, Image, SafeAreaView, Alert, Dimensions } from 'react-native';
import LogoViola from '../../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text } from '@/components/Themed';
import { useFonts } from 'expo-font';
import { useAuth } from '../context/auth';
import { Stack, useRouter } from "expo-router";
import client, { databases } from "../lib/appwrite-service";
import { Permission, Role,  ID, Query, } from "appwrite";
//import { BarChart, Grid, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
//import { BarChart } from 'react-native-chart-kit';
import { BarChart } from "react-native-gifted-charts";
import { useRef, useState, useCallback } from "react";

export default function DATI() {
	
	const data = [
            {
                value: 10,
                label: 'LUN',
            },
            {
                value: 10,
                label: 'MAR',
            },
            {
                value: 40,
                label: 'MER',
            },
            {
                value: 95,
                label: 'GIO',
            },
            {
                value: 85,
                label: 'VEN',
            },
			{
                value: 85,
                label: 'SAB',
            },
			{
                value: 85,
                label: 'DOM',
            },
        ]
	const { user } = useAuth();
	const router = useRouter();
	const [livelloAttuale, setLivelloAttuale] = React.useState('');  
	const [livelloImg, setLivelloImg] = React.useState(require("../../assets/ICONE/PNG/BRADIPONEUTRO_1.png"));  
	const [fontsLoaded, fontError] = useFonts({
		"roboto-flex": require('../../assets/fonts/RobotoFlex.ttf'),
		"roboto-flex-regular": require('../../assets/fonts/RobotoFlex-Regular.ttf'),
		"roboto-flex-variable": require('../../assets/fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),		
		"Acumin-Variable-Concept": require('../../assets/fonts/Acumin-Variable-Concept.ttf'),
		"AcuminVariableConcept-WideUltraBlack": require('../../assets/fonts/AcuminVariableConcept-WideUltraBlack.ttf'),
		"ultra-black": require('../../assets/fonts/ultrablackitalic.ttf'),
		"ultra-black-regular": require('../../assets/fonts/UltraBlackRegular.ttf'),
  });

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
		  await SplashScreen.hideAsync();
		}
	  }, [fontsLoaded, fontError]);

	  if (!fontsLoaded && !fontError) {
		return null;
	  } 
	
	const promise = databases.listDocuments('652e8e4607298ced5902', '656f2a8e31adc68dc82d',   
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

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
				
			<View>
				 <Text style={styles.titoloText}>
					DATI
				</Text>
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Segui i tuoi miglioramenti e avanza di livello.
				</Text>
			</View>

			<View style={{alignItems: 'center', marginTop: 30}}></View>

			<View>
				 <Text style={styles.sottotitoloText}>
					LIVELLO ATTUALE
				</Text>
			</View>	

			<View style={styles.row}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Il tuo livello è <Text style={styles.boldText}>{ livelloAttuale }</Text>.
				</Text>
			</View>	
			
			<View>
				<Image source={livelloImg} style={styles.image} />
			</View>	
			
			<View style={{alignItems: 'center', marginTop: 30}}></View>

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

			<View style={styles.row}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Media attività 
				</Text>
			</View>

			<View>
				<Text style={styles.boldText}>
					700 MET 
				</Text>
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Tempo di attività 
				</Text>
			</View>
			
			<View>
				<Text style={styles.boldText}>
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
  },
  scrollView: {
	flex: 1,
  },
  row: {
	alignItems: 'center',
    flexDirection: 'row',
	marginHorizontal: 30,
  },
  image: {
    alignSelf: "center",
	width: 300,
    height: 300,
  },
  titoloText: {
	marginHorizontal: 30,
	marginTop: 10,
	color: '#560CCE',
    fontSize: 40,
	fontFamily: 'AcuminVariableConcept-WideUltraBlack',
  },
  sottotitoloText: {
	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'roboto-flex-regular',
	marginBottom: 0,
  },
  boldText: {
    marginHorizontal: 30,
    color: '#560CCE',
    fontSize: 25,
	fontFamily: 'AcuminVariableConcept-WideUltraBlack',
	fontWeight: 'bold',
  },
  avanzamento: {
	marginHorizontal: 30,
	color: '#00B3AD',
    fontSize: 23,
	fontFamily: 'RobotoFlex',
	marginTop: 0,
	marginBottom: 0,
  },
});

