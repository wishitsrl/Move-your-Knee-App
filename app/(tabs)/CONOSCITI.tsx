import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, ScrollView, StatusBar, NavigationContainer, Image } from 'react-native';
import Background from '../../components/Background'
import LogoViola from '../../components/UX/LogoViola'
import EditScreenInfo from '@/components/EditScreenInfo';
import { useAuth } from '../context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import { useRef, useState, useCallback } from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import conoscitiNavigation from '../conoscitiNavigation';
import questionario from '../questionario';
import punteggio from '../punteggio';

export default function CONOSCITI() {
   const { user } = useAuth();
   const router = useRouter();
   const Stack = createNativeStackNavigator();
   const [fontsLoaded, fontError] = useFonts({
		"RobotoFlex": require('../../assets/fonts/RobotoFlex.ttf'),
		"RobotoFlex-Regular": require('../../assets/fonts/RobotoFlex-Regular.ttf'),
		"Acumin-Variable-Concept": require('../../assets/fonts/Acumin-Variable-Concept.ttf'),
		"AcuminVariableConcept-WideUltraBlack": require('../../assets/fonts/AcuminVariableConcept-WideUltraBlack.ttf'),
		"ultrablackitalic": require('../../assets/fonts/ultrablackitalic.ttf'),
		"UltraBlackRegular": require('../../assets/fonts/UltraBlackRegular.ttf'),
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
		<Stack.Screen name="conoscitiNavigation" component={conoscitiNavigation} />
		<Stack.Screen name="questionario" component={questionario} />
		<Stack.Screen name="punteggio" component={punteggio} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

