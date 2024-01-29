import React from 'react'
import {View, Image, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import Img2 from '../../assets/LOGOVIOLA.png';

export default function LogoViola({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Img2} style={styles.image} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 30,
    width: 200,
	marginBottom: 20,
	marginTop: 40,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
	marginHorizontal:0,
  },
});
