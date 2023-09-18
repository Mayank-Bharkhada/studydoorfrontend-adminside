import { Alert, StyleSheet, Text, View, Image,StatusBar } from 'react-native'
// import SecureStorage from 'react-native-secure-storage';
import React, { useEffect, useState } from 'react';
import Color from '../constant/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from "@rneui/themed";
import { TouchableOpacity } from 'react-native';
import { color, set } from 'react-native-reanimated';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Links from '../constant/Links';
import { ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [isFullLoading, setIsFullLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const [emailErrorText, setEmailErrorText] = useState("#fff");

  const emailError = (Email) => {
    setEmail(Email);
    const Valid = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
    if (Valid.test(Email)) {
      setEmailErrorText("#fff");
    } else {
      setEmailErrorText("red");
    }
  }
  const passwordError = (Password) => {
    setPassword(Password);
  }
  const AdminLogin = async () => {
    try {
      setLoading(true);
      console.log("Email : " + email + " " + "Password : " + password)
      const response = await fetch(`${Links.Domain}/api/User/Admin_login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id: email,
          Password: password
        }),
      });
      let responseJson = await response.json();
      console.log(responseJson);
      console.log(responseJson[0].id);
      if (responseJson[0].id === 1) {
        Alert.alert("Your welcome Admin.");
        await AsyncStorage.setItem("Type", "Admin");
        await AsyncStorage.setItem("Login", "1");
        await AsyncStorage.setItem("Email", email);
        await AsyncStorage.setItem("Password", password);
        setLoading(false);
        navigation.navigate("Admin");
      } else {
        setLoading(false);
        setEmail('');
        setPassword('');
        Alert.alert("Username or Password is not correct");
      }
    } catch (error) {
      setLoading(false);
      setEmail('');
      setPassword('');
      console.log(error);
      Alert.alert("Error! try again later");
    }
  }

  const getData = async () => {
    setIsFullLoading(true);
    const Type = await AsyncStorage.getItem("Type");
    const Login = await AsyncStorage.getItem("Login");
    const Email = await AsyncStorage.getItem("Email");
    const Password = await AsyncStorage.getItem("Password");
    if (Type !== null && Login !== null && Email !== null && Password !== null) {
      if (Type === "Admin") {
        SplashScreen.hide();  
        navigation.navigate("Admin");
      }
    }
    setIsFullLoading(false);
    SplashScreen.hide();  

   
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      {isFullLoading ? (
        <>
          <StatusBar  backgroundColor={Color.Color.topHeaderBackground}/>
        </>
      ) : (
        <SafeAreaView style={styles.safeAreaViewContainer}>
          
            <StatusBar  backgroundColor={Color.Color.topHeaderBackground}/>
          <ScrollView>
            <View style={{ backgroundColor: "#fff" }}>
              <View style={[styles.QandAHeadingContainer, { overflow: 'visible' }]}>
                <View style={[styles.logoContainer, { overflow: 'visible' }]}>
                  <Image style={styles.logo} source={require('../../assets/Logo.png')} />
                  <View style={{ position: 'absolute', bottom: -140, alignSelf: 'center', justifyContent: "center" }}>
                    <View style={{ backgroundColor: Color.Color.bottomtabBackground, width: 80, height: 80, borderRadius: 100, elevation: 20, alignSelf: 'center', justifyContent: "center" }}>
                      <Image source={require('../../assets/Admin.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                    </View>
                    <Text style={{ fontSize: 22, color: Color.Color.bottomtabBackground, fontWeight: "700", paddingLeft: 10 }}>Admin</Text>
                  </View>
                </View>
              </View>
              {loading ? (
                <ActivityIndicator
                  size={50}
                  color={Color.Color.bottomtabBackground}
                  style={{ marginTop: "60%" }}
                />
              ) : (
                <View style={[styles.mainContainer, { marginTop: "15%" }]}>
                  <View style={styles.inputContainer}>
                    <Input
                      inputStyle={{ color: "#000", marginLeft: 20, }}
                      placeholder="Email"
                      leftIcon={
                        <Icon
                          name='email'
                          size={24}
                          color='#000'
                        />
                      }
                      defaultValue={email}
                      style={styles.inputBox}
                      onChangeText={(Value) => { emailError(Value) }}
                      autoCapitalize="none"
                      errorStyle={{ color: emailErrorText }}
                      errorMessage="Enter Valid Email Address"
                    />
                    <Input placeholder="Password"
                      leftIcon={
                        <Icon
                          name='lock-open'
                          size={24}
                          color='#000'
                        />
                      }
                      defaultValue={password}
                      onChangeText={(Value) => { passwordError(Value) }}
                      secureTextEntry={true}
                      inputStyle={{ marginLeft: 20, }}
                      style={styles.inputBox}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={() => { AdminLogin() }} disabled={email === '' || password === '' || emailErrorText === 'red'}>
                      <Text style={styles.loginButtonText}> Login </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

          </ScrollView>
        </SafeAreaView>
      )
                    }
</>
  )



}

export default AdminLogin

const styles = StyleSheet.create({
  safeAreaViewContainer: { height: "100%", backgroundColor: "#fff", paddingBottom: 10 },
  QandAHeadingContainer: {
    width: 1000,
    height: 1000,
    marginTop: -750,
    // marginLeft:-5,
    alignSelf: "center",
    // borderRadius:1000,
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: Color.Color.topHeaderBackground,
    paddingTop: 5,
  },
  mainContainer: {
    // width:1000,
    // height:1000,
    // marginTop:-800,
    // alignSelf:"center",
    // borderBottomRightRadius:1000,
    // borderBottomLeftRadius:1000,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    // paddingTop: 5,
  },
  logoContainer: {
    position: "absolute",
    bottom: 0,
    margin: 80,
    alignSelf: "center",
    fontSize: 30,
    color: "#000",
  },
  header: {
    margin: 20,
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    alignItems: "center"
  },
  inputContainer: {
    // backgroundColor:"#fff",
    margin: "10%",
    marginBottom: 30,
    padding: 0,
  },
  loginButton: { backgroundColor: Color.Color.topHeaderBackground, borderRadius: 100, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginBottom: 10 },
  loginButtonText: { color: "#fff", height: 50, alignSelf: "center", padding: 11, fontSize: 15 },
  forgotButton: { backgroundColor: "#fff", borderRadius: 100, borderColor: "#000", borderWidth: 0.5 },
  forgotButtonText: { color: "#000", height: 50, alignSelf: "center", padding: 11, fontSize: 15 }
})