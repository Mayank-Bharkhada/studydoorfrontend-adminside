import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View,ActivityIndicator,StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation,useIsFocused } from '@react-navigation/native';
import Links from '../constant/Links';
import Color from '../constant/Color';


const InstituteApprovement = ({ route }) => {

    const { instituteId } = route.params;
    const [studentData, setStudentData] = useState(null)
    const navigation = useNavigation();


    const [loading, setLoading] = useState(true)

    const handleCancel = async () => {
      setLoading(true);
        // console.log(certificateId)
        const unverifiedInstitute = await fetch(`${Links.Domain}/api/User/unvarify_institute_by_id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ instituteId: instituteId })
        });

        const unverifiedInstituteJson = await unverifiedInstitute.json();

        if (unverifiedInstituteJson.success === true) {
            Alert.alert("Cancled request successfully");
            navigation.goBack();
            
        }else{
            Alert.alert("Not able to cancle request");
        }
        setLoading(false);
    }

    const handleApprove = async () => {
      setLoading(true);
        const varifyInstituteData = await fetch(`${Links.Domain}/api/User/varify_institute_by_id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ instituteId: instituteId })
        });

        const varifyInstituteDataJson = await varifyInstituteData.json();

        if (varifyInstituteDataJson.success === true) {
            Alert.alert("Varified  successfully");
            navigation.goBack();
        }else{
            Alert.alert("Not able to varify request");
        }
        setLoading(false);
    }


    const getData = async () => {
      setLoading(true);
        const studentData = await fetch(`${Links.Domain}/api/User/institute_data_by_id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Institute_id: instituteId })
        });

        const studentDataJson = await studentData.json();

        console.log("studentDataJson//////////")
        console.log(studentDataJson)
        console.log("studentDataJson////////////")
        // if (studentDataJson.id === 1) {
          setStudentData(studentDataJson[0].data)
        // }
        setLoading(false);
    }


    


    
  const isFocused = useIsFocused();
 
  useEffect(() => {

    if (isFocused) {
    const backAction = () => {
       navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    
    return () => backHandler.remove();
    }
  }, [isFocused]);


    useEffect(() => {
        getData();

    }, [])



    return (<>
    
    <StatusBar  backgroundColor={Color.Color.topHeaderBackground}/>
        {loading ? (
            <ActivityIndicator
              size={50}
              color={Color.Color.bottomtabBackground}
              style={{ marginTop: "60%" }}
            />
          ) : 
          studentData && (<View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
     <View style={{ width: '90%', borderWidth: 1, borderColor: 'gray', borderRadius: 10, overflow: 'hidden' }}>
  <View style={[styles.tableRow,{backgroundColor:Color.Color.topHeaderBackground}]}>
    <View style={[styles.cell, { borderRightWidth: 1, borderColor: '#fff', paddingLeft: 10 }]}>
      <Text style={{color:"#fff",fontSize:20,alignSelf:"center"}}>Title</Text>
    </View>
    <View style={[styles.cell, { paddingLeft: 10 }]}>
      <Text style={{color:"#fff",fontSize:20,alignSelf:"center"}}>Details</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
      <Text>ID:</Text>
    </View>
    <View style={[styles.cell, { paddingLeft: 10 }]}>
      <Text>{studentData._id}</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
      <Text>Name:</Text>
    </View>
    <View style={[styles.cell, { paddingLeft: 10 }]}>
      <Text>{studentData.name}</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
      <Text>Number :</Text>
    </View>
    <View style={[styles.cell, { paddingLeft: 10 }]}>
      <Text>+91 {studentData.number}</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
      <Text>Establishment date :</Text>
    </View>
    <View style={[styles.cell, { paddingLeft: 10 }]}>
      <Text>{studentData.dateOfEstablishment}</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
      <Text>accreditationCertificateUrl :</Text>
    </View>
    <View style={[styles.cell, { paddingLeft: 10 }]}>
      <TouchableOpacity onPress={()=>{
        Linking.openURL(studentData.accreditationCertificateUrl);
      }}>
      <Text style={{color:"blue"}}>{studentData.accreditationCertificateUrl}</Text>
      </TouchableOpacity>
    </View>
  </View>
  <View style={styles.tableRow}>

    <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
      <Text>businessRegistrationCertificateUrl :</Text>
    </View>
    <View style={[styles.cell, { paddingLeft: 10 }]}>
      <TouchableOpacity onPress={()=>{
        Linking.openURL(studentData.businessRegistrationCertificateUrl);
      }}>
      <Text style={{color:"blue"}}>{studentData.businessRegistrationCertificateUrl}</Text>
        </TouchableOpacity>
    </View>
  </View>

</View>


        <View style={{ flexDirection: 'row',paddingTop:20 }}>
    <TouchableOpacity
        style={{ backgroundColor: "darkred", marginRight: 10, padding: 10 }}
        onPress={() => handleCancel()}
    >
        <Text style={{ color: 'white' }}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity
        style={{ backgroundColor: Color.Color.topHeaderBackground, padding: 10 }}
        onPress={() => handleApprove()}
    >
        <Text style={{ color: 'white' }}>Approve</Text>
    </TouchableOpacity>
</View>

        </View>
        
         )} 
    </>
    )
}

export default InstituteApprovement

const styles = StyleSheet.create({
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
      cell: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
      },
})