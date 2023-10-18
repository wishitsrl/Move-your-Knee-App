import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Logo from '../../components/UX/Logo'
import Background from '../../components/UX/Background'
import { useAuth } from "../context/auth";
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";

export default function SignUp() {
  const { signUp } = useAuth();
  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");

  return (
    <>
	<Background>
      <Stack.Screen options={{ title: "sign up", headerShown: false }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    	<Logo/>       
 	    <View>
          <Text style={styles.label}>UserName</Text>
          <TextInput
            placeholder="Username"
            autoCapitalize="none"
            nativeID="userName"
            onChangeText={(text) => {
              userNameRef.current = text;
            }}
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="email"
            autoCapitalize="none"
            nativeID="email"
            onChangeText={(text) => {
              emailRef.current = text;
            }}
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            nativeID="password"
            onChangeText={(text) => {
              passwordRef.current = text;
            }}
            style={styles.textInput}
          />
        </View>

        <TouchableOpacity
          onPress={async () => {
            const { data, error } = await signUp(
              emailRef.current,
              passwordRef.current,
              userNameRef.current
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
          <Text style={styles.buttonText}>Registrati</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 60, marginBottom: 20}}>
          <Text
            style={{ fontWeight: "500" }}
            onPress={() => router.replace("/sign-in")}
          >
            Clicca per ritornare alla pagina di login
          </Text>
        </View>
      </View>
	  </Background>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: "#455fff",
  },
  textInput: {
    width: 250,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#455fff",
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
});
