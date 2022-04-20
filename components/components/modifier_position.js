import React from 'react'
import {
    View, Text, TouchableOpacity, StyleSheet
} from 'react-native'
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';



export default function Modifier_position({ ...props }) {

    const [latitude_c, setLatitude_c] = React.useState("")
    const [longitude_c, setLongitude_c] = React.useState("")


    React.useEffect(() => {
        // setLoding(true)
        prendre_positionçuser()


    }, []);


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
                    console.log(value)

                }
                else if (key == 'longitude') {
                    setLongitude_c(value)
                    console.log(value)
                }
            })



        }
    }


    function save_position() {
        console.log(latitude_c)
        console.log(longitude_c)
    }



    return (
        <View>
            <StatusBar style="" hidden={false} backgroundColor="#fff" />

            <Text>Modifier_position</Text>

                  <TouchableOpacity activeOpacity={0.6} onPress={() => {
                save_position()
            }}>
                <View style={{ width: '100%', flex: 1, height: 'auto', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.btn_contact}>
                        <Text style={{ color: "#fff" }}>Contacteez via whatsapp</Text>
                    </View>
                </View>
            </TouchableOpacity>
 
           




        </View>
    )
}

const styles = StyleSheet.create({


    head_6: {
        marginTop: 40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchable: {

        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        backgroundColor: '#004599',

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        backgroundColor: '#004599',
        paddingVertical: 10
    },
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



})