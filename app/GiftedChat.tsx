import { View, Text, TextInput, SafeAreaView, FlatList, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, ImageBackground, ScrollView, StatusBar, NavigationContainer, Image } from 'react-native';
import Background from '../components/Background'
import LogoViola from '../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { Permission, Role, ID, Query, Appwrite} from "appwrite";
import client, { databases } from "./lib/appwrite-service";

export default function GiftedChat() {	
	const { user } = useAuth();
	const router = useRouter();
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [dottore, setDottore] = useState('');
	const collectionId = '655e661dbc96eae6c564';


	useEffect(() => {

	}, [user.$id]);


	const loadMessages = async () => {
		try { 
			const response = databases.listDocuments('652e8e4607298ced5902', collectionId, 	
			[
				Query.equal('userId', user.$id)
			]);	
				response.then(function (response) {
				console.log(response); // Success
				setMessages(response.documents);
			}, function (error) {
				console.log(error); // Failure
			});
			} catch (error) {
			  console.error('Error loading messages:', error);
			}	  
	};

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



	  
	    
	const sendMessage = async () => {
		try {
			const send = databases.createDocument('652e8e4607298ced5902', '655e661dbc96eae6c564', ID.unique(),
			{
				'text': newMessage, 
				'userId': user.$id,
			},
        [Permission.update(Role.any())],				
	  );	
		 
		setNewMessage('');
		loadMessages();
		send.then(function (response) {
			console.log(response); // Success 		
		}, function (error) {
			console.log(error); // Failure
		});
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
	  
	  
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
				<View style={{ flexDirection: 'row',  }}>		
						<View style={{ flex: 1 }}>
							 <Text style={styles.titoloText}>
								CHAT
							</Text>
						</View>
						<View>
							<TouchableOpacity onPress={() => router.push('/CHAT')}>
								<Image style={{width:36, height: 36,  marginRight: 30,  marginTop: 5}} source={require('../assets/ICONE/PNG/CHIUDINEUTRO.png')} />
							</TouchableOpacity>
						</View>
				</View>
			</View>
						
			<View style={styles.containerDott}>
				<TextInput
					style={styles.inputDott}
					placeholder="Dott."
					value={dottore}
					onChangeText={dottore => setDottore(dottore)}
				/> 
			</View>
			
			<View style={{flexDirection: 'row', marginHorizontal: 30, alignItems: 'center'}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#B197E4'}} />
			</View>
			</ScrollView>
			
			<View style={styles.containerChat}>
				<Text>{dottore}</Text>
				<FlatList
					data={messages}
					keyExtractor={(item) => item.$id}
					renderItem={({ item }) => (				
					<View style={item.userId === user.$id ? styles.myMessage : styles.otherMessage}>	
						<Text style={item.userId === user.$id ? styles.messageText : styles.messageTextColor}>{item.text}</Text>
					</View>
					)}
				/>
			</View>	
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<View style={{flex: 1, height: 2, backgroundColor: '#B197E4'}} />
			</View>
			<View>
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 10, marginBottom: 20,}}>	
				<TouchableOpacity>
					<Image style={styles.image}  source={require('../assets/ICONE/PNG/AGGIUNGINEUTRO.png')} />
				</TouchableOpacity>

				<View style={{alignItems: 'center', marginHorizontal: 5 }}></View>

				<View style={{flex:1}}>
					<TextInput
					  style={styles.input}
					  placeholder="SCRIVI"
					  value={newMessage}
					  onChangeText={(text) => setNewMessage(text)}
					/>
				</View>		

				<View style={{alignItems: 'center', marginHorizontal: 5 }}></View>

				<TouchableOpacity onPress={sendMessage}>
					<Image style={styles.image}  source={require('../assets/ICONE/PNG/CONFERMANEUTRO.png')} />
				</TouchableOpacity>
				
				<View style={{alignItems: 'center', marginHorizontal: 5 }}></View>

				<TouchableOpacity>	
					<Image style={styles.image} source={require('../assets/ICONE/PNG/FOTOCAMERANEUTRO.png')} />
				</TouchableOpacity>		
				</View>	
			</View>	
			
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
    fontSize: 40,
	fontFamily: 'AcuminVariableConcept-WideUltraBlack',
  },
   containerDott: {
	marginHorizontal: 30,
  },
   inputDott: {
    borderWidth: 0,
    paddingHorizontal: 10,
    color: '#560CCE',
    padding: 15, 
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
  },
   containerChat: {
    flex: 2,
	marginTop: 10,
    marginHorizontal: 30,
  },
   myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#B197E4',
    padding: 5,
    borderRadius: 3,
    marginVertical: 5,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
	color: '#560CCE',
    padding: 10,
    borderRadius: 3,
    marginVertical: 5,
  },
  messageTextColor: {
    color: '#560CCE',
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#B197E4',
    borderRadius: 3,
    paddingHorizontal: 8,
	flex: 1,
	color: '#B197E4',
  },
  sendButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 3,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    height: 30,
    width: 30,
  },
});

