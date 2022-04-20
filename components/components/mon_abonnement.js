import React from 'react'
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';


export default function Mon_abonnement({ ...props }) {

    
     function save_data(params) {
         
     }
 
  React.useEffect(() => {
     
  }, []);

  return (

      <View style={{ flex: 1 }}>
          <StatusBar style="" hidden={false} backgroundColor="#fff" />

          <View style={styles.head_1}>
              <Text style={{ fontSize: 20 }}>  Votre plan d'abonnement </Text>
          </View>


          <View style={styles.head_2}>
              <View style={styles.head_3}>
                  <Text style={{ color: '#fff' }}>  Votre abonnement fini dans 9 jours </Text>
              </View>
          </View>


          <View style={{ width: '100%' }}>
              <View style={styles.head_4}>
                  <View style={styles.head_5}>
                      <Text style={{ fontSize: 15 }}>  Date de début </Text>
                      <Text style={{ fontSize: 15 }}>  10/42/2022 </Text>
                  </View>

                  <View style={styles.head_5}>
                      <Text style={{ fontSize: 15 }}>  Date de fin </Text>
                      <Text style={{ fontSize: 15 }}>  20/12/2022 </Text>
                  </View>
              </View>
          </View>


          <View style={styles.head_1}>
              <Text style={{ fontSize: 20 }}>  2000 Fcfa par Mois </Text>
          </View>




          <TouchableOpacity activeOpacity={0.6} onPress={() => {
                //save_position()
            }}>
                <View style={{ width: '100%', flex: 1, height: 'auto', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.btn_contact}>
                        <Text style={{ color: "#fff" }}>Renouveler</Text>
                    </View>
                </View>
            </TouchableOpacity>




      </View>


  );


}

const styles = StyleSheet.create({

    btn_contact:{
       
        backgroundColor:'#004599',
        width:'80%',
        paddingVertical:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
        marginVertical:10,
        marginTop:40

        
        
    },

    head_1:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20
    },
    head_2:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20,
     },
    head_3:{
        alignItems: 'center',
        justifyContent: 'center',
         height:40,
        width:'90%',
        backgroundColor:'#22343B'
    },
    head_4:{
        width:'100%',
        marginTop:20,
        paddingHorizontal:15,
        
    },
    head_5:{
         width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
         paddingVertical:10
     },
     head_6:{
        marginTop:40,

     },
     touchable:{
         
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%',
        backgroundColor:'#004599',
         
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%',
        backgroundColor:'#004599',
        paddingVertical:10
    },

 
  
  })