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
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 60,
    width: windowWidth - 40,
    borderWidth: 0,
    borderColor: '#000',
	marginBottom: 10,
	marginTop: 50,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
	marginHorizontal:0,
  },
});
