
import * as React from 'react';
import { Text, View, Image, StyleSheet,Dimensions,TouchableOpacity ,
    ScrollView,ActivityIndicator,Modal

} from 'react-native';
 import { MaterialCommunityIcons,Entypo,Ionicons,FontAwesome } from '@expo/vector-icons';
 
 import { StatusBar } from 'expo-status-bar';
 import { HelperText, TextInput,  } from 'react-native-paper';
 import AsyncStorage from '@react-native-async-storage/async-storage';

 import URLS from './config';





export default function Modifier_passe({...props}) {

     const [passe_1, setPasse_1] = React.useState('');
    const [passe_2, setPasse_2] = React.useState('');
    const [error_1, setError_1] = React.useState(false);
    const [laoding, setLaoding] = React.useState(false);
    const [visible, setVisible] = React.useState(false);  


     const onChangePasse_1 = text => setPasse_1(text);
    const onChangePasse_2 = text => setPasse_2(text);


  async  function save_data() {
        if ( passe_1=="" || passe_2=="") {
            console.log('tous les champs sont obligatoires')
        }else{
          
            if (passe_1.trim()==passe_2.trim()) {
                setVisible(true)
                
                let number_store = await AsyncStorage.getItem('contact_user')

 
                let les_donnees = new FormData();
                les_donnees.append("info", "modifier_mot_deçpasse");
                les_donnees.append("numero", number_store);
                les_donnees.append("passe", passe_1);


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
                    }else{
                        setVisible(false)
                        console.log('erreur reessayer')
                    }
                    
                })


             //   props.navigation.push('signup_2')
            }else{
                setLaoding(false)
                console.log('mot de passe incorrect')
            }
            
        }
   }
 


    return (
        <ScrollView style={{marginTop:20}}>

        <View style={styles.content}>
        <StatusBar style="" hidden={false} backgroundColor="#fff" />


            <TextInput label="Nouveau Mot de passe" 
             value={passe_1}
             onChangeText={onChangePasse_1} 
             secureTextEntry={true}
            style={styles.input_2} />
            <HelperText type="error" visible={error_1}>
                Email address is invalid!
            </HelperText>

            <TextInput label="Confirmer le mot de passe" 
             value={passe_2}
             secureTextEntry={true}
             onChangeText={onChangePasse_2} 
            style={styles.input_2} />
            <HelperText type="error" visible={error_1}>
                Email address is invalid!
            </HelperText>

            

            <TouchableOpacity  onPress={()=>save_data()} style={styles.touchable}> 
            <View style={styles.button}>
                <Text style={{fontWeight:'bold',fontSize:15,color:'#fff',letterSpacing:1}}>Modifier</Text>
            </View>
            </TouchableOpacity>

            {/* <ActivityIndicator  size="small" color="#004599" style={{marginTop:30}}  /> */}
            {/* {
    laoding?(<ActivityIndicator  size="small" color="#004599" style={{marginTop:30}}  />):
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