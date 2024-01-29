import * as React from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, ScrollView, StatusBar, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import Background from '../components/Background'
import LogoViola from '../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text } from '@/components/Themed';
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import client, { databases } from "./lib/appwrite-service";
import { Permission, Role,  ID, } from "appwrite";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { SelectList } from 'react-native-dropdown-select-list'
import { useRef, useCallback } from "react";
import Swiper from 'react-native-swiper'

export default function ILTUOALLENAMENTO() {
	const { user } = useAuth();
    const router = useRouter();
	const params = useLocalSearchParams();
	const { id, blocco, image } = params
    const [imagePatch, setImagePatch] = React.useState(''); 
    const [minuti, setMinuti] = React.useState(''); 
	const [serie, setSerie] = React.useState(''); 
    const [ripetizioni, setRipetizioni] = React.useState(''); 	
	const [descrizione, setDescrizione] = React.useState('');   
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
	const Data = [
	{
		id:'2',
		idEsercizio: '0',
		nomeEsercizio: 'CAMMINO',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Camminare per 5 minuti a passo moderato.",
		esempio: "(ad esempio i minuti di cammino)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B1_Cammino.png'),
	  },
	  {
		id:'2',
		idEsercizio: '1',
		nomeEsercizio: 'RINFORZO QUADRICIPITE',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni x lato',
		riposo: '30 secondi di riposo',
		descrizione: "Da seduto, sollevare ciascuna gamba, portando il piede all'altezza del ginocchio.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_1.png'),
	  },
	  {
  		id:'2',
		idEsercizio: '2',
		nomeEsercizio: 'RINFORZO MUSCOLI',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni',
		riposo: '30 secondi di riposo',
		descrizione: "Poggiandosi alla spalliera di una sedia, portarsi sulle punte dei piedi. Attendere pochi secondi e poi poggiare nuovamente i talloni.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_2.png'),
	  },
	  {
    	id:'2',
		idEsercizio: '3',
		nomeEsercizio: 'RINFORZO GLUTEI',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni x lato',
		riposo: '30 secondi di riposo',
		descrizione: "Dalla posa quadrupedica, con entrambe le braccia a terra (mani parallele alle spalle), sollevare una gamba portandola all'altezza del gluteo, tenendo il piede a martello. Conclusa la prima serie, passare alla seconda.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_3.png'),
	  },
	  {
	    id:'2',
		idEsercizio: '4',
		nomeEsercizio: 'POSA 1',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Steso su un fianco, afferrare il piede e portarlo al gluteo. Mantenere la posizione per qualche secondo, distendendo i muscoli della coscia, poi rilasciare.",
		esempio: "(ad esempio minuti in cui hai mantenuto la posizione)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching.png'),
	  },
	  {
	    id:'2',
		idEsercizio: '5',
		nomeEsercizio: 'POSA 2',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Da seduto, con le gambe divaricate, portare le braccia davanti a sè, dunque spingersi in avanti, distendendo i muscoli delle gambe e della schiena.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching_2.png'),
	  },
	  {
	    id:'2',
		idEsercizio: '6',
		nomeEsercizio: 'POSA 3',
		serie: '',
		ripetizioni: '',
		riposo: '',
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		descrizione: "Da seduto, con le gambe divaricate, portare le braccia davanti a sè, dunque spingersi in avanti, distendendo i muscoli delle gambe e della schiena.",
		img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching_3.png'),
	  },
	  {
	  	id:'3',
		idEsercizio: '7',
		nomeEsercizio: 'CAMMINO',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Camminare per 10 minuti a passo moderato.",
		esempio: "(ad esempio i minuti di cammino)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B1_Cammino.png'),
	  },
	  {
		id:'3',
		idEsercizio: '8',
		nomeEsercizio: 'RINFORZO QUADRICIPITE',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni x lato',
		riposo: '30 secondi di riposo',
		descrizione: "Da seduto, indossare delle cavigliere di MAX 2 KG, e sollevare ciascuna gamba, portando il piede all'altezza del ginocchio.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_1.png'),
	  },
	  {
  		id:'3',
		idEsercizio: '9',
		nomeEsercizio: 'RINFORZO MUSCOLI',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni',
		riposo: '30 secondi di riposo',
		descrizione: "Indossare delle cavigliere di MAX 2 KG.\nPoggiandosi alla spalliera di una sedia, portarsi sulle punte dei piedi. Attendere pochi secondi e poi poggiare nuovamente i talloni.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_2.png'),
	  },
	  {
    	id:'3',
		idEsercizio: '10',
		nomeEsercizio: 'RINFORZO GLUTEI',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni x lato',
		riposo: '30 secondi di riposo',
		descrizione: "Indossare delle cavigliere di MAX 2 KG.\nDalla posa quadrupedica, con entrambe le braccia a terra (mani parallele alle spalle), sollevare una gamba portandola all'altezza del gluteo, tenendo il piede a martello.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_3.png'),
	  },
	  {
	    id:'3',
		idEsercizio: '11',
		nomeEsercizio: 'POSA 1',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Steso su un fianco, afferrare il piede e portarlo al gluteo. Mantenere la posizione per qualche secondo, distendendo i muscoli della coscia, poi rilasciare.",
		esempio: "(ad esempio minuti in cui hai mantenuto la posizione)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching.png'),
	  },
	  {
	    id:'3',
		idEsercizio: '12',
		nomeEsercizio: 'POSA 2',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Da seduto, con le gambe divaricate, portare le braccia davanti a sè, dunque spingersi in avanti, distendendo i muscoli delle gambe e della schiena.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching_2.png'),
	  },
	  {
	    id:'3',
		idEsercizio: '13',
		nomeEsercizio: 'POSA 3',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Da seduto, con le gambe divaricate, portare le braccia davanti a sè, dunque spingersi in avanti, distendendo i muscoli delle gambe e della schiena.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching_3.png'),
	  },	 
	  {
	  	id:'4',
		idEsercizio: '14',
		nomeEsercizio: 'JOGGING',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Correre per 10 minuti.",
		esempio: "(ad esempio i minuti di corsa)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B1_Corsa.png'),
	  },
	  {
		id:'4',
		idEsercizio: '15',
		nomeEsercizio: 'RINFORZO QUADRICIPITE',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni x lato',
		riposo: '30 secondi di riposo',
		descrizione: "Da seduto, indossare delle cavigliere di MAX 2 KG, e sollevare ciascuna gamba, portando il piede all'altezza del ginocchio.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_1.png'),
	  },
	  {
  		id:'4',
		idEsercizio: '16',
		nomeEsercizio: 'RINFORZO MUSCOLI',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni',
		riposo: '30 secondi di riposo',
		descrizione: "Indossare delle cavigliere di MAX 2 KG.\nPoggiandosi alla spalliera di una sedia, portarsi sulle punte dei piedi. Attendere pochi secondi e poi poggiare nuovamente i talloni.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_2.png'),
	  },
	  {
    	id:'4',
		idEsercizio: '17',
		nomeEsercizio: 'RINFORZO GLUTEI',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni x lato',
		riposo: '30 secondi di riposo',
		descrizione: "Indossare delle cavigliere di MAX 2 KG.\nDalla posa quadrupedica, con entrambe le braccia a terra (mani parallele alle spalle), sollevare una gamba portandola all'altezza del gluteo, tenendo il piede a martello.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_4.png'),
	  },
	  {
	    id:'4',
		idEsercizio: '18',
		nomeEsercizio: 'POSA 1',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Steso su un fianco, afferrare il piede e portarlo al gluteo. Mantenere la posizione per qualche secondo, distendendo i muscoli della coscia, poi rilasciare.",
		esempio: "(ad esempio minuti in cui hai mantenuto la posizione)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching.png'),
	  },
	  {
	    id:'4',
		idEsercizio: '19',
		nomeEsercizio: 'POSA 2',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Da seduto, con le gambe divaricate, portare le braccia davanti a sè, dunque spingersi in avanti, distendendo i muscoli delle gambe e della schiena.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching_2.png'),
	  },
	  {
	    id:'4',
		idEsercizio: '20',
		nomeEsercizio: 'POSA 3',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Da seduto, con le gambe divaricate, portare le braccia davanti a sè, dunque spingersi in avanti, distendendo i muscoli delle gambe e della schiena.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching_3.png'),
	  },
	  {
	    id:'4',
		idEsercizio: '21',
		nomeEsercizio: 'SQUAT',
		serie: '3 serie',
		ripetizioni: '10 ripetizioni',
		riposo: '30 secondi riposo',
		descrizione: "In piedi, con gambe leggermente divaricate, parallele alle spalle, scendere in posizione di SQUAT, mantenendo dritta la schiena e portando in fuori il bacino.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B3_Squat.png'),
	  },
	  {
	    id:'4',
		idEsercizio: '22',
		nomeEsercizio: 'AFFONDI',
		serie: '3 serie',
		ripetizioni: '10 ripetizioni alternate',
		riposo: '30 secondi riposo',
		descrizione: "In piedi, con gambe parallele e leggermente divaricate, scendere in posizione di AFFONDO, portando indietro una gamba. Alternare tra loro le gambe durante l'esercizio.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B3_Affondi.png'),
	  },
	  	  {
	    id:'4',
		idEsercizio: '23',
		nomeEsercizio: 'SIT-UPS',
		serie: '3 serie',
		ripetizioni: '10 ripetizioni',
		riposo: '30 secondi riposo',
		descrizione: "Da stesi, in posizione supina con la schiena sul pavimento, le mani davanti al proprio corpo, e le ginocchia piegate, sollevarsi dal pavimento, stimolando i muscoli addominali e senza sforzare la schiena e il collo.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B3_Sit-Up.png'),
	  },
	  {
	  	id:'5',
		idEsercizio: '24',
		nomeEsercizio: 'JOGGING',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Correre per 10 minuti.",
		esempio: "(ad esempio i minuti di corsa)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B1_Corsa.png'),
	  },
	  {
		id:'5',
		idEsercizio: '25',
		nomeEsercizio: 'RINFORZO QUADRICIPITE',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni x lato',
		riposo: '30 secondi di riposo',
		descrizione: "Da seduto, indossare delle cavigliere di MAX 2 KG, e sollevare ciascuna gamba, portando il piede all'altezza del ginocchio.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_1.png'),
	  },
	  {
  		id:'5',
		idEsercizio: '26',
		nomeEsercizio: 'RINFORZO MUSCOLI',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni',
		riposo: '30 secondi di riposo',
		descrizione: "Indossare delle cavigliere di MAX 2 KG.\nPoggiandosi alla spalliera di una sedia, portarsi sulle punte dei piedi. Attendere pochi secondi e poi poggiare nuovamente i talloni.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_2.png'),
	  },
	  {
    	id:'5',
		idEsercizio: '27',
		nomeEsercizio: 'RINFORZO GLUTEI',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni x lato',
		riposo: '30 secondi di riposo',
		descrizione: "Indossare delle cavigliere di MAX 2 KG.\nDalla posa quadrupedica, con entrambe le braccia a terra (mani parallele alle spalle), sollevare una gamba portandola all'altezza del gluteo, tenendo il piede a martello.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_4.png'),
	  },
	  {
	    id:'5',
		idEsercizio: '28',
		nomeEsercizio: 'POSA 1',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Steso su un fianco, afferrare il piede e portarlo al gluteo. Mantenere la posizione per qualche secondo, distendendo i muscoli della coscia, poi rilasciare.",
		esempio: "(ad esempio minuti in cui hai mantenuto la posizione)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching.png'),
	  },
	  {
	    id:'5',
		idEsercizio: '29',
		nomeEsercizio: 'POSA 2',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Da seduto, con le gambe divaricate, portare le braccia davanti a sè, dunque spingersi in avanti, distendendo i muscoli delle gambe e della schiena.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching_2.png'),
	  },
	  {
	    id:'5',
		idEsercizio: '30',
		nomeEsercizio: 'POSA 3',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Da seduto, con le gambe divaricate, portare le braccia davanti a sè, dunque spingersi in avanti, distendendo i muscoli delle gambe e della schiena.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching_3.png'),
	  },
	  {
	    id:'5',
		idEsercizio: '31',
		nomeEsercizio: 'SQUAT',
		serie: '3 serie',
		ripetizioni: '10 ripetizioni',
		riposo: '30 secondi riposo',
		descrizione: "In piedi, con gambe leggermente divaricate, parallele alle spalle, scendere in posizione di SQUAT, mantenendo dritta la schiena e portando in fuori il bacino.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B3_Squat.png'),
	  },
	  {
	    id:'5',
		idEsercizio: '32',
		nomeEsercizio: 'AFFONDI',
		serie: '3 serie',
		ripetizioni: '10 ripetizioni alternate',
		riposo: '30 secondi riposo',
		descrizione: "In piedi, con gambe parallele e leggermente divaricate, scendere in posizione di AFFONDO, portando indietro una gamba. Alternare tra loro le gambe durante l'esercizio.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B3_Affondi.png'),
	  },
	  	  {
	    id:'5',
		idEsercizio: '33',
		nomeEsercizio: 'SIT-UPS',
		serie: '3 serie',
		ripetizioni: '10 ripetizioni',
		riposo: '30 secondi riposo',
		descrizione: "Da stesi, in posizione supina con la schiena sul pavimento, le mani davanti al proprio corpo, e le ginocchia piegate, sollevarsi dal pavimento, stimolando i muscoli addominali e senza sforzare la schiena e il collo.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B3_Sit-Up.png'),
	  },
	  {
	  	id:'6',
		idEsercizio: '34',
		nomeEsercizio: 'JOGGING',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Correre per 10 minuti.",
		esempio: "(ad esempio i minuti di corsa)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B1_Cammino.png'),
	  },
	  {
		id:'6',
		idEsercizio: '35',
		nomeEsercizio: 'RINFORZO QUADRICIPITE',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni x lato',
		riposo: '30 secondi di riposo',
		descrizione: "Da seduto, indossare delle cavigliere di MAX 2 KG, e sollevare ciascuna gamba, portando il piede all'altezza del ginocchio.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_1.png'),
	  },
	  {
  		id:'6',
		idEsercizio: '36',
		nomeEsercizio: 'RINFORZO MUSCOLI',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni',
		riposo: '30 secondi di riposo',
		descrizione: "Indossare delle cavigliere di MAX 2 KG.\nPoggiandosi alla spalliera di una sedia, portarsi sulle punte dei piedi. Attendere pochi secondi e poi poggiare nuovamente i talloni.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_2.png'),
	  },
	  {
    	id:'6',
		idEsercizio: '37',
		nomeEsercizio: 'RINFORZO GLUTEI',
		serie: '2 serie',
		ripetizioni: '10 ripetizioni x lato',
		riposo: '30 secondi di riposo',
		descrizione: "Indossare delle cavigliere di MAX 2 KG.\nDalla posa quadrupedica, con entrambe le braccia a terra (mani parallele alle spalle), sollevare una gamba portandola all'altezza del gluteo, tenendo il piede a martello.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelle riportate nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_4.png'),
	  },
	  {
	    id:'6',
		idEsercizio: '38',
		nomeEsercizio: 'POSA 1',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Steso su un fianco, afferrare il piede e portarlo al gluteo. Mantenere la posizione per qualche secondo, distendendo i muscoli della coscia, poi rilasciare.",
		esempio: "(ad esempio minuti in cui hai mantenuto la posizione)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching.png'),
	  },
	  {
	    id:'6',
		idEsercizio: '39',
		nomeEsercizio: 'POSA 2',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Da seduto, con le gambe divaricate, portare le braccia davanti a sè, dunque spingersi in avanti, distendendo i muscoli delle gambe e della schiena.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B2_Weight_2.png'),
	  },
	  {
	    id:'6',
		idEsercizio: '40',
		nomeEsercizio: 'POSA 3',
		serie: '',
		ripetizioni: '',
		riposo: '',
		descrizione: "Da seduto, con le gambe divaricate, portare le braccia davanti a sè, dunque spingersi in avanti, distendendo i muscoli delle gambe e della schiena.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B4_Stretching_3.png'),
	  },
	  {
	    id:'6',
		idEsercizio: '41',
		nomeEsercizio: 'SQUAT',
		serie: '3 serie',
		ripetizioni: '10 ripetizioni',
		riposo: '30 secondi riposo',
		descrizione: "In piedi, con gambe leggermente divaricate, parallele alle spalle, scendere in posizione di SQUAT, mantenendo dritta la schiena e portando in fuori il bacino.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: i minuti consigliati, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B3_Squat.png'),
	  },
	  {
	    id:'6',
		idEsercizio: '42',
		nomeEsercizio: 'AFFONDI',
		serie: '3 serie',
		ripetizioni: '10 ripetizioni alternate',
		riposo: '30 secondi riposo',
		descrizione: "In piedi, con gambe parallele e leggermente divaricate, scendere in posizione di AFFONDO, portando indietro una gamba. Alternare tra loro le gambe durante l'esercizio.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B3_Affondi.png'),
	  },
	  	  {
	    id:'6',
		idEsercizio: '43',
		nomeEsercizio: 'SIT-UPS',
		serie: '3 serie',
		ripetizioni: '10 ripetizioni',
		riposo: '30 secondi riposo',
		descrizione: "Da stesi, in posizione supina con la schiena sul pavimento, le mani davanti al proprio corpo, e le ginocchia piegate, sollevarsi dal pavimento, stimolando i muscoli addominali e senza sforzare la schiena e il collo.",
		esempio: "(ad esempio 2 serie e 10 ripetizioni)",
		ricorda: "(Ricorda: le serie e ripetizioni consigliate, sono quelli riportati nella scheda descrittiva.)",
		img: require('../assets/IllustrazioniSchede/PNG/B3_Sit-Up.png'),
	  },
	  
	];

	let des = ''
	let idEsercizio = 0
	for (let val in Object.keys(Data)) {
		for (let key in Data[val]) {
			if(Data[val].id==id && Data[val].nomeEsercizio==blocco) {
				des = Data[val].descrizione
				idEsercizio = Data[val].idEsercizio
			}				
		}
	}

function handleSubmitMinuti() {
	const esercizi = databases.createDocument('652e8e4607298ced5902', '653b96edce5c1c196251', ID.unique(),
		{
			'idPaziente': user.$id, 
			'minuti': minuti, 
		},
        [Permission.update(Role.any())],				
	  );	
	  
		esercizi.then(function (response) {
			console.log(response); // Success 
			router.push("/allenatiNavigation")	
		}, function (error) {
			console.log(error); // Failure
		});
}
	
function handleSubmitSerieRipetizioni() {

	const esercizi = databases.createDocument('652e8e4607298ced5902', '653b96edce5c1c196251', ID.unique(),
		{
			'idPaziente': user.$id, 
			'serie': serie, 
			'ripetizioni': ripetizioni,   
		},
        [Permission.update(Role.any())],				
	  );	
	  
		esercizi.then(function (response) {
			console.log(response); // Success 
			router.push("/allenatiNavigation")	
		}, function (error) {
			console.log(error); // Failure
		});
	}
	
  return (
    <SafeAreaView style={styles.container}>
	    <StatusBar hidden={true} />
		<KeyboardAwareScrollView>
		<TouchableWithoutFeedback>
		<View style={styles.inner}>
			
			<View style={styles.container}>
				<LogoViola/>
			</View>

			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
			
			<View>
				<View style={{ flexDirection: 'row',  }}>		
					<View style={{ flex: 1 }}>
						 <Text style={styles.titoloText}>
								{ blocco }
							</Text>
						</View>
						<TouchableOpacity onPress={() => router.push('/EserciziLiv2')}>
							<Image style={{width:50, height: 50,  marginRight: 30,  marginTop: 5}} source={require('../assets/ICONE/PNG/CHIUDINEUTRO.png')} />
						</TouchableOpacity>
				</View>
			</View>

			<View>
				<View style={styles.mainbox}>
					<Swiper style={styles.wrapper} showsButtons={false}>
						<View style={styles.slide1}>
							<Image source= {Data[idEsercizio].img}  style={{width:200, height:200, }} />
						</View>
					</Swiper>
				</View>	
			</View>			

			<View style={{alignItems: 'center', marginTop: 10}}></View>

			{ blocco !== 'CAMMINO' && (
			<View>
				<Text style={styles.descrizioneText}> { Data[idEsercizio].serie }	</Text>
				<Text style={styles.descrizioneText}> { Data[idEsercizio].ripetizioni }	</Text>
				<Text style={styles.descrizioneText}> { Data[idEsercizio].riposo }	</Text>
			</View>
			)}

			<View>
				<Text style={styles.sottotitoloText}>
					Descrizione dell' esercizio
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo2Text}>
					{ des }
				</Text>
			</View>	
			
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => router.replace("/motionCapture")}>
					<Text style={styles.buttonTextStyle}>AVVIA MOTION CAPTURE</Text>
				</TouchableOpacity>
			</View>
			
			<View>
				 <Text style={styles.sottotitoloText}>
					IL TUO ALLENAMENTO 
				</Text>
			</View>
			
			<View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 30,}}>
					<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
			
			<View>
				<Text style={styles.sottotitoloText}>
					Usa i campi per inserire i dati sul tuo allenamento.	
				</Text>
			</View>

			<View>
				<Text style={styles.paragrafo2Text}>
					{Data[idEsercizio].esempio}
				</Text>
			</View>
				
			<View>
				<Text style={styles.paragrafo1BoldText}>
					{Data[idEsercizio].ricorda}
				</Text>
			</View>
		
			{ blocco === 'CAMMINO' || blocco === 'JOGGING' || blocco === 'POSA 1' || blocco === 'POSA 2' || blocco === 'POSA 3' ? (
			<View>
				<View style={{ flexDirection: 'row' }}>						
					<View style={{flex:1}}>
						<Text style={styles.paragrafo3Text}>
							Inserisci minuti
						</Text>
						<View style={styles.form}>
							<TextInput style={styles.input}
								onChangeText={minuti => setMinuti(minuti)}
								value={minuti}
								keyboardType="phone-pad"
							/>
						</View>	
					</View>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => handleSubmitMinuti()}>
						<Text style={styles.buttonTextStyle}>CONCLUDI</Text>
					</TouchableOpacity>
				</View>
			</View>
			) : (
			<View>
				<View style={{ flexDirection: 'row' }}>		
					<View style={{flex:1}}>
						<Text style={styles.paragrafo3Text}>
							Inserisci serie
						</Text>
						<View style={styles.form}>
							<TextInput style={styles.input}
								onChangeText={serie => setSerie(serie)}				
								value={serie}
								keyboardType="phone-pad"
							/>
						</View>	
					</View>						
					<View style={{flex:1}}>
						<Text style={styles.paragrafo3Text}>
							Inserisci ripetizioni
						</Text>
						<View style={styles.form}>
							<TextInput style={styles.input}
								onChangeText={ripetizioni => setRipetizioni(ripetizioni)}
								value={ripetizioni}
								keyboardType="phone-pad"
							/>
						</View>	
					</View>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => handleSubmitSerieRipetizioni()}>
						<Text style={styles.buttonTextStyle}>CONCLUDI</Text>
					</TouchableOpacity>
				</View>
			</View>
			)}
			
		
	</View>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>	
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
	fontFamily: 'roboto-flex-regular',
	marginTop: 20,
	fontWeight: 'bold'
  },
  domande: {
  	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'roboto-flex',
	marginTop: 20,
	alignItems: 'center',
  },
  paragrafo0Text: {
    fontSize: 18,
	fontFamily: 'roboto-flex',
	marginHorizontal: 10,
	marginTop: 0,
	marginBottom: 30,
  },
  paragrafo1Text: {
    fontSize: 20,
	color: '#48d1cc',
	fontFamily: 'roboto-flex',
	marginHorizontal: 30,
	marginTop: 10,
  },
  paragrafo1BoldText: {
	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 20,
	fontFamily: 'ultra-black-regular',
	marginTop: 10,
	fontWeight: 'bold',
	},
   boldText: {
    color: '#560CCE',
    fontSize: 20,
    fontFamily: 'ultra-black-regular',
	fontWeight: 'bold',
  },
  pickerStyles: {
    flex: 1,
    marginHorizontal: 10,
	flexDirection: 'row',    
    justifyContent: 'center',
  },
   input: {
	marginHorizontal: 30,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "lightgrey",
	color: '#560CCE',
    borderRadius: 10,
    padding: 15, 
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  },
  paragrafo2Text: {
	marginHorizontal: 30,
    fontSize: 18,
	color: 'grey',
	fontFamily: 'roboto-flex',
	marginTop: 0,
	marginBottom: 10,
  },
 paragrafo3Text: {
	marginHorizontal: 30,
    fontSize: 20,
	fontFamily: 'roboto-flex',
	marginTop: 10,
	marginBottom: 0,
	color: '#1786aa',
  },
	boldTextViolet: {
    color: '#560CCE',
	fontSize: 20,
	fontFamily: 'ultra-black-regular',
	fontWeight: 'bold',
  },
   buttonContainer: {
	marginHorizontal: 30,
	borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 2,
	borderColor: '#560CCE',
	borderWidth: 2,
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
  mainbox:{
	marginHorizontal: 30,
    padding: 20,
	borderRadius: 7,
	borderColor: "lightgrey",
	borderWidth: 1,
	flexDirection: 'row',
	margin: 0,
	height: 250,
    },
     wrapper: {},
      slide1: {
      justifyContent: 'center',
      alignItems: 'center',
    },
   image: {
    alignSelf: "center",
	width: 100,
    height: 100,
  },
  descrizioneText: {
	marginHorizontal: 30,
    fontSize: 18,
	color: '#560CCE',
	fontFamily: 'roboto-flex',
	marginTop: 0,
  },
  form: {          
	justifyContent: 'flex-start',
	flexDirection: 'row',    
  }, 
  input: {
	marginHorizontal: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
	color: '#560CCE',
    borderRadius: 7,
    padding: 15, 
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
	width: 200, 
  },  
});
