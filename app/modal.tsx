import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
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
			<Image style={styles.image} source={require('../assets/ICONE/PNG/CHIUDINEUTRO.png')} />

			<View>
				<Text style={styles.paragrafo1Text}>
					SEI SICURO
				</Text>		
			</View>
			<View>
				<Text style={styles.paragrafo1Text}>
					DI VOLER USCIRE?
				</Text>		
			</View>
			
			<View>
				<TouchableHighlight 
					style={styles.buttonContainer}
					activeOpacity={0.5}
					underlayColor="#560CCE"
					onPress={() => signOut()}>
					<Text style={styles.buttonTextStyle}>ESCI</Text>
				</TouchableHighlight>
			</View>
			
			<View>
				<TouchableHighlight 
					style={styles.buttonContainer}
					activeOpacity={0.5}
					underlayColor="#560CCE"
					onPress={() => router.push('/PROFILO')}>
					<Text style={styles.buttonTextStyle}>RIPRENDI</Text>
				</TouchableHighlight>
			</View>	
			
			
		{/* Use a light status bar on iOS to account for the black space above the modal */}
		<StatusBar style={Platform.OS === 'ios' ? 'light' : 'light'} />
		</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  paragrafo1Text: {
	marginHorizontal: 10,
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'roboto-flex',
	alignSelf: 'center',
  },
    buttonContainer: {
	marginHorizontal: 10,
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
});
