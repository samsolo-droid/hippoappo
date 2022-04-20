
import React, { useEffect, useState } from 'react';
import {
  Text, View, Image, StyleSheet, Dimensions, TouchableOpacity,
  ScrollView, ActivityIndicator,Platform,Modal

} from 'react-native';
import { MaterialCommunityIcons, Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';
import { HelperText, TextInput, } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios'
import URLS from './config';



export default function Signup_2({ ...props }) {

  const [profil, setProfil] = React.useState(null);
  const [laoding, setLaoding] = React.useState(false);
  const [visible, setVisible] = React.useState(false);  


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })

  }, []);


  async function save_data() {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });



    if (!result.cancelled) {
      setProfil(result.uri);
      uploader_image(result)
    }
  }



  async function uploader_image(result) {


    

    setTimeout(() => {
      setVisible(true)
    }, 1000);





    let number_store = await AsyncStorage.getItem('contact_user')

    let les_donnees = new FormData();    
    les_donnees.append("info", "inscription_etape_3");
    les_donnees.append("number_user", number_store);
     les_donnees.append('fichier',
    {
      type:'image/jpeg',
       uri:result.uri ,  
       name:'image.jpg' 
      });

// for(let value of les_donnees.values() ){
//   console.log(value)
// }





  await  fetch(
      ''+URLS+'/Home/index',
      {
          method:'post',
          body:les_donnees,
          headers: {
         
            Accept: "application/json",
           // "Content-Type": "multipart/form-data",
            // Authorization: 'JWT',
          //  "Content-Type": "application/x-www-form-urlencoded",
         
          }
      }
  ).then(response=>response.json())
  .then(response=>{
      console.log(response)
    if (response.statut == "success") {
      setVisible(false)

      props.navigation.push('Liste_shop')
    }
    else {
      setVisible(false)
      cpnsole.log('erreur')
    }
  })
 






  }






  function Ignorer() {
    console.log('ignorer')
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
      props.navigation.push('Liste_shop')
    }, 1000);
   
  }


  return (

    <View style={styles.content}>
      <StatusBar style="" hidden={false} backgroundColor="#fff" />

      <Text style={{ fontWeight: 'bold', fontSize: 25, marginBottom: 40, color: '#004599' }}>S'incrire</Text>



      <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#004599', marginBottom: 10, }}>Votre photo de profile</Text>

      <TouchableOpacity onPress={() => save_data()} style={styles.touchable}>
        <View style={styles.img}>
          {
            profil ?
              (<Image source={{ uri: profil }} style={{ height: '100%', width: '100%' }} />) :
              (<Image source={require('./image/img.png')} style={{ height: '100%', width: '100%' }} />)
          }

        </View>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => Ignorer()} >
        <Text style={{ color: '#000', marginTop: 20 }}> Ignorer </Text>
      </TouchableOpacity>


      {/* <View style={styles.button}>
                <Text style={{fontWeight:'bold',fontSize:15,color:'#fff',letterSpacing:1}}>Suivant</Text>
            </View> */}

      {/* <ActivityIndicator  size="large" color="#004599" style={{marginTop:5}}  /> */}

      {/* {
        laoding ? (<ActivityIndicator size="large" color="#004599" style={{ marginTop: 20 }} />) :
          (console.log(''))
      } */}





<Modal

animationType="fade"
transparent={true}
visible={visible}
onRequestClose={() => {
/*  Alert.alert("Modal has been closed.");
    setModalVisible(!modalVisible); */
}}

>

<View style={{ paddingHorizontal: 20, flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8) ' }}>
<View style={{justifyContent: "center", borderRadius: 7, width: '100%',height:200, backgroundColor: '#fff' }}>

<ActivityIndicator size="large" color="#004599" />
<Text style={{textAlign:'center',marginTop:15,fontSize:15,fontFamily:'Montserrat'}}>Traitement</Text>
</View>
</View>
</Modal>






    </View>
  );
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  input: {
    width: '90%'
  },
  input_2: {
    height: 70,
    width: '90%'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: '#004599',
    paddingVertical: 18
  },
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    // backgroundColor:'#000C18',
    height: 150,
    // borderRadius:50,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#ccc'

  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    // width:'90%',
    backgroundColor: '#ccc',

  }

})