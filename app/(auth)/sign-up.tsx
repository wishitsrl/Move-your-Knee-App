import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import { useAuth } from "../context/auth";
import Logo from '../../components/UX/Logo'
import Background from '../../components/UX/Background'
import { Stack, useRouter } from "expo-router";
import { useRef, useState, useCallback } from "react";
import { useFonts } from 'expo-font';
import Spinner from 'react-native-loading-spinner-overlay';
import { SelectList } from 'react-native-dropdown-select-list'

export default function signUp() {
	
	const { signUp } = useAuth();
	const router = useRouter();
	const tipo = [{key:'Dottore', value:'Dottore'}, {key:'Paziente', value:'Paziente'}]
	const userNameRef = useRef("");
	const emailRef = useRef("");
	const passwordRef = useRef("");
	const confermaPasswordRef = useRef("");
	const [loading, setLoading] = useState(false);
	const [errortext, setErrortext] = useState('');
	const [fontsLoaded, fontError] = useFonts({
		"RobotoFlex": require('../../assets/fonts/RobotoFlex.ttf')});
	
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
		  await SplashScreen.hideAsync();
		}
	  }, [fontsLoaded, fontError]);

	  if (!fontsLoaded && !fontError) {
		return null;
	  }
 
	const onSignInPress = async () => {
		try {
			if (!emailRef.current) {
				setErrortext("Inserire una mail!");
			return;
			}
			if (!passwordRef.current) {
				setErrortext("Inserire una password!");
			return;
			}
			if(passwordRef.current!=confermaPasswordRef.current) {
				setErrortext("Le password non coincidono!");
			}
			else {	
				 const { data, error } = await signUp(
							  emailRef.current,
							  passwordRef.current,
							  userNameRef.current
							);			
					setLoading(true);
					if (data) {		
						router.replace("/registrazioneDatiPersonali");
					} else {
						console.log(error);
						setErrortext("Qualcosa è andato storto nella mail o nella password!");
					}
			}
		} catch (err: any) {
			alert(err.errors[0].message);
			setErrortext("Qualcosa è andato storto!");
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
	<Background>
		<SafeAreaView style={styles.container}>
			<StatusBar hidden={true} />  
			<ScrollView style={styles.scrollView}>     	
				<View style={styles.container}>
					<Logo/>
				</View>
				
				<View style={styles.container}>
					<View>
						<Spinner visible={loading} />
					</View>
									
					<View>
						<Text style={styles.paragrafo2Text}>
							Paziente o dottore
						</Text>
						<View style={{backgroundColor: "white", marginHorizontal: 10, marginVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: "gray", overflow: 'hidden'}}>
							<SelectList
							setSelected={(value, index) => {
							userNameRef.current = value;}}
							data={tipo} 
							search={false} 
							boxStyles={{borderRadius:0}}
							defaultOption={{ key:'Paziente', value:'Paziente' }}
							/>
						</View>
					</View>	
					
					<View>
						<Text style={styles.paragrafo2Text}>
							Email
						</Text>				
					</View>
					
					<View>
						<TextInput style={styles.inputField}
							autoCapitalize="none"
							placeholder="Email"
							onChangeText={(text) => {
							emailRef.current = text;}}
						/>
					</View>
					
					<View>
						<Text style={styles.paragrafo2Text}>
							Password
						</Text>
					</View>
					
					<View>
						<TextInput style={styles.inputField}
							placeholder="Password"
							secureTextEntry={true}
							onChangeText={(text) => {
							passwordRef.current = text;}}
						/>	
					</View>		

					<View>
						<Text style={styles.paragrafo2Text}>
							Conferma password
						</Text>
					</View>				
		
					<View>
						<TextInput style={styles.inputField}
							placeholder="Conferma password"
							secureTextEntry={true}
							onChangeText={(text) => {
							confermaPasswordRef.current = text;}}
						/>	
					</View>	
		
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={onSignInPress}>
							<Text style={styles.buttonTextStyle}>REGISTRATI</Text>
						</TouchableOpacity>
					</View>
					
					<View style={styles.container}>
						 {errortext != '' ? (
						  <Text style={styles.errorTextStyle}>
							{errortext}
						  </Text>
						) : null}
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
  },
  inputField: {
	marginHorizontal: 10,
	marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    padding: 15, 
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  },
   scrollView: {
	flex: 1,
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
  paragrafo2Text: {
	marginHorizontal: 20,
    fontSize: 20,
	color: '#48d1cc',
	fontFamily: 'RobotoFlex',
	marginTop: 0,
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
    errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
