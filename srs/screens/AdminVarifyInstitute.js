
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView,RefreshControl,StatusBar, BackHandler } from 'react-native';
import Color from '../constant/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useState } from 'react';
import Links from '../constant/Links';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const AdminVarifyInstitute = () => {
    const navigation = useNavigation();

    const [accType, setAccType] = useState(null);
    const [instituteData, setInstituteData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async() =>{
setIsLoading(true)
      const Type = await AsyncStorage.getItem("Type");
      const Login = await AsyncStorage.getItem("Login");
      const Email = await AsyncStorage.getItem("Email");
      const Password = await AsyncStorage.getItem("Password");

      if (Type !== null && Login !== null && Email !== null && Password !== null) {
        setAccType(Type)
        const instituteData = await fetch(`${Links.Domain}/api/User/requested_institute_data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });
        const instituteDataJson = await instituteData.json();
        console.log("instituteDataJson")
        console.log(instituteDataJson)
        console.log("instituteDataJson")
        if(instituteDataJson.id === 1){
          setInstituteData(instituteDataJson.data);
        }
        setIsLoading(false);
      }
      
    }

    const getDataOnFocus = async() =>{
      const Type = await AsyncStorage.getItem("Type");
      const Login = await AsyncStorage.getItem("Login");
      const Email = await AsyncStorage.getItem("Email");
      const Password = await AsyncStorage.getItem("Password");

      if (Type !== null && Login !== null && Email !== null && Password !== null) {
        setAccType(Type)
        const instituteData = await fetch(`${Links.Domain}/api/User/requested_institute_data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });
        const instituteDataJson = await instituteData.json();
        console.log("instituteDataJson")
        console.log(instituteDataJson)
        console.log("instituteDataJson")
        if(instituteDataJson.id === 1){
          setInstituteData(instituteDataJson.data);
        }
      }
      
    }




    
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getDataOnFocus();
    }
  }, [isFocused]);


  
  useEffect(() => {

    if (isFocused) {
    const backAction = () => {
       BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    
    return () => backHandler.remove();
    }
  }, [isFocused]);
    const handleRefresh = () => {
      
      getData();
    }

    
    const renderInstituteItem = ({ item }) => {

      return (
        <View style={styles.container}>
        <Text style={styles.title}>title : {item.name}</Text>
        <Text style={styles.description}>Pincode : {item.address}, {item.pincode} </Text>
        <Text style={styles.description}>Address : {item.address}, {item.city} </Text>
        <Text style={styles.description}>State : {item.state}</Text>
        <Text style={styles.description}>Country : {item.country}</Text>
        <TouchableOpacity style={styles.button} onPress={() =>{
          navigation.navigate("InstituteApprovement",{instituteId: item._id })
        }}>
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableOpacity>
      </View>
      );
    };
  
    useEffect(() => {
      getData();
    
      return () => {
        
      }
    }, [])
  
  return (
    <>
    
    <StatusBar  backgroundColor={Color.Color.topHeaderBackground}/>
  
    {
      isLoading ?(
        
        <ActivityIndicator
        size={50}
       color={Color.Color.bottomtabBackground}
       style={{ marginTop: "60%" }}
     />
     
     ):(
       
      <SafeAreaView style={{ height: "100%" }}>
      <ScrollView
        onScroll={(event) => {
          if (event.nativeEvent.contentOffset.y < -50) {
            handleRefresh();
          }
        }}
        refreshControl={
          <RefreshControl
            // refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
       {instituteData && <FlatList
                        data={instituteData}
                        renderItem={renderInstituteItem}
                        keyExtractor={(item) => item._id} />}
      </ScrollView>
      </SafeAreaView>
      )
    }
    </>
  )
}


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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 7,
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
});


export default AdminVarifyInstitute

