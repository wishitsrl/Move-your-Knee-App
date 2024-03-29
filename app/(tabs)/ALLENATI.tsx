import * as React from 'react';
import { View, Alert, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, ScrollView, StatusBar, NavigationContainer, Image } from 'react-native';
import LogoViola from '../../components/UX/LogoViola'
import { useAuth } from '../context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import { useRef, useState, useCallback } from "react";
import client, { databases } from "../lib/appwrite-service";
import { Permission, Role,  ID, Query, } from "appwrite";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Card } from 'react-native-paper';
import Dialog from "react-native-dialog";
import allenatiNavigation from '../allenatiNavigation';
import EserciziLiv1 from '../EserciziLiv1';
import EserciziLiv2 from '../EserciziLiv2';
import EserciziLiv3 from '../EserciziLiv3';
import EserciziLiv4 from '../EserciziLiv4';
import EserciziLiv5 from '../EserciziLiv5';
import ilTuoAllenamento from '../ilTuoAllenamento';

export default function ALLENATI() {

	const { user } = useAuth();
	const router = useRouter();
	const Stack = createNativeStackNavigator();
	const [fontsLoaded, fontError] = useFonts({
		"roboto-flex": require('../../assets/fonts/RobotoFlex.ttf'),
		"Acumin-Variable-Concept": require('../../assets/fonts/Acumin-Variable-Concept.ttf'),
		"AcuminVariableConcept-WideUltraBlack": require('../../assets/fonts/AcuminVariableConcept-WideUltraBlack.ttf'),
		"roboto-flex-regular": require('../../assets/fonts/RobotoFlex-Regular.ttf'),
		"roboto-flex-variable": require('../../assets/fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),		
		"ultra-black": require('../../assets/fonts/ultrablackitalic.ttf'),
		"ultra-black-regular": require('../../assets/fonts/UltraBlackRegular.ttf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
		  await SplashScreen.hideAsync();
		}
	  }, [fontsLoaded, fontError]);

	  if (!fontsLoaded && !fontError) {
		return null;
	  }
  
	return (
		<Stack.Navigator  screenOptions={{ headerShown: false }}>
			<Stack.Screen name="allenatiNavigation" component={allenatiNavigation} />		
			<Stack.Screen name="EserciziLiv1" component={EserciziLiv1}/>
			<Stack.Screen name="EserciziLiv2" component={EserciziLiv2}/>
			<Stack.Screen name="EserciziLiv3" component={EserciziLiv3}/>
			<Stack.Screen name="EserciziLiv4" component={EserciziLiv4}/>
			<Stack.Screen name="EserciziLiv5" component={EserciziLiv5}/>
			<Stack.Screen name="ilTuoAllenamento" component={ilTuoAllenamento}/>
		</Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

