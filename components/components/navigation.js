import * as React from 'react';
import { Text, View, Image, StyleSheet,Dimensions,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

 import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { MaterialCommunityIcons,Entypo,Ionicons,FontAwesome,Fontisto } from '@expo/vector-icons';
 
 import { StatusBar } from 'expo-status-bar';
// import HomeScreen from './accueil';
import Liste_shop from './liste_shop';
import Mybutton from './mybutton';
import Account from './account';
import Signup from './sign_up'
import Signup_1 from './sign_up_1'
import Signup_2 from './sign_up_2'
import Connexion from './connexion'
import Search from './recherche';
import Modifier_info from './modifier_info';
import Modifier_passe from './modifier_passe';
import Mon_abonnement from './mon_abonnement';
import Modifier_position from './modifier_position';
 




 


const Stack = createNativeStackNavigator();

 
function Menu() {
    return (
        <Stack.Navigator>

<Stack.Screen name="Liste_shop" component={Mybutton} 
options={{
    title: 'Statut',
    headerStyle: {
        backgroundColor: '#004599',
        
      },
     
      headerTitleStyle: {
        fontWeight: 'bold',
        color:'#fff',
        fontSize:20
      },
    //   headerRight: () => (

    //     <FontAwesome name="search" size={20} color="black" 
    //       style={{ color:  '#004599',marginRight:20,marginTop:5  }}
    //       onPress={() => alert('This is a button!')}
    //       />
        
    //   ),
    }} 
 />

                        <Stack.Screen name="signup_2" component={Signup_2} options={{ headerShown: false, }} />

            <Stack.Screen name="sigin" component={Signup} options={{ headerShown: false, }} />

            <Stack.Screen name="connexion" component={Connexion} options={{ headerShown: false, }} />

            <Stack.Screen name="signup_1" component={Signup_1} options={{ headerShown: false, }} />

        </Stack.Navigator>
     );
  }




  function Menu_accueil() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="accueil" component={Liste_shop} 
             options={{
                title: 'Boutiques',
                headerStyle: {
                    backgroundColor: '#004599',
                    
                  },
                 
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    color:'#fff',
                    fontSize:20
                  },
                //   headerRight: () => (

                //     <FontAwesome name="search" size={20} color="black" 
                //       style={{ color:  '#004599',marginRight:20,marginTop:5  }}
                //       onPress={() => alert('This is a button!')}
                //       />
                    
                //   ),
                }} 
            />

            <Stack.Screen name="recherche" component={Search} 
              options={{
                title: '',
                  // headerShown: false, 
                 }}
            />

        </Stack.Navigator>
     );
  }




  function Menu_account() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Sstting" component={Account} 
           options={{
            title: 'Compte',
            headerStyle: {
                backgroundColor: '#004599',
                
              },
             
              headerTitleStyle: {
                fontWeight: 'bold',
                color:'#fff',
                fontSize:20
              },
            //   headerRight: () => (
        
            //     <FontAwesome name="search" size={20} color="black" 
            //       style={{ color:  '#004599',marginRight:20,marginTop:5  }}
            //       onPress={() => alert('This is a button!')}
            //       />
                
            //   ),
            }} 
         />

            <Stack.Screen name="modifier_info" component={Modifier_info} 
              options={{
                title: 'Modifier information',
                headerTintColor:'#004599',
            }} 
            />

            <Stack.Screen name="modifier_passe" component={Modifier_passe} 
              options={{
                title: 'Modifier mot de passe',
                headerTintColor:'#004599',
            }} 
            />

            <Stack.Screen name="mon_abonnement" component={Mon_abonnement} 
              options={{
                title: 'Mon abonnement',
                headerTintColor:'#004599',
            }} 
            />

        <Stack.Screen name="modifier_position" component={Modifier_position} 
              options={{
                title: 'Positon de la boutique',
                headerTintColor:'#004599',
            }} 
            />



        </Stack.Navigator>
     );
  }














const Tab = createBottomTabNavigator();

export default function My_nav() {
    return (
        <NavigationContainer>
            <Tab.Navigator


                screenOptions={({ route }) => ({
                    
                    tabBarIcon: ({ focused }) => {


                        if (route.name === 'Home') {

                            return (
                                <View style={styles.content_tab}>
                                    <View >
                                    <Entypo name="shop" size={24} color="black"
                                            style={{ color: focused ? '#004599' : '#748c94' }}
                                        />
                                    </View>


                                    <Text style={{ color: focused ? '#004599' : '#748c94',fontSize:10 }}>Boutique</Text>

                                </View>
                            )

                        } else if (route.name === 'Activer') {

                            return (
                                <View style={styles.content_tab}>

                                    <View style={styles.content_tab}>
                                    <Fontisto name="radio-btn-active" size={24} color="black" 
                                       style={{ color: focused ? '#004599' : '#748c94' }}
                                       />

                                        <Text style={{ color: focused ? '#004599' : '#748c94',fontSize:10 }}>Ouvrire</Text>

                                    </View>

                                </View>
                            )
                        }


                        else if (route.name === 'Settings') {

                            return (
                                <View style={styles.content_tab}>

                                    <View >
                                        <Entypo name="user" size={24} color="black"
                                            style={{ color: focused ? '#004599' : '#748c94' }}
                                        />
                                    </View>

                                    <Text style={{ color: focused ? '#004599' : '#748c94',fontSize:10 }}>Compte</Text>
                                </View>
                            )
                        }


                    },
                    tabBarShowLabel:false,
                    
                })}
                 

            >





                <Tab.Screen name="Home" component={Menu_accueil} 
               options={{ headerShown: false, }} />


                <Tab.Screen name="Activer" component={Menu} options={{ headerShown: false,  }} />
             
                <Tab.Screen name="Settings" component={Menu_account}
                  options={{ headerShown: false,  }}
                />


            </Tab.Navigator>
        </NavigationContainer>
    );
}




const styles = StyleSheet.create({
 
    content_tab: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        my_button: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'#e32f45',
            position:'absolute',
            bottom:20,
            paddingVertical:15,
            paddingHorizontal:15,
            borderRadius:30,
            
    
        },
        // map: {
        //     width: Dimensions.get('window').width,
        //     height: Dimensions.get('window').height,
        //   },
    

})