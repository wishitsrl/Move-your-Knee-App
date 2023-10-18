import { StyleSheet, SafeAreaView, ScrollView, StatusBar, } from 'react-native';
import Button from '../../components/UX/Button'
import Background from '../../components/Background'
import LogoViola from '../../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useAuth } from '../context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";

export default function CONOSCITI() {
   const { signOut, user } = useAuth();
   const router = useRouter();
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
					CONOSCITI
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Calcola le tue calorie rispondendo a queste semplici domande
				</Text>
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Alcune indicazioni
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Il questionario ti aiuta a misurare
					il tipo e la quantità di attività fisica che fai normalmente.
				</Text>
			</View>	

			<View>
				<Text style={styles.paragrafo2Text}>
					Per questo, le domande fanno riferimento 
					all' attività che hai svolto negli ultimi 7 giorni 
					al lavoro, per spostarti da un posto all'altro,
					e nel tuo tempo libero, e che ti hanno tenuto impegnato 
					per almeno 10 minuti consecutivi.
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo1Text}>
					Le attività fisiche <Text style={styles.boldText}>intense</Text>, sono quelle che richiedono uno sforzo fisico elevato.
				</Text>
			</View>
			
			<View>			
				<Text style={styles.paragrafo2Text}>
					Dunque sentirai che il ritmo del respiro è molto più elevato del normale,
					oltre a sudare tanto e a non riuscire a parlare.
				</Text>
			</View>
			
			<View>	
				<Text style={styles.paragrafo1Text}>
					Le attività fisiche <Text style={styles.boldText}>moderate</Text>, richiedono uno sforzo fisico moderato.
				</Text>
			</View>

			<View>				
				<Text style={styles.paragrafo2Text}>
					Vuol dire che sono quelle che ti costringono a respirare con un ritmo 
					moderatamente più elevato del normale. Dunque, anche se non dovessi riuscire a cantare
					la tua canzone preferita, potrai sempre parlare.
				</Text> 
			</View>		
						
			<View style={styles.buttonContainer}>
				<Button mode="contained" onPress={() => router.push('/questionario')}>INIZIO IL QUESTIONARIO</Button>    
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
  buttonContainer: {
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  }
});

