
 import React, {useEffect, useState} from 'react';
 import { Text, View, Image, StyleSheet,Dimensions,TouchableOpacity ,
    ScrollView,ActivityIndicator,Modal

} from 'react-native';
 import { MaterialCommunityIcons,Entypo,Ionicons,FontAwesome } from '@expo/vector-icons';
 
 import { StatusBar } from 'expo-status-bar';
 import { HelperText, TextInput,  } from 'react-native-paper';
 import AsyncStorage from '@react-native-async-storage/async-storage';

 import URLS from './config';








export default function Modifier_info({...props}) {

 

    const [ville, setVille] = React.useState('');
    const [quartier, setQuartier] = React.useState('');
    const [nom_boutique, setNom_boutique] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [numero, setNumero] = React.useState('');
     const [error_1, setError_1] = React.useState(false);
    const [laoding, setLaoding] = React.useState(true);

    const [numeroInitial, setNumeroInitial] = React.useState('');
    const [visible, setVisible] = React.useState(true);  


    const [les_data, setLes_data] = React.useState(props.route.params.les_donnees); 

    const onChangeVille = text => setVille(text);
    const onChangeQuartier = text => setQuartier(text);
    const onChangeNom = text => setNom_boutique(text);
    const onChangeDescription = text => setDescription(text);
    const onChangeNumero = text => setNumero(text);



    useEffect(() => {
         afficher_employe()

     
     }, []);



    async function afficher_employe() {

        les_data.forEach(elements => {
            setNom_boutique(elements.nom_boutique)
            setDescription(elements.description)
            setNumero(elements.numero)
            setVille(elements.ville)
            setQuartier(elements.quartier)

            setNumeroInitial(elements.numero)
            setVisible(false)
        });




        // let number_store = await AsyncStorage.getItem('contact_user')

        // let les_donnees = new FormData();
        // les_donnees.append("info", "afficher_info_boutique");
        // les_donnees.append("numero", number_store);
     
    
        // fetch( 
        //     ''+URLS+'/Account/index',
        //     {
        //         method:'POST',
        //         body:les_donnees
        //     }
        // ).then(response=>response.json())
        // .then(response=>{
            
        //      //     console.log(response)
    
        //         if (response.donnee.length==0) {
        //             setVisible(false)
        //        }else{
        //          console.log(response.donnee);
        //          response.donnee.forEach(elements => {
        //             setNom_boutique(elements.nom_boutique)
        //             setDescription(elements.description)
        //             setNumero(elements.numero)
        //             setVille(elements.ville)
        //             setQuartier(elements.quartier)
    
        //             setNumeroInitial(elements.numero)
        //             setVisible(false)
        //         });
                 
             
        //        }
        // })


    }








  async  function save_data() {
        if (ville=="" || quartier==""  ||
        nom_boutique=="" || description=="" || numero=="") {
            console.log('tous les champs sont obligatoires')
        }else{
            setVisible(true)
            if (numero==numeroInitial) {

                let number_store = await AsyncStorage.getItem('contact_user')

                let les_donnees = new FormData();
                les_donnees.append("info", "modifier_sans_numero");
                les_donnees.append("numero", number_store);
                les_donnees.append("ville", ville);
                les_donnees.append("quartier", quartier);
                 les_donnees.append("nom_boutique", nom_boutique);
                les_donnees.append("description", description);
              

                fetch( 
                    ''+URLS+'/Account/index',
                    {
                        method:'POST',
                        body:les_donnees
                    }
                ).then(response=>response.json())
                .then(response=>{
                    
                     //     console.log(response)
                    if (response.statut=="success") {
                        setVisible(false)
                        props.navigation.goBack()
                    }
                    
                })

           
            }
              //   modifier le numero de telephone
            else{
                
                modifer_and_number(numero)
            }
            
        }
   }
 













  async  function modifer_and_number(params) {

    let number_store = await AsyncStorage.getItem('contact_user')

    let les_donnees = new FormData();
    les_donnees.append("info", "verifier_si_numero_exixe");
    les_donnees.append("numero_v", params);
    les_donnees.append("numero", number_store);
    les_donnees.append("ville", ville);
                les_donnees.append("quartier", quartier);
                 les_donnees.append("nom_boutique", nom_boutique);
                les_donnees.append("description", description);

                fetch( 
                    ''+URLS+'/Account/index',
                    {
                        method:'POST',
                        body:les_donnees
                    }
                ).then(response=>response.json())
                .then(async response=>{
                    
                     //     console.log(response)
                     if(response.statut=="save"){
                        await AsyncStorage.setItem('contact_user',params)
                        setVisible(false)
                        props.navigation.goBack()
                     }
                     else if (response.statut=="existe") {
                        setVisible(false)
                         console.log('le numero exixte deja')
                     }
            
                    
                })



 
    }











 






    return (
        <ScrollView style={{backgroundColor:'#fff'}}>

        <View style={styles.content}>
        <StatusBar style="" hidden={false} backgroundColor="#fff" />

      {/* <ActivityIndicator  size="small" color="#004599" style={{marginTop:30}}  /> */}
      {/* {
    laoding?(<ActivityIndicator  size="small" color="#004599" style={{marginTop:30}}  />):
    (console.log(''))
} */}


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
             keyboardType='numeric'
            style={styles.input_2} />
            <HelperText type="error" visible={error_1}>
                Email address is invalid!
            </HelperText>  



            <TextInput label="Votre ville" 
            value={ville} 
            onChangeText={onChangeVille} 
            style={styles.input} />
            <HelperText type="error" visible={error_1}>
                Email address is invalid!
            </HelperText>

            

            <TextInput label="Votre quartier" 
             value={quartier}
             onChangeText={onChangeQuartier} 
             
            style={styles.input_2} />
            <HelperText type="error" visible={error_1}>
                Email address is invalid!
            </HelperText>


            

            

            <TouchableOpacity  onPress={()=>save_data()} style={styles.touchable}> 
            <View style={styles.button}>
                <Text style={{fontWeight:'bold',fontSize:15,color:'#fff',letterSpacing:1}}>Modifier</Text>
            </View>
            </TouchableOpacity>






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
<Text style={{textAlign:'center',marginTop:15,fontSize:15,fontFamily:'Montserrat'}}>Chargement</Text>
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