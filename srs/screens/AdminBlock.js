import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView, ScrollView, } from 'react-native'
import React from 'react'
import Color from '../constant/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AdminBlock = () => {
    const navigation = useNavigation();
    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage successfully cleared!');
        navigation.navigate("StudentLogin");
      } catch (error) {
        console.log(error);
      }
    }
    
  return (
    <SafeAreaView style={{height: "100%"}}>
    <View style={styles.logoutButton}>
       <TouchableOpacity style={{
         marginRight:10,
         backgroundColor: "#00a26b",
         paddingVertical: 5,
         paddingVertical:15,
         borderRadius: 1000,
         elevation: 5,
       }}
       onPress={() =>{clearAsyncStorage();}}
       >
         
         {/* <Text style={{
           color: '#fff',
           fontWeight: 'bold',
           textAlign: 'center'
           }} >
             Logout
           </Text> */}
         <MaterialCommunityIcons style={{
           marginHorizontal:15,
         }} name="logout" size={30} color="#fff"  />
       
        </TouchableOpacity>
    </View>
    <ScrollView>
    <View style={styles.container}>
    <Text style={styles.title}>title</Text>
    <Text style={styles.description}>description</Text>
    <TouchableOpacity style={styles.button} onPress={() =>{}}>
      <Text style={styles.buttonText}>View Profile</Text>
    </TouchableOpacity>
  </View>
  </ScrollView>
    </SafeAreaView>
  )
}

export default AdminBlock

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  logoutButton:{
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex:1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Color.Color.bottomtabBackground,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})