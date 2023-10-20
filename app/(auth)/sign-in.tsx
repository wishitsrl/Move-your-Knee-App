import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/auth";
import Logo from '../../components/UX/Logo'
import Background from '../../components/UX/Background'
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";

export default function SignIn() {
  const { signIn } = useAuth();
  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  return (
  <Background>
    <SafeAreaView style={styles.container}>
	    <StatusBar hidden={true} />   
			<View style={styles.container}>
				<Logo/>
			</View>
			<View style={styles.container2}>
			
			<Text style={styles.label}>Email</Text>
			<TextInput
				placeholder="Email"
				autoCapitalize="none"
				nativeID="email"
				onChangeText={(text) => {
				emailRef.current = text;
            }}
			style={styles.textInput}
			/>
		    
			<Text style={styles.label}>Password</Text>
			<TextInput
				placeholder="Password"
				secureTextEntry={true}
				nativeID="password"
				onChangeText={(text) => {
				passwordRef.current = text;
            }}
            style={styles.textInput}
          />
		  <TouchableOpacity
          onPress={async () => {
            const { data, error } = await signIn(
              emailRef.current,
              passwordRef.current
            );
            if (data) {
              router.replace("/");
            } else {
              console.log(error);
              // Alert.alert("Login Error", resp.error?.message);
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
		   <View style={{ marginTop: 60, marginBottom: 20}}>
          <Text
            style={{ fontWeight: "500" }}
            onPress={() => router.push("/sign-up")}
          >
            Clicca per registrarti per un nuovo account
          </Text>
        </View>
        </View>
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
   container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 4,
    color: "#455fff",
  },
  textInput: {
    width: 250,
	backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "gray",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    width: 250,
    borderRadius: 5,
    marginTop: 16,
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
   scrollView: {
	flex: 1,
    marginHorizontal: 0,
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
  }
});
