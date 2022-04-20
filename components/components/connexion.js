
import * as React from 'react';
import { Text, View, Image, StyleSheet,Dimensions,TouchableOpacity ,
    ScrollView,ActivityIndicator,Modal

} from 'react-native';
 import { MaterialCommunityIcons,Entypo,Ionicons,FontAwesome } from '@expo/vector-icons';
 
 import { StatusBar } from 'expo-status-bar';
 import { HelperText, TextInput,  } from 'react-native-paper';
 import AsyncStorage from '@react-native-async-storage/async-storage';

 import URLS from './config';


export default function Connexion({...props}) {

    const [numero, setNumero] = React.useState('');
    const [passe, setPasse] = React.useState('');
    const [error_numero, setError_numero] = React.useState(false);
    const [error_passe, setError_passe] = React.useState(false);
    const [visible, setVisible] = React.useState(false);  


    const [loding, setLoding] = React.useState(false);

    const onChangeNumero = text => setNumero(text);
    const onChangePasse = text => setPasse(text);

    
 async function SeLoger() {
  //  props.navigation.push('sigin')

     if (numero=="" || passe=="") {
       console.log('tous les sont obligatoite')
     }else{

        setVisible(true)

         let les_donnees = new FormData();    
         les_donnees.append("info", "connexion");
         les_donnees.append("numero", numero);
         les_donnees.append("mot_de_passe", passe);


         
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
.then(async response=>{
   // console.log(response)

    if (response.statut=="success") {
        console.log('connecter')
        setVisible(false)

         await AsyncStorage.setItem('contact_user',numero)
         props.navigation.push('Liste_shop')
     }else{
        setVisible(false)

         console.log('Numero ou mot de passe incorrrect')
     }

    
})


     }


    
 }




 function s_inscrire(){
props.navigation.push('sigin')
 }


    return (
        
        <View style={styles.content}>
      <StatusBar style="" hidden={false} backgroundColor="#fff" />

            <Text style={{fontWeight:'bold',fontSize:25,marginBottom:40,color:'#004599'}}>Connexion</Text>


            <TextInput label="Numéro whatsapp" 
            keyboardType='numeric'
            value={numero} 
            onChangeText={onChangeNumero} 
            style={styles.input} />
            <HelperText type="error" visible={error_numero}>
            Champs obligatoire
            </HelperText>

            <TextInput label="Mot de passe" 
             multiline={true}
            value={passe}
            secureTextEntry={true}
             onChangeText={onChangePasse} 
            style={styles.input_2} />
            <HelperText type="error" visible={error_passe} >
                Champs obligatoire
            </HelperText>

           <TouchableOpacity  style={styles.touchable} onPress={()=>SeLoger()}>
            <View style={styles.button}>
                <Text style={{fontWeight:'bold',fontSize:15,color:'#fff',letterSpacing:1}}>Se connecter</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={()=>s_inscrire()} >
            <Text style={{fontWeight:'bold',fontSize:15,color:'#000',marginTop:20,letterSpacing:1}}>S'inscrire</Text>
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