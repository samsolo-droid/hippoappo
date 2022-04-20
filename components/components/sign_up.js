
 import React, {useEffect, useState} from 'react';
 import { Text, View, Image, StyleSheet,Dimensions,TouchableOpacity ,
    ScrollView,ActivityIndicator,Modal
} from 'react-native';
 import { MaterialCommunityIcons,Entypo,Ionicons,FontAwesome } from '@expo/vector-icons';
 import { StatusBar } from 'expo-status-bar';
 import { HelperText, TextInput,  } from 'react-native-paper';
 import AsyncStorage from '@react-native-async-storage/async-storage';

 import axios from 'axios'

 import URLS from './config';









export default function Signup({...props}) {

    const [nom_boutique, setNom_boutique] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [numero, setNumero] = React.useState('');
    const [error_1, setError_1] = React.useState(false);
    const [laoding, setLaoding] = React.useState(false);    
    const [visible, setVisible] = React.useState(false);  


    const onChangeNom = text => setNom_boutique(text);
    const onChangeDescription = text => setDescription(text);
    const onChangeNumero = text => setNumero(text);


    useEffect(() => {
         
        //  setLoding(true)
      //  afficher_employe()
  
        }, []);
    
        // nom_boutique
        // description
        // numero
        // ville
        // quartier



    //   async function afficher_employe() {
    //     let  query = new Parse.Query(Tables);
    //       await query.find()
    //      .then(function(pet){

    //          console.log(pet)
         
 
            
    //       }).catch(function(error){
    //           console.log("Error: " + error.code + " " + error.message);       
    //       });
 
    //     }


  



    async function save_data() {
        if (nom_boutique == "" || description == "" || numero == "") {
            console.log('tous les champs sont obligatoires')
        } else {
            setVisible(true)

            

            let les_donnees = new FormData();
            les_donnees.append("info", "inscription_etape_1");
            les_donnees.append("nom_boutique", nom_boutique);
            les_donnees.append("description", description);
            les_donnees.append("numero", numero);


            await fetch(
                ''+URLS+'/Home/index',
                {
                    method: 'post',
                    body: les_donnees,
                    headers: {

                        Accept: "application/json",
                       // "Content-Type": "multipart/form-data",
                        // Authorization: 'JWT',
                        //  "Content-Type": "application/x-www-form-urlencoded",

                    }
                }
            ).then(response => response.json())
                .then(async response => {

                    if (response.statut == "numero_existe") {
                        setVisible(false)
                        console.log('le numero existe deja')
                    }
                    else if (response.statut == "save") {
                        await AsyncStorage.setItem('contact_user', numero)
                        setVisible(false)
                        props.navigation.push('signup_1')
                    }
                    else{
                        setVisible(false)
                        console.log('erreur reesayer')
                    }


                })





        }
    }


    function connexion(){
        props.navigation.push('connexion')
    }

       


    return (
        
        <View style={styles.content}>
            <StatusBar style="" hidden={false}   backgroundColor="#fff"  />

            <Text style={{fontWeight:'bold',fontSize:25,marginBottom:40,color:'#004599'}}>S'incrire</Text>


            <TextInput label="Nom de la boutique" 
            value={nom_boutique} 
            onChangeText={onChangeNom} 
            style={styles.input} />
            <HelperText type="error" visible={error_1}>
                Email address is invalid!
            </HelperText>

            <TextInput label="Description de la boutique" 
             multiline={true}
            value={description}
             onChangeText={onChangeDescription} 
            style={styles.input_2} />
            <HelperText type="error" visible={error_1}>
                Email address is invalid!
            </HelperText>

            <TextInput label="Votre numéro whatsapp" 
             value={numero}
             onChangeText={onChangeNumero} 
            // keyboardType='number'
            style={styles.input_2} />
            <HelperText type="error" visible={error_1}>
                Email address is invalid!
            </HelperText>  

            <TouchableOpacity  onPress={()=>save_data()} style={styles.touchable}>
            <View style={styles.button}>
                <Text style={{fontWeight:'bold',fontSize:15,color:'#fff',letterSpacing:1}}>Suivant</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={()=>connexion()} >
            <Text style={{fontWeight:'bold',fontSize:15,color:'#000',marginTop:20,letterSpacing:1}}>Connexion</Text>
            </TouchableOpacity>

{/* {
    laoding?(<ActivityIndicator  size="large" color="#004599" style={{marginTop:30}}  />):
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
        backgroundColor:'#fff'
    },
    input:{
        width:'90%'
    },
    input_2:{
        height:70,
        width:'90%'
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%',
        backgroundColor:'#004599',
        paddingVertical:18
    },
    touchable:{
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%',
        backgroundColor:'#004599',
         
    }

})