import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, View, SafeAreaView, ScrollView, StatusBar, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Button from '../components/UX/Button'
import Background from '../components/Background'
import LogoViola from '../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import client, { databases } from "./lib/appwrite-service";
import { Permission, Role,  ID, Query, } from "appwrite";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useRef, useCallback } from "react";
import { RadioButton } from 'react-native-paper';
import {Slider} from '@miblanchard/react-native-slider';
//import Slider from '@react-native-community/slider';

export default function datiMedici() {
   const { signOut, user } = useAuth();
   const router = useRouter();
   const [annoDiagnosi, setAnnoDiagnosi] = React.useState(''); 
   const [areaGinocchio, setAreaGinocchio] = React.useState('');  
   const [intensitaDolore, setIntensitaDolore] = React.useState(''); 
   const [sensazioneRigidita, setSensazioneRigidita] = React.useState(''); 
   const [sensazioneDebole, setSensazioneDebole] = React.useState(''); 
   const [difficoltaCammino, setDifficoltaCammino] = React.useState(''); 
   const [difficoltaVestirsi, setDifficoltaVestirsi] = React.useState('');   
   const [assunzioneFarmaci, setAssunzioneFarmaci] = React.useState('');    
   const [infiltrazioni, setInfiltrazioni] = React.useState(''); 
   const [fontsLoaded, fontError] = useFonts({
		"roboto-flex": require('../assets/fonts/RobotoFlex.ttf'),
		"roboto-flex-regular": require('../assets/fonts/RobotoFlex-Regular.ttf'),
		"roboto-flex-variable": require('../assets/fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),		
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
  
	const datiMedici = databases.getDocument('652e8e4607298ced5902', '6538c6af1ca5781c351b', user.$id)	
			datiMedici.then(function (response) {
				console.log(response); // Success 
				setAnnoDiagnosi(response.annoDiagnosi);
				setAreaGinocchio(response.areaGinocchio);
				setIntensitaDolore(response.intensitaDolore);
				setSensazioneRigidita(response.sensazioneRigidita);
				setSensazioneDebole(response.sensazioneDebole);
				setDifficoltaCammino(response.difficoltaCammino);
				setDifficoltaVestirsi(response.difficoltaVestirsi);
				setAssunzioneFarmaci(response.assunzioneFarmaci);
				setInfiltrazioni(response.infiltrazioni);
			}, function (error) {
			console.log(error); // Failure
		});
  
  	function handleSubmit() {

		const updateDatiMedici = databases.updateDocument('652e8e4607298ced5902', '6538c6af1ca5781c351b', user.$id, 	
		{
			'idPaziente': user.$id, 
			'annoDiagnosi': annoDiagnosi, 
			'areaGinocchio': areaGinocchio,   
			'intensitaDolore': intensitaDolore,
			'sensazioneRigidita': sensazioneRigidita,
			'sensazioneDebole': sensazioneDebole,
			'difficoltaCammino': difficoltaCammino,
			'difficoltaVestirsi': difficoltaVestirsi, 
            'assunzioneFarmaci': assunzioneFarmaci,
			'infiltrazioni': infiltrazioni,
		},
        [Permission.update(Role.any())],				
	  );	
	  
		updateDatiMedici.then(function (response) {
			console.log(response); // Success 	
		}, function (error) {
			console.log(error); // Failure
		});
	}

    const marks = [
    { value: 0, label: '0' },
    { value: 10, label: '10' },
	];
  
  const renderMarks = () => {
    return marks.map((mark) => (
      <View key={mark.value} style={styles.markContainer}>
        <Text style={styles.markLabel}>{mark.label}</Text>
      </View>
    ));
  };
  return (
    <SafeAreaView style={styles.container}>
	    <StatusBar hidden={true} />
		<KeyboardAwareScrollView>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
								PROFILO
							</Text>
						</View>
						<View>
							<TouchableOpacity onPress={() => router.push('/PROFILO')}>
								<Image style={{width:36, height: 36,  marginRight: 30,  marginTop: 5}} source={require('../assets/ICONE/PNG/CHIUDINEUTRO.png')} />
							</TouchableOpacity>
						</View>
				</View>
			</View>
			
			<View>
				<Text style={styles.paragrafo1Text}>
					DATI MEDICI
				</Text>
			</View>
			
			<View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 30,}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#560CCE'}} />
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					In che anno è stata ricevuta una diagnosi di artrosi al ginocchio?
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={annoDiagnosi => setAnnoDiagnosi(annoDiagnosi)}
						value={annoDiagnosi.toString()}
						placeholder=" "
						keyboardType="phone-pad"
					/>
				</View>	
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					In quale area? (Ginocchio destro, sinistro o entrambi)
				</Text>
				<View style={styles.form}>
					<TextInput style={styles.input}
						onChangeText={areaGinocchio => setAreaGinocchio(areaGinocchio)}
						value={areaGinocchio}
						placeholder=" "
					/>
				</View>	
			</View>
				
			<View>
				<Text style={styles.paragrafo2Text}>
					Valuta da 0 a 10 il dolore che provi al ginocchio*
				</Text>
				<View style={{marginHorizontal: 30,}}>
					<Slider style={styles.Slider} 
						maximumValue={10} minimumValue={0} step="1"
						onChangeText={intensitaDolore => setIntensitaDolore(intensitaDolore)}
						value={intensitaDolore}
						minimumTrackTintColor="#560CCE"
						maximumTrackTintColor="grey"
						trackStyle={customStyles7.track}
						thumbStyle={customStyles7.thumb}
					/>
					<View style={styles.marksContainer}>{renderMarks()}</View>
				</View>					
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Da 0 a 10, provi una sensazione di rigidità?*
				</Text>
				<View style={{marginHorizontal: 30,}}>
					<Slider style={styles.Slider} 
						maximumValue={10} minimumValue={0} step="1"
						value={sensazioneRigidita}
						onChangeText={sensazioneRigidita => setSensazioneRigidita(sensazioneRigidita)}
						minimumTrackTintColor="#560CCE"
						maximumTrackTintColor="grey"
						trackStyle={customStyles7.track}
						thumbStyle={customStyles7.thumb}
					/>
					<View style={styles.marksContainer}>{renderMarks()}</View>					
				</View>					
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Da 0 a 10, senti il ginocchio debole?*
				</Text>
				<View style={{marginHorizontal: 30,}}>
					<Slider style={styles.Slider} 
						maximumValue={10} minimumValue={0} step="1"
						onChangeText={sensazioneDebole => setSensazioneDebole(sensazioneDebole)}
						value={sensazioneDebole}
						minimumTrackTintColor="#560CCE"
						maximumTrackTintColor="grey"
						trackStyle={customStyles7.track}
						thumbStyle={customStyles7.thumb}
					/>
					<View style={styles.marksContainer}>{renderMarks()}</View>
				</View>
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					*In caso di gonartrosi bilaterale, 
					dovrai riferirti al ginocchio più dolente
					o dolente al momento della compilazione del modulo
				</Text>
			</View>
			
			<View>
				<Text style={styles.paragrafo2Text}>
					Da 0 a 10, trovi difficoltà nel cammino?
				</Text>
				<View style={{marginHorizontal: 30,}}>
					<Slider style={styles.Slider} 
						maximumValue={10} minimumValue={0} step="1"
						onChangeText={difficoltaCammino => setDifficoltaCammino(difficoltaCammino)}
						value={difficoltaCammino}
						minimumTrackTintColor="#560CCE"
						maximumTrackTintColor="grey"
						trackStyle={customStyles7.track}
						thumbStyle={customStyles7.thumb}
					/>
					<View style={styles.marksContainer}>{renderMarks()}</View>
				</View>
			</View>
						
			<View>
				<Text style={styles.paragrafo2Text}>
					Da 0 a 10, trovi difficoltà nel vestirti?
				</Text>
				<View style={{marginHorizontal: 30,}}>
					<Slider style={styles.Slider} 
						maximumValue={10} minimumValue={0} step="1"
						onChangeText={difficoltaVestirsi => setDifficoltaVestirsi(difficoltaVestirsi)}
						value={difficoltaVestirsi}
						minimumTrackTintColor="#560CCE"
						maximumTrackTintColor="grey"
						trackStyle={customStyles7.track}
						thumbStyle={customStyles7.thumb}
					/>
					<View style={styles.marksContainer}>{renderMarks()}</View>					
				</View>
			</View>

			<View style={styles.radioGroup}> 
				<Text style={styles.paragrafo2Text}>
						Hai mai assunto farmaci per il dolore al ginocchio? Se si quali?
				</Text>
                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value={assunzioneFarmaci}
                        status={assunzioneFarmaci === 'antifiammatori' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setAssunzioneFarmaci('antifiammatori')} 
                    /> 
					<View>
						<Text style={styles.boldTextGrey}>antifiammatori non steroidei (diclofenac, ibuprofene)</Text>
					</View>
				</View> 
  
                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value={assunzioneFarmaci}
                        status={assunzioneFarmaci === 'analgesici' ?  
                                 'checked' : 'unchecked'} 
                        onPress={() => setAssunzioneFarmaci('analgesici')} 
                    /> 
					<View>
						<Text style={styles.boldTextGrey}>analgesici (paracetamolo)</Text>
					</View>               
				</View> 
  
                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value={assunzioneFarmaci}
                        status={assunzioneFarmaci === 'cortisonici' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setAssunzioneFarmaci('cortisonici')} 
                    /> 
					<View>
						<Text style={styles.boldTextGrey}>cortisonici</Text>
					</View>
                </View> 
            </View>

		<View style={styles.radioGroup}> 
				<Text style={styles.paragrafo2Text}>
						Hai mai praticato infiltrazioni al ginocchio? Se si, con:
				</Text>
                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value={assunzioneFarmaci}
                        status={assunzioneFarmaci === 'cortisonici' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setInfiltrazioni('cortisonici')}                         
                    /> 
					<View>
						<Text style={styles.boldTextGrey}>cortisonici</Text>
					</View>
                </View> 
				 <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value={infiltrazioni}
                        status={infiltrazioni === 'ialuronico' ? 'checked' : 'unchecked'} 
                        onPress={() => setAssunzioneFarmaci('ialuronico')}                   
				   /> 
					<View>
						<Text style={styles.boldTextGrey}>acido ialuronico</Text>
					</View>
				</View> 
            </View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => handleSubmit()}>
					<Text style={styles.buttonTextStyle}>MODIFICA</Text>
				</TouchableOpacity>
			</View>		
	</View>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

var customStyles7 = StyleSheet.create({
  track: {
    height: 6,
    backgroundColor: 'lightgrey',
	borderRadius: 15,
  },
  thumb: {
    width: 25,
    height: 25,
    backgroundColor: 'white',
    borderColor: '#560CCE',
    borderWidth: 6,
    borderRadius: 15,
  }
});

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
    fontSize: 40,
	fontFamily: 'AcuminVariableConcept-WideUltraBlack',
 
  },
  form: {
   
	marginTop: 10,
	justifyContent: 'center',
	flexDirection: 'row',  

  },
  paragrafo1Text: {
	marginHorizontal: 30,
	color: '#560CCE',
    fontSize: 25,
	fontFamily: 'roboto-flex',
	marginTop: 4,
	marginBottom: 4,
  },
  paragrafo2Text: {
	marginHorizontal: 30,
    fontSize: 20,
	color: '#1786aa',
	fontFamily: 'roboto-flex',
	marginTop: 10,
	marginBottom: 4,
  },
  image: {
    alignSelf: "center",
	flex: 1,
    height: 200,
    width: 200,
  },
  input: {
	marginHorizontal: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
	color: '#560CCE',
	fontWeight: 'bold',
    borderRadius: 7,
    padding: 15, 
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
	width: 200, 
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
   radioButton: { 
        marginHorizontal: 30, 
        marginVertical: 8, 
        flexDirection: 'row', 
        alignItems: 'center', 

		color: '#560CCE',
    },
	boldTextViolet: {
    	color: '#560CCE',
		fontSize: 20,
		fontFamily: 'ultra-black-regular',
		fontWeight: 'bold',
	},
   Slider: {
	marginTop: 30,
    flexDirection: 'row',    
    justifyContent: 'center',
	},
  marksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  markContainer: {
    alignItems: 'center',
  },
  mark: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'gray',
    marginVertical: 5,
  },
  markLabel: {
    fontSize: 12,
	fontFamily: 'RobotoFlex',    
    fontSize: 20,
    lineHeight: 20,
	color: '#560CCE',
	fontWeight: 'bold',
  },
  sliderValue: {
    fontSize: 20,
  },
  trackMark: {
    position: 'absolute',
    bottom: -25,
    alignItems: 'center',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
  },
  marksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  boldTextGrey: {
    paddingVertical: 10,
	fontFamily: 'RobotoFlex', 
	fontWeight: 'bold',	
    fontSize: 20,
    lineHeight: 20,
	color: 'grey',
  }
});

