import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image } from 'react-native';
import Button from '../components/UX/Button'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useAuth } from './context/auth';
import { Stack, useRouter } from "expo-router";

export default function ModalScreen() {
  const { signOut, user } = useAuth();
  const router = useRouter();
  
  return (
		<View style={styles.container}>
			<Image style={styles.image} source={require('../assets/ICONE/PNG/CHIUDISELEZIONATO.png')} />

			<Text style={styles.paragrafo1Text}>
				SEI SICURO DI VOLER USCIRE?
			</Text>		
			
			<View style={styles.buttonContainer}>
				<Button mode="contained" onPress={() => signOut()}>ESCI</Button>    
			</View>
			
			<View style={styles.buttonContainer}>
				<Button mode="contained" onPress={() => router.push('/PROFILO')}>RIPRENDI</Button>    
			</View>	
		{/* Use a light status bar on iOS to account for the black space above the modal */}
		<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
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
  image: {
	flex: 1,
    width: 100,
    height: 120,
    resizeMode: 'contain',
  },
  paragrafo1Text: {
	marginHorizontal: 10,
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'roboto-flex',
  },
});
