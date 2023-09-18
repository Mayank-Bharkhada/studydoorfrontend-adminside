import React, { useEffect, useState } from 'react';
import { Animated, Button, Image, Text, View , ToastAndroid} from 'react-native';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-gesture-handler';
import Color from './srs/constant/Color';
import Login from './srs/screens/Login';
import AdminVarifyStudent from './srs/screens/AdminVarifyStudent';
import AdminVarifyInstitute from './srs/screens/AdminVarifyInstitute';
import AdminBlock from './srs/screens/AdminBlock';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AdminLogin from './srs/screens/AdminLogin';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './srs/navigator/DrawerContent';
import InstituteApprovement from './srs/screens/InstituteApprovement';
import StudentApprovement from './srs/screens/StudentApprovement';
import SplashScreen from 'react-native-splash-screen';



const TabTop = createMaterialTopTabNavigator();


function Admin() {
  return (
    <TabTop.Navigator initialRouteName="AdminVarifyStudent"
    screenOptions={{
      tabBarActiveTintColor: "#fff",
      tabBarInactiveTintColor: "#000",
      tabBarIndicatorStyle: {
        backgroundColor: "white"
      },
      tabBarStyle: {
        paddingTop: 10,
        height: 70,
        backgroundColor: "#008858"
      },
    }}
    >
      <TabTop.Screen name="AdminVarifyStudent" component={AdminVarifyStudent} options={{
        tabBarLabel: 'Varify Student',
      }} />
      <TabTop.Screen name="AdminVarifyInstitute" component={AdminVarifyInstitute} options={{
        tabBarLabel: 'Varify Institute',
      }} />
      {/* <TabTop.Screen name="AdminBlock" component={AdminBlock} options={{
        tabBarLabel: 'Block',
      }} /> */}

    </TabTop.Navigator>
  );
}




const Stack = createStackNavigator();


function Studydoor() {
  const navigation = useNavigation();
  return (
    
        <Stack.Navigator initialRouteName='AdminLogin' screenOptions={{
          headerStyle: {
            backgroundColor: Color.Color.topHeaderBackground,
            shadowOpacity: 0,
            elevation: 0,
            height: 70
          },
          headerTintColor: "#fff",
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
          
        }}>
          
          <Stack.Screen name="AdminLogin" component={AdminLogin} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="Admin" component={Admin}
            options={{
              title: "Studydoor",
              headerTitleAlign: 'left',
              // headerShown: false,
              headerLeft: () => (
                <View style={{
                    flexDirection: 'row',
                    width: "auto",
                    justifyContent: 'space-between',
                    marginLeft: 10,
                  }} >
                        <MaterialCommunityIcons style={{
                          marginHorizontal:-5,
                        }} name="format-align-left" size={30} color="#fff" onPress={() => {navigation.dispatch(DrawerActions.openDrawer());}} />
                  
                  </View>
             )
            }}
            />
          <Stack.Screen name="StudentApprovement" component={StudentApprovement}
            options={{
              title: "Studydoor",
              headerTitleAlign: 'left',
              // headerShown: false,
         
            }}
            />
          <Stack.Screen name="InstituteApprovement" component={InstituteApprovement}
            options={{
              title: "Studydoor",
              headerTitleAlign: 'left',
              // headerShown: false,
      
            }}
            />

        </Stack.Navigator>
      
  );
}

const Drawer = createDrawerNavigator();

function App() {

  useEffect(() => {
    SplashScreen.hide()
  }, [])
  
  
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName='Studydoor' 
    screenOptions={{
          headerShown:false,
          headerStyle: {
            backgroundColor: Color.Color.topHeaderBackground,
            shadowOpacity: 0,
            elevation: 0,
            height: 70
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabel: 'Studydoor',
          drawerIcon:() => {
            <MaterialCommunityIcons style={{
              marginHorizontal:-5,
            }} name="format-align-left" size={30} color="#fff"/>}
        }
      }
        
      
        drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Studydoor" component={Studydoor}  options={{drawerLabel: 'Studydoor'}} 
      />
      {/* <Drawer.Screen name="AdminLogin" component={Messages} /> */}
      {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
    </Drawer.Navigator>
    </NavigationContainer>
  );
}


export default App
