
 import React, {useEffect, useState} from 'react';
 import { Text, View, Image, StyleSheet,Dimensions,TouchableOpacity ,
    ScrollView,ActivityIndicator,

} from 'react-native';
 import { MaterialCommunityIcons,Entypo,Ionicons,FontAwesome } from '@expo/vector-icons';
 
 import { StatusBar } from 'expo-status-bar';
 import { HelperText, TextInput,  } from 'react-native-paper';
 import AsyncStorage from '@react-native-async-storage/async-storage';
   import Tables from './config';

import * as Location from 'expo-location';

import URLS from './config';




export default function Mybutton({...props}) {
 
    const [loding,setLoding]=React.useState(true)
    const [etat,setEtat]=React.useState(null)

    const [latitude_c,setLatitude_c]=React.useState("")
    const [longitude_c,setLongitude_c]=React.useState("")
 
    
    useEffect(() => {
       // setLoding(true)
       prendre_positionçuser("test")

        storeNumber()
    }, []);

   
 

 







    const storeNumber = async (value) => {


                try {
                    let number_store = await AsyncStorage.getItem('contact_user')
                    if (number_store == null) {
                        props.navigation.push('sigin')
                    } else {
                        //  console.log(number_store)
                       
          let les_donnees = new FormData();
          les_donnees.append("info", "verifier_etat");
          les_donnees.append("numero", number_store);
       
      
          fetch( 
              ''+URLS+'/Etat/index',
              {
                  method:'POST',
                  body:les_donnees
              }
          ).then(response=>response.json())
          .then(response=>{
              
                   // console.log(response.statut)
      
                  if (response.statut=='success') {
                    setLoding(false)
                    setEtat(true)
                }else{
                    setLoding(false)
                    setEtat(false)
                }
          })
      

                    }
                } catch (e) {
                    console.log('error')
                }
            
        


    }


      function loadere() {
          return(
            <ActivityIndicator  size="large" color="#004599" style={{marginTop:30}}  />
          )
      }



    async function prendre_positionçuser(a_faire) {

        console.log(' consition 1111111 demander pemission');
         let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log(' Pas de Permission ');

            return;
        } else {
            let location = await Location.getCurrentPositionAsync({});
            let le_json = JSON.stringify(location)

            JSON.parse(le_json, (key, value) => {

                if (key == 'latitude') {
                      setLatitude_c(value)
                    
                }
                else if (key == 'longitude') {
                       setLongitude_c(value)
                }
            })


            if (typeof a_faire!="undefined" &&  a_faire!="test") {
                activer_desactive(a_faire)
            }
        }
    }



    async function update_position_active(){
           
            let number_store = await AsyncStorage.getItem('contact_user')

            var les_donnees = new FormData();
             les_donnees.append("latitude", latitude_c);
            les_donnees.append("longitude", longitude_c);
            les_donnees.append("info", "active_ouvert");
            les_donnees.append("numero", number_store);
         
        
            fetch( 
                ''+URLS+'/Etat/index',
                {
                    method:'POST',
                    body:les_donnees
                }
            ).then(response=>response.json())
            .then(response=>{
                
                   //   console.log(response.statut)
        
                    if (response.statut=='success') {
                      setEtat(true)
                  }
            })

     }




    async function activer_desactive(a_faire) {

       // if( latitude_c!="" &&  longitude_c!=""){
            // console.log('latitude '+ latitude_c)
            // console.log('longitude '+longitude_c)

              let number_store = await AsyncStorage.getItem('contact_user')

        let les_donnees = new FormData();
        les_donnees.append("info", "activer_desactive");
        les_donnees.append("numero", number_store);

        fetch( 
            ''+URLS+'/Etat/index',
            {
                method:'POST',
                body:les_donnees
            }
        ).then(response=>response.json())
        .then(response=>{
            
               //   console.log(response.statut)
    
               if (response.statut == 1) {
                update_position_active()        
                  }
                  if (response.statut == 0) {              
                   ouvrire_boutique(a_faire)
                  }
        })
        // }
        // else{
        //     //  redemander la position a lutilisateur
        //     prendre_positionçuser(a_faire)
        // }

      
        
    }







     async function ouvrire_boutique(a_faire) {
        console.log(' consition 2222222222 ');
           
          let number_store = await AsyncStorage.getItem('contact_user')

          let les_donnees = new FormData();
          les_donnees.append("info", "ouvrire_boutique");
          les_donnees.append("numero", number_store);

          if (a_faire=='fermer') {
            les_donnees.append("etat", 0);
        }
        else if (a_faire=='ouvert') {
            les_donnees.append("etat", 1);
       }
  
          fetch( 
              ''+URLS+'/Etat/index',
              {
                  method:'POST',
                  body:les_donnees
              }
          ).then(response=>response.json())
          .then(response=>{
              
                 //   console.log(response.statut)
                 if (response.statut =="success") {
                    if (a_faire=='fermer') {
                             setEtat(false)
                      }
                      else if (a_faire=='ouvert') {
                             setEtat(true)
                      }
                    }
          })


       
      }





      function fermer() {
          return(
              <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{ fontWeight: 'bold', fontSize: 25, marginBottom: 20, color: '#FA2646' }}>Boutique fermer</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>activer_desactive('ouvert') }>
                  <View style={styles.fermer} >
                      <Entypo name="shop" size={100} color="#fff" />
                  </View>
                  </TouchableOpacity>
              </View>
          )
      }


 


      function ouvert() {
        return(
            <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontFamily:'Montserrat',  fontSize: 20, marginBottom: 20, color: '#004599' }}>Boutique ouvert</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => activer_desactive('fermer')}>

                    <View style={styles.ouvert} >
                        <Entypo name="shop" size={100} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>
        )
      }


 


      function afficher_button() {


          return(
            <View style={styles.content}>
      
                {etat?(ouvert()):(fermer())}
          
         </View>
          )
      }



   
      






    return (
        <View style={styles.content}>
      <StatusBar style="" hidden={false} backgroundColor="#fff" />
            
            {
                loding?(loadere()):(afficher_button())
            }
           

           </View>
          
    );
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#fff'
    },
 
    fermer:{
        alignItems: 'center',
        justifyContent: 'center',
        width:200,
        backgroundColor:'#FA2646',
        height:200,
        borderRadius:100
    },
    ouvert:{
        alignItems: 'center',
        justifyContent: 'center',
        width:200,
        backgroundColor:'#27C34B',
        height:200,
        borderRadius:100
    }

})