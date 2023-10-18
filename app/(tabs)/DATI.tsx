import { View, StyleSheet, StatusBar, ScrollView, Image, SafeAreaView, } from 'react-native';
import LogoViola from '../../components/UX/LogoViola'

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text,  } from '@/components/Themed';
import { useFonts } from 'expo-font';

export default function DATI() {

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
					DATI
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Calcola le tue calorie rispondendo a queste semplici domande
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

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
				<View style={{flex: 1, height: 4, backgroundColor: '#560CCE'}} />
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Il tuo livello è TORO.
				</Text>
			</View>	
			
			<View>
				<Image source={require('../../assets/ICONE/PNG/TOROSELEZIONATO.png')} style={styles.image} />
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
			
			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
				<View style={{flex: 1, height: 4, backgroundColor: '#560CCE'}} />
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

			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
				<View style={{flex: 1, height: 4, backgroundColor: '#560CCE'}} />
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
	width: 100,
    height: 100,
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
});

