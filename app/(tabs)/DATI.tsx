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
			
			<View style={{ flex: 1, padding: 10, alignItems: 'center', marginLeft: 8, marginBottom: 20 }}>
				 <BarChart 
					barWidth={22}
					hideDataPoints={false}
					noOfSections={3}
					barBorderRadius={10}
					frontColor="#560CCE"
					data={data}
					xAxisTextStyle={{color: '#560CCE'}}
					yAxisThickness={0}
					xAxisThickness={0}
                    gridMin={0}
					xAxisLabelTextStyle={{color: '#560CCE', textAlign: 'center'}}
					xAxisColor={'#560CCE'}
					yAxisTextStyle={{color: '#560CCE'}}
				/>
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
	marginHorizontal: 10,
  },
  image: {
    alignSelf: "center",
	width: 200,
    height: 200,
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
    fontSize: 25,
	fontFamily: 'roboto-flex-regular',
	marginBottom: 10,
	fontWeight: 'bold'
  },
  boldText: {
    color: '#560CCE',
    fontSize: 22,
	marginHorizontal: 10,
	fontFamily: 'ultra-black-regular',
	fontWeight: 'bold',
  },
  avanzamento: {
    fontSize: 20,
	color: '#48d1cc',
	fontFamily: 'roboto-flex',
	marginHorizontal: 10,
	marginTop: 0,
  },
});

