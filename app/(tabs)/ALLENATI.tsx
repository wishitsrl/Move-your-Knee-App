import * as React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
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

const renderItem = ({item}) => (
<TouchableOpacity onPress={() => router.push(item.page)}>
	<View style={styles.livello}>
		<Text style={styles.paragrafo1Text}>
			{item.livello}
		</Text>
		<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 2}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
		</View>
	<View style={styles.item}>	  
		<View style={{alignItems:"left", flex:1}}>
			<Text style={styles.sottotitoloText}>{item.titolo}</Text>
			<Text style={styles.paragrafo1Text}>{item.body}</Text>
			<Text style={styles.paragrafo1Text}>{item.avanzamento}</Text>
		</View>
        <Image source= {item.img}  style={{width:100, height:100}} />
    </View>
	</View>	
</TouchableOpacity>
);

export default function ALLENATI() {
   const { user } = useAuth();
   const router = useRouter();
   const [livelloAttuale, setLivelloAttuale] = React.useState('');  
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
		setLivelloAttuale(response.documents[0].livello)
		console.log("Livello Allenati: " + livelloAttuale); // Success
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

			<View>
				 <FlatList style={{ marginTop: 15 }}
					data={CardData}
					renderItem={ renderItem }
					keyExtractor={item => item.titolo}			
				/>
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
	borderColor: "black",
	borderWidth: 3,
	flexDirection: 'row',
	margin: 10,
  },
  livello: {
	flex:1,
	fontWeight: 'bold',
  }  
});

