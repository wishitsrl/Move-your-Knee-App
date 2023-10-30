import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar, Image } from 'react-native';
import Button from '../../components/UX/Button'
import Background from '../../components/Background'
import LogoViola from '../../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text,  } from '@/components/Themed';
import { useAuth } from '../context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";

export default function CHAT() {
   const { user } = useAuth();
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

			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
				
			<View>
				 <Text style={styles.titoloText}>
					CHAT
				</Text>
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Non sei solo!
				</Text>
			</View>

			<View>
				<Text style={styles.sottotitoloText}>
					Scrivi al tuo medico, come supportarti!.
				</Text>
			</View>

			<View >
				<Image style={styles.image}  
				source={require('../../assets/ICONE/PNG/MEDICOSELEZIONATO.png')} />
			</View>	
		
			<View style={styles.buttonContainer}>
				<Button mode="contained" onPress={() => router.replace('/')}>AVVIA LA CHAT</Button>    
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
  buttonContainer: {
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  },
  image: {
    alignSelf: "center",
	flex: 1,
    height: 200,
    width: 200,
  },
});

