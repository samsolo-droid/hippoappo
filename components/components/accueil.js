
import * as React from 'react';
import { Text, View, Image, StyleSheet,Dimensions,TouchableOpacity ,
    ScrollView,

} from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons,Entypo,Ionicons,FontAwesome } from '@expo/vector-icons';
 
 import { StatusBar } from 'expo-status-bar';




export default function HomeScreen() {
    const [selectItem,setSelectItem]=React.useState(0);

    const donnee=[
        {
            id:1,
            nom_boutique:'Hippo shop',
            quartier:'Avedji',
            drescription:'Boutisue de vente de chaussure et de diverse cgose'
        },
        {
            id:2,
            nom_boutique:'Victor shop',
            quartier:'Wessome',
            drescription:'Boutisue de vente de nouritture de tres bonne qualite'
        },
        {
            id:3,
            nom_boutique:'Deborah shop',
            quartier:'Assivito',
            drescription:'Boutisue de vente de produit electronique importer depuis la france'
        },
        {
            id:4,
            nom_boutique:'Elyse shop',
            quartier:'Zongo',
            drescription:'Boutisue de vente de couture et de gamme des qes femmes et de homme '
        },
        {
            id:5,
            nom_boutique:'Anicette shop',
            quartier:'Avenou',
            drescription:'Boutisue de vente de couture et de gamme des qes femmes et de homme '
        },
    ];


    return (
        
        <View style={{ height:Dimensions.get('window').height , flex: 1,   }}>
            <StatusBar style="" hidden={true}   backgroundColor="red"  />


            <View style={{position:'absolute',bottom:270,  width: '100%',height: (Dimensions.get('window').height*65)/100 ,}}>
            <Image style={{
               // height: (Dimensions.get('window').height*50)/100 ,
                width: '100%',
                height:'100%'
            }}
                source={require('./image/map.png')} />
            </View>
              

              
                
            <View style={styles.header}>

                <Text style={{fontSize:15,fontWeight:'bold',letterSpacing:1}}>Les boutiques</Text>

                <View style={styles.button}>

                <Ionicons name="search" size={24} color="black" style={{marginRight:15}} />

                <FontAwesome name="sliders" size={24} color="black" />
 
                </View>

            </View>


            <View style={styles.liste}>
                <ScrollView
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                >
               {donnee.map((info, index) => (
                    <TouchableOpacity activeOpacity={1} key={index} onPress={() => {
                        setSelectItem(index)
                        console.log(index)
                    }

                    }>
                        <View style={[styles.ui_categorie, selectItem == index && styles.selecte]}>
                           


                           <View style={{marginVertical:10,paddingLeft:20, flexDirection: 'row', justifyContent: 'flex-start' }}>

                               <Entypo name="shop" size={24} color="#004599"  />

                               <Text style={{fontWeight:'bold', marginLeft: 20, fontSize: 17 }}>{info.nom_boutique}</Text>
                           </View>



                           <View style={{ marginVertical: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>

                               <Text style={{ marginLeft: 20, fontSize: 17 }}>Quartier :</Text>

                               <Text style={{ marginLeft: 20, fontSize: 17 }}>{info.quartier}</Text>
                           </View>



                           <View style={{ marginVertical: 0,  }}>

                               <Text style={{ marginLeft: 20, fontSize: 17 }}>Description :</Text>

                               <Text style={{ marginLeft: 20, fontSize: 17 }}>{info.drescription}</Text>
                           </View>



                           <View style={{ paddingHorizontal:50, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                      
                           <Button  onPress={() => console.log('Pressed')}
                           contentStyle={{backgroundColor:'#004599'}}
                           mode='contained'
                           >
                                position
                           </Button>

                           <Button   onPress={() => console.log('Pressed')}
                           contentStyle={{backgroundColor:'#004599'}}
                           mode="contained"
                             
                           >
                               Détail
                           </Button>
                           </View>
                          


                        </View>
                    </TouchableOpacity>
                ))}
                </ScrollView>

            </View>

         </View>
    );
}


const styles = StyleSheet.create({
    ui_categorie: {

        width: Dimensions.get('window').width-20,
       // height: 170,
        borderRadius: 20,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        elevation: 5,
        shadowColor: '#EFEFEF',
        shadowOffset: {
            height: 5,
            width: 2
        },
        borderWidth:1,
        borderColor:'#ccc'
    },
    button:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    header:{
        position:'absolute'  ,
        bottom:210,
        paddingHorizontal:10,
        paddingVertical:20,
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'

    },
    content:{
        height:200,
        width:500,
        backgroundColor:'red'
    //  flexDirection:'row',
    //  justifyContent:'space-between',
    //      marginBottom:20,
    //     paddingHorizontal:10
    } ,
    liste:{
        position:'absolute'  ,
        bottom:0,
        width:Dimensions.get('window').width,
       
    },
    selecte: {
        borderColor: '#004599',
    },
})