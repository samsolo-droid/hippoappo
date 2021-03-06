
 import React, {useEffect, useState} from 'react';

import { View, Text,StyleSheet,FlatList ,Image,ActivityIndicator,Button,
    SafeAreaView,TouchableOpacity,ScrollView,Modal,RefreshControlDimensions,Linking
} from 'react-native';
 import { nbr_caracter,nbr_caracter_2 } from './helper';
 import { Avatar, Card, Title, Paragraph,List } from 'react-native-paper';
  import { MaterialCommunityIcons,Entypo,Ionicons,FontAwesome,  } from '@expo/vector-icons';


  import { StatusBar } from 'expo-status-bar';

import { getDistance, getPreciseDistance } from 'geolib';
 
import * as Location from 'expo-location';

import AsyncStorage from '@react-native-async-storage/async-storage';
import URLS from './config';
 
 import detaille from './detail';

export default function Liste_shop({...props}) {


    const donnee = [
        {
            id: 1,
            nom_boutique: 'Hippo shop',
            img: require('./image/images/9.png'),
            description: 'Ma boutique vend des produit tres complet',
            status: true
        },
        {
            id: 2,
            nom_boutique: 'Victor shop ',
            img: require('./image/images/3.png'),
            description: 'Ma boutique vend des produit tres complet',
            status: false
        },
        {
            id: 3,
            nom_boutique: 'Missanou',
            img: require('./image/images/5.png'),
            description: 'Ma boutique vend des produit tres complet',
            status: true
        },
        {
            id: 4,
            nom_boutique: 'Haeder shop',
            img: require('./image/images/4.png'),
            description: 'Ma boutique vend des produit tres complet',
            status: false
        },
        {
            id: 5,
            nom_boutique: 'Haeder shop',
            img: require('./image/images/8.png'),
            description: 'Ma boutique vend des produit tres complet',
            status: true
        },
        {
            id: 6,
            nom_boutique: 'Hippo shop',
            img: require('./image/images/9.png'),
            description: 'Ma boutique vend des produit tres complet',
            status: true
        },
        {
            id: 7,
            nom_boutique: 'Victor shop ',
            img: require('./image/images/3.png'),
            description: 'Ma boutique vend des produit tres complet',
            status: false
        },
        {
            id: 8,
            nom_boutique: 'Missanou',
            img: require('./image/images/5.png'),
            description: 'Ma boutique vend des produit tres complet',
            status: true
        },
        {
            id: 9,
            nom_boutique: 'Haeder shop',
            img: require('./image/images/4.png'),
            description: 'Ma boutique vend des produit tres complet',
            status: false
        },
        {
            id: 10,
            nom_boutique: 'Haeder shop',
            img: require('./image/images/8.png'),
            description: 'Ma boutique vend des produit tres complet',
            status: true
        }
    ];

    const categorie=[
        {
            id:0,
            nom:'Tous',
            value:0
        },
        {
            id:1,
            nom:'1m de moi',
            value:1
        },
        {
            id:2,
            nom:'10m de moi',
            value:10
        },
        {
            id:3,
            nom:'20m de moi',
            value:20
        },
        {
            id:4,
            nom:'1km de moi',
            value:1000
        },
        {
            id:5,
            nom:'15km de moi',
            value:15000
        },
    ];




    const les_positions=[
        {
            id:1,
            lat:20.3947972,
            long:62.3312881
        },
        {
            id:2,
            lat:27.3947972,
            long:60.3312881
        },
        {
            id:3,
            lat:25.3947972,
            long:68.3312881
        },
        {
            id:4,
            lat:25.3947973,
            long:68.3312882
        }
    ]

 
    const [latitude_a, setLatitude_a] = useState(null);
    const [longitude_a, setLongitude_a] = useState(null);

    const [location, setLocation] = useState(null);
     const [status, requestPermission] = Location.useBackgroundPermissions();

    const [data,setData]=React.useState({})
    const [s_garde,setS_garde]=React.useState([])
    const [loding,setLoding]=React.useState(false)
    const [selectItem,setSelectItem]=React.useState(0);
    const [visible, setVisible] = React.useState(false);

 
    const [detail,setDetail]=React.useState([])

 

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
          headerRight: () => (
            <FontAwesome name="search" size={20} color="black" 
                  style={{ color:  '#fff',marginRight:20,marginTop:5  }}
                  onPress={() => props.navigation.navigate('recherche')}
                  />
          ),
        });
      }, [props.navigation]);



    useEffect(() => {
         setLoding(true)
         afficher_boutique()
         prendre_position()
          const unsubscribe =props.navigation.addListener('focus', () => {
          //  prendre_position()
          rafraichir()
              //  
          })
          return unsubscribe;
      
      }, [props.navigation]);

 

     
    
       
      
 
    async function prendre_position() {
          let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log(' Pas de Permission ');
          
           return;
        }else{
            let location = await Location.getCurrentPositionAsync({});
            let le_json=JSON.stringify(location)
            //   coords
            

            JSON.parse(le_json, (key, value) => {
                  //  latitude
                if (key === 'latitude') {
                    //   6.196147344621338
                     setLatitude_a(value)
                  }
                  if (key === 'longitude') {
                    //  1.1664933650057177
                     setLongitude_a(value)
                  }
                 
              });
           
             
        }
  
      
    }


    
    async function redemander_permission(mesure) {
        console.log(mesure)
    }




    const filtrer =async (mesure) => {
          // console.log('la donnee '+ mesure_recherche)
          
          detaille.push(mesure)
          

             setLoding(true)
            setData({})
        if (mesure == 0) {
             setLoding(true)
            afficher_boutique()
            console.log('tous afficher')
            detaille.shift();
        } else {
            detaille.shift();
            if (status!==null) {
                if (status.status=='granted' ) {
                  await  prendre_position()
                 
                    //****************************************** */
                    if (latitude_a!=null) {
                      //  console.log(latitude_a)
                       // let datas = les_positions;
                            let filteredDates = s_garde.filter((item) => {
                                if (item.latitude!="" && item.longitude!="") {
                                     return getPreciseDistance(
                                    { latitude: latitude_a, longitude: longitude_a },  //  poition acheteur
                                    { latitude: item.latitude, longitude: item.longitude }   //  position boutique
                                ) <= mesure
                                }
                               
                            });
                        // console.log(filteredDates)
                        
                          //  setTimeout(() => {
                                 setLoding(false)
                            setData(filteredDates)
                          //  }, 1000);
                    }
                
                    //********************************************* */
                }
                else{
                   // prendre_position(mesure)
                   console.log('activer botre positon')
                   // redemander la permision
                 await  redemander_permission(mesure)
                }
                
              }



        }

    };




    function rafraichir() {
       
        if(detaille[0]==0){
            afficher_boutique()
        }else{
           
            
        //    setTimeout(() => {
        //          rafraichir_filtre(detaille[0])
        //      }, 2000);
           
        }
    }

    

//   function rafraichir_filtre(mesure) {
//     console.log(mesure)
//     let filteredDates = s_garde.filter((item) => {
//         if (item.latitude!="" && item.longitude!="") {
//              return getPreciseDistance(
//             { latitude: latitude_a, longitude: longitude_a },  //  poition acheteur
//             { latitude: item.latitude, longitude: item.longitude }   //  position boutique
//         ) <= mesure
//         }
       
//     });
//     console.log(data)
//      // setData(filteredDates)
//   }















      
    const filtrage_detail = (ident) => {
            
         setDetail([])
            let filteredDates = data.filter((item) => {
                return item.id==ident
            })             
            setDetail(filteredDates)
            setVisible(true)

    }
 
      
 




    async function afficher_boutique() {

         

      //  setData({})

        let les_donnees = new FormData();
        les_donnees.append("info", "afficher_les_boutique");


        fetch(
            '' + URLS + '/Home/index',
            {
                method: 'POST',
                body: les_donnees
            }
        ).then(response => response.json())
            .then(response => {

                //     console.log(response)

                if (response.donnee.length == 0) {
                    // console.log('pas de donnee')
                    setLoding(false)
                    setData([])
                    setS_garde([])
                } else {
                    // console.log(response.donnee);
                    setS_garde(response.donnee)
                    setData(response.donnee)
                    setLoding(false)
                }
            })





      
      }













    

    function active() {
        return (
            <View style={styles.content_connect}>

                <View style={styles.icon_check}>
                    <FontAwesome name="check" size={10} color="#fff" />
                </View>
                <Text style={{ fontWeight: 'bold', color: '#26C24A' }}>Ouvert  </Text>

            </View>
        )
    }

    function fermer() {
        return (
            <View style={styles.content_connect}>

                <View style={styles.icon_chec_bixk}>
                    <FontAwesome name="close" size={10} color="#fff" />
                </View>
                <Text style={{ fontWeight: 'bold', color: '#FA2646' }}>Fermer  </Text>

            </View>
        )
    }

    function loader() {
        return(
            <View  style={{flex: 1,
                alignItems: 'center',
                justifyContent: 'center'}}
            >
            <ActivityIndicator  size="large" color="#004599" style={{marginTop:30}}  />
            </View>
        )
    }


    function Pas_donnee() {
        return(
            <View  style={{flex: 1,
                alignItems: 'center',
                justifyContent: 'center'}}
            >
            <Text>Pas de donn??e</Text>

            </View>
        )
    }


    function liste_categorie() {
        return(
            <SafeAreaView >
    
      <View style={styles.liste} >
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} > 
              {categorie.map((info,index)=>(
                  
                       <TouchableOpacity key={index} onPress={()=>{
                       setSelectItem(index)
                      filtrer(info.value)
                     }
                     
                     }>
                  <Text style={[styles.tewt,selectItem==index && styles.select]} >{info.nom}</Text>
                  </TouchableOpacity>
                 
                    
              )) }
         </ScrollView>
      </View>
     </SafeAreaView>
        )
    }

 
   async function supprimer(){
        await AsyncStorage.clear()
    }




function contacter(numero) {
    
    Linking.openURL('http://api.whatsapp.com/send?phone='+numero+'');
}




































  return (
    <View style={{ flex: 1,  }}>
        <StatusBar  hidden={false} backgroundColor="#fff" />

{/* <Button title='supprimer numero' onPaste={()=>supprimer() } /> */}
        {liste_categorie()}


        {loding?(loader() ) : null }

          {data.length==0?(Pas_donnee() ) : 
          (

           
                  <FlatList
                      showsVerticalScrollIndicator={false}
                      data={data}
                      keyExtractor={(item, index) => String(index)}
                      renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.6} 
                         onPress={()=>{
                            // console.log(item.id)
                            filtrage_detail(item.id)
                             
                         } }
                        > 
                          <View style={styles.container_img}>

                              <View style={styles.content_head}>

                                  <View style={styles.content_body}>

                                      <View style={styles.logo}>
                                          <Text style={{ color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>{nbr_caracter(item.nom_boutique)} </Text>
                                      </View>



                                      <View  >
                                          <Text style={{ fontWeight: 'bold', }}> {item.nom_boutique}</Text>
                                          <Text style={{ paddingLeft: 5, }}>{nbr_caracter_2(item.quartier)}  </Text>


                                          {/* verifier la condition */}
                                          {item.etat == true ? (active()) : (fermer())}

                                      </View>

                                  </View>

                                  <View style={styles.content_head}>
                                  {item.image  ? (
                                       <Image 
                                       source={{uri:''+URLS+'/uploads/'+item.image}}
                                        style={{ height: 50, width: 60, borderRadius: 10 }}
                                       />
                                  ) : (null)}
                                     
                                  </View>

                              </View>


                              {/* <View style={styles.carte}>
                                  <Image source={require('./image/images.jpg')} style={{ height: 100, width: '100%' }}
                                  />
                              </View> */}





                          </View>
                          </TouchableOpacity>
                      )}
                  />

                   
          
          ) }





            <Modal

                animationType="fade"
                transparent={true}
                
                visible={visible}
                onShow={() => {
                   
                }}
                onRequestClose={() => {
                    
                    /*  Alert.alert("Modal has been closed.");
                      setModalVisible(!modalVisible); */
                }}

            >

               

                <View style={{  flex: 1,  backgroundColor: 'rgba(0,0,0,0.8) ' }}>

                    <View style={{position:'absolute',bottom:0,  borderRadius: 7, width: '100%', height: '80%', backgroundColor: '#fff' }}>
                       
                       
                        
                        <View style={{ paddingRight:10,marginTop:5, flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginBottom: 5 }}>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                            <Ionicons name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>


                        {/* //  ******************************************************************************
//                                 PARTIE DE TRAITEMENT
//  ******************************************************************************
  */}
  {/* <ActivityIndicator size="large" color="#0C9869" /> */}

                      {detail.map((info, index) => (
                          <ScrollView key={index}>
                          <View >

                              <View style={styles.carte}>
                                  <Image source={require('./image/images.jpg')} style={{ height: 200, width: '100%' }}
                                  />
                              </View>


                              <Card.Content>
                                  <Title style={{ fontWeight: 'bold', marginLeft: -4 }}> {info.nom_boutique} </Title>
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

                            <TouchableOpacity activeOpacity={0.6} onPress={()=>{
                                contacter(info.numero)
                            } }>
                              <View style={{ width: '100%', flex: 1, height: 'auto', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                  <View style={styles.btn_contact}>
                                      <Text style={{ color: "#fff" }}>Contacteez via whatsapp</Text>
                                  </View>
                              </View>
                              </TouchableOpacity>



                          </View>
                          </ScrollView>
                      ))}

                              

                      {/* //  ******************************************************************************
//                                 PARTIE DE TRAITEMENT
//  ******************************************************************************
  */}
                       
                        
                        {/*  */}
                        
                    </View>

                </View>
            </Modal>




       


    </View>
  );
}

 


const styles = StyleSheet.create({
    btn_contact:{
       
        backgroundColor:'#20C046',
        width:'80%',
        paddingVertical:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
        marginVertical:10
        
        
    },
    tewt:{
        fontSize:16,
        color:'grey',
        fontWeight:'bold',
        marginHorizontal:15
        },
    select:{
        color:'#004599',
        borderColor:'#004599',
        paddingBottom:5,
        borderBottomWidth:3
         
       },
    liste:{
         
        marginTop:30,
      marginBottom:20,
      paddingHorizontal:10
    
       },
    carte:{
        height:'auto',
        width:'100%'
    },
    container_img: {
      width: '100%',
     height:'auto',
     backgroundColor:'#fff',
     marginBottom:10,
     paddingTop:5,
     marginBottom:10,
     borderWidth:0.5,
     borderColor:'#ccc',
     
     },
     content_head:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:2
     },
     content_connect:{
        flexDirection:'row',
     },
     content_body:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:2,
        
     },
     logo:{
         alignItems: 'center',
        justifyContent: 'center',
        height:50,
        width:50,
        backgroundColor:'#004599',  // #2E006C    004599
        borderRadius:30
     },
     icon_check:{
        alignItems: 'center',
        justifyContent: 'center',
        height:20,
        width:20,
        backgroundColor:'#26C24A',
        borderRadius:10,
        marginLeft:-20,
        marginTop:-10
     },
     icon_chec_bixk:{
        alignItems: 'center',
        justifyContent: 'center',
        height:20,
        width:20,
        backgroundColor:'#FA2646',
        borderRadius:10,
        marginLeft:-20,
        marginTop:-10
     }

    })

