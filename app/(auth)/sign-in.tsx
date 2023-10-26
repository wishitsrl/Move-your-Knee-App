import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert
} from "react-native";
import { useAuth } from "../context/auth";
import Logo from '../../components/UX/Logo'
import Background from '../../components/UX/Background'
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";
import Button from '../../components/UX/Button'
import { useFonts } from 'expo-font';

export default function SignIn() {
  const { signIn } = useAuth();
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
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
  <Background>
	<SafeAreaView style={styles.container}>
		<StatusBar hidden={true} />  
		<ScrollView style={styles.scrollView}>     	
			<View style={styles.container}>
				<Logo/>
			</View>
			
		<View style={styles.containerCenter}>	
			<View>
				<Text style={styles.paragrafo2Text}>
					Email
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						placeholder="Email"
						autoCapitalize="none"
						nativeID="email"
						onChangeText={(text) => {
						emailRef.current = text;}}
					/>
				</View>
 		    </View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Password
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						placeholder="Password"
						secureTextEntry={true}
						nativeID="password"
						onChangeText={(text) => {
						passwordRef.current = text;}}
					/>
				</View>
			</View>
		 
			<View style={styles.buttonContainer}>
				<Button mode="contained" onPress={async () => {
					const { data, error } = await signIn(emailRef.current, passwordRef.current);
					if (data) {
						router.replace("/");
					} else {
						console.log(error);
						Alert.alert("Inserire Email e Password corretti");
					}
					}}>LOGIN</Button>    
			</View>
			
			<View style={styles.buttonContainer}>
				<Button mode="contained" onPress={() => router.push("/sign-up")}>REGISTRATI</Button>    
			</View>
		 
		  </View>   
		</ScrollView>
	</SafeAreaView>
	</Background>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
	alignItems: 'center',
    justifyContent: 'center',
  },
  containerCenter: {
    flex: 1,
    marginTop: 60,
  },
  input: {
	marginHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "gray",
    width: "100%",
    borderRadius: 10,
    padding: 15, 
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
   scrollView: {
	flex: 1,
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
  boldText: {
	fontWeight: 'bold',
  },
  buttonContainer: {
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  },
  paragrafo2Text: {
	marginHorizontal: 20,
    fontSize: 20,
	color: '#48d1cc',
	fontFamily: 'roboto-flex',
	marginTop: 0,
  },
  form: {
    flex: 1,   
	marginHorizontal: 10,
	justifyContent: 'center',
	flexDirection: 'row',    
  },
});
