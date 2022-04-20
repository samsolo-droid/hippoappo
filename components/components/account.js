
import React, { useEffect, useState } from 'react';
import {
    Text, View, Image, StyleSheet, Dimensions, TouchableOpacity,
    ScrollView, ActivityIndicator, Modal,Alert

} from 'react-native';
import { MaterialCommunityIcons, Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';
import { Avatar, Button, Card, Title, Paragraph, List } from 'react-native-paper';
import Tables from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import URLS from './config';



export default function Account({ ...props }) {

    //console.log(props.navigation)

    const [data, setData] = React.useState([]);
    const [laoding, setLaoding] = React.useState(true);
    const [visible, setVisible] = React.useState(false);


    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Entypo name="dots-three-vertical" size={20} color="black"
                    style={{ color: '#fff', marginRight: 20, marginTop: 5 }}
                    onPress={() => {
                        afficher_modal()
                    }}
                />

            ),
        });
    }, [props.navigation]);


    useEffect(() => {



        afficher_boutique()

        const unsubscribe = props.navigation.addListener('focus', () => {

            afficher_boutique()
        })
        return unsubscribe;

    }, [props.navigation]);






    async function afficher_modal() {
        let number_store = await AsyncStorage.getItem('contact_user')
        if (number_store !== null) {
            setVisible(true)
        }
    }





    async function afficher_boutique() {

        let number_store = await AsyncStorage.getItem('contact_user')



        let les_donnees = new FormData();
        les_donnees.append("info", "afficher_info_boutique");
        les_donnees.append("numero", number_store);


        fetch(
            '' + URLS + '/Account/index',
            {
                method: 'POST',
                body: les_donnees
            }
        ).then(response => response.json())
            .then(response => {

                //     console.log(response)

                if (response.donnee.length == 0) {
                    setLaoding(false)
                } else {
                 //   console.log(response.donnee);
                    setData(response.donnee)
                    setLaoding(false)

                }
            })








    }


    async function change_image() {
       
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
  
  
      if (!result.cancelled) {
          console.log(result.uri)
          //  poser la question 
         // Alert.alert('modifier image')
         Alert.alert(
             'Action',
            "Voullez-vous modifier l'imagee",
             [
              {
                text: "Non",
                 style: "cancel"
              },
              { text: "Oui", onPress: () =>  uploader_image(result) }
            ]
          );
          
      }
    }



    async function uploader_image(result) {
 
        let number_store = await AsyncStorage.getItem('contact_user')
  
      let les_donnees = new FormData();    
      les_donnees.append("info", "modifier_image");
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
        ''+URLS+'/Account/index',
        {
            method:'post',
            body:les_donnees,
            headers: {
           
              Accept: "application/json",
               "Content-Type": "multipart/form-data",
              // Authorization: 'JWT',
            //  "Content-Type": "application/x-www-form-urlencoded",
           
            }
        }
    ).then(response=>response.json())
    .then(response=>{
       // console.log(response)
        if (response.statut == "success") {
            afficher_boutique()
        }
        else {
            Alert.alert('Erreur',"Le format de l'image est incorrecte")
        }
    })
   
    }










    function afficher_loader() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#004599" style={{ marginTop: 30 }} />
            </View>
        )
    }










    function afficher_content() {
        return (

            <View style={styles.content}>
 
                {data.map((info, index) => (

                    <Card key={index}>
                        {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}

                        <Card.Cover
                        
                            source={{uri:''+URLS+'/uploads/'+info.image}}
                        />

                        <View style={styles.content_img}>
                            <TouchableOpacity onPress={()=>change_image() }>
                            <View style={styles.img}>
                                <FontAwesome name="edit" size={20} color="#fff"
                                />
                            </View>
                            </TouchableOpacity>
                        </View>


                        <Card.Content>
                            <Title style={{ fontWeight: 'bold' }}> {info.nom_boutique} </Title>
                        </Card.Content>


                        <Card.Content>
                            <Title style={{ fontWeight: 'bold', fontSize: 15 }}>Description</Title>
                            <Paragraph>
                                {info.description}
                            </Paragraph>
                        </Card.Content>

                        <Card.Content>
                            <Title style={{ fontWeight: 'bold', fontSize: 15 }}>Ville</Title>
                            <Paragraph>
                                {info.ville}
                            </Paragraph>
                        </Card.Content>

                        <Card.Content>
                            <Title style={{ fontWeight: 'bold', fontSize: 15 }}>Quartier</Title>
                            <Paragraph>
                                {info.quartier}
                            </Paragraph>
                        </Card.Content>


                        <Card.Content>
                            <Title style={{ fontWeight: 'bold', fontSize: 15 }}>Numéro</Title>
                            <Paragraph>
                                {info.numero}
                            </Paragraph>
                        </Card.Content>

                    </Card>



                ))}


            </View>

        )
    }


    function pas_de_deonne() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                <Text style={{ fontWeight: 'bold' }}>Pas de donne</Text>
            </View>
        )

    }










    return (
        <ScrollView>
        <StatusBar  hidden={false} backgroundColor="#fff" />
            <View >
           

                {
                    laoding ? (afficher_loader()) :
                        data.length == 0 ? (pas_de_deonne()) :
                            (afficher_content())
                }


                <Modal

                    animationType="fade"
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {
                        /*  Alert.alert("Modal has been closed.");
                          setModalVisible(!modalVisible); */
                    }}

                >



                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8) ' }}>

                        <View style={{ position: 'absolute', bottom: 0, borderRadius: 7, width: '100%', height: 'auto', backgroundColor: '#fff' }}>



                            <View style={{ paddingRight: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginBottom: 5 }}>
                                <TouchableOpacity onPress={() => setVisible(false)}>
                                    <Ionicons name="close" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <List.Section>

                                <List.Item title="Modifier mes informations"
                                    // left={() => <List.Icon icon="folder" />} 
                                    onPress={() => {
                                        setVisible(false)
                                        props.navigation.push('modifier_info',{
                                             les_donnees:data
                                            
                                        })
                                    }}
                                />

                                <List.Item
                                    title="Modifier la positon de la boutique"
                                //left={() => <List.Icon color="#000" icon="folder" />}
                                onPress={() => {
                                    setVisible(false)
                                    props.navigation.push('modifier_position')
                                }}
                                />

                                <List.Item
                                    title="Changer le mot de passe"
                                    //left={() => <List.Icon color="#000" icon="folder" />}
                                    onPress={() => {
                                        setVisible(false)
                                        props.navigation.push('modifier_passe')
                                    }}
                                />

                                <List.Item
                                    title="Mon abonnement"
                                // left={() => <List.Icon color="#000" icon="folder" />}
                                onPress={() => {
                                    setVisible(false)
                                    props.navigation.push('mon_abonnement')
                                }}
                                />

                            </List.Section>

                            {/* <ActivityIndicator size="small" color="#0C9869" /> */}
                        </View>

                    </View>
                </Modal>


            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#fff'
    },
    img: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        backgroundColor: '#000C18',
        height: 40,
        borderRadius: 50
    },
    content_img: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: -20,
        marginRight: 5
    }

})