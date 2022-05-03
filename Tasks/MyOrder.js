





import React from "react";
import {
    Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView,
    FlatList, Alert, ActivityIndicator
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import axios from "axios";
import { ThreeDotsIcon } from "native-base";

// import {NavigationContainer, StackActions} from '@react-navigation/native'
//  import {createDrawerNavigator} from '@react-navigation/drawer'

//  import { createStackNavigator } from '@react-navigation/stack';




export default class MyOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: '',
            loading: true,
            Data: {},
            text: '',
            user_id: 0,
        }
    }


    componentDidMount() {
        let user_id = this.props.navigation.getParam("user_id")
        this.setState({ user_id: user_id })


        let data_to_send = {
            user_id: user_id,
        }
        axios.post("https://camp-coding.com/classic/MyOrder.php", data_to_send).then(res => {
            if (res.status == 200) {
                if (typeof (res.data) == typeof ({})) {
                    this.setState({
                        Data: res.data,
                        loading: false,
                    })
                    // alert(res.data)
                } else {
                    this.setState({ text: 'لا يوجد حجز ', loading: false, })
                }



            }
        })
    }



    Delete_Order(){

        let data_to_send = {
            order_id: this.state.Data.order_id,
        }
        axios.post("https://camp-coding.com/classic/Delete_Order.php", data_to_send).then(res => {
            if (res.status == 200) {
                // if (res.data) {
                    this.setState({
                        text: 'لا يوجد حجز ',
                        loading: false,
                    })
                   
                // } 

            }
        })

    }





    createTwoButtonAlert = () =>
 Alert.alert(
   "هل تريد حذف الحجز",
   "",

   [
     {
       text: "لا",
       onPress: () => console.log("Cancel Pressed"),
       style: 'cancel',
     },
     { text: "نعم", onPress: () => {
        
       this.setState({text:''})  
       this.Delete_Order()  
     }
    
  }
   ],
   { cancelable: false }
 );


    render() {
        return (
            <>

                <StatusBar
                    backgroundColor="#fff"  //#FF6C00
                    barStyle="dark-content"
                />

                {
                    this.state.loading == true ?
                        (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size={60} color="#FF5D00" ></ActivityIndicator>
                            </View>

                        ) : (
                            <>

                                <View>
                                    <View style={styles.header}>

                                        <View style={{ width: 35, height: 50 }}></View>
                                   
                                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000' }}>حجزى</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate("Home")
                                            }}
                                        >
                                            <Icon name="arrow-left" size={23} style={{ color: '#000' }} />
                                        </TouchableOpacity>
                                    </View>


                                    <View style={styles.container}>
                                        <ScrollView>

                                            {
                                                this.state.text == '' ? (

                                                 <View style={{height:windowHeight*.8,justifyContent:'center'}}>
                                                    <View style={styles.view_date}>
                                                    <View style={{alignSelf:'flex-end',}}>
                                                        <TouchableOpacity
                                                          onPress={()=>{
                                                            this.createTwoButtonAlert()
                                                          }}
                                                        >   
                                                        <Icon name="trash-alt" size={24} style={{marginRight:18}}/>
                                                        
                                                        </TouchableOpacity>
                                                        </View>
                                                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000' }}>الحجز</Text>
                                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginTop: 15, }}> من الساعة  : {this.state.Data.start_booking} </Text>
                                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginTop: 15 }}> الى الساعة  : {this.state.Data.end_booking}</Text>

                                                        <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000', marginTop: 15, textAlign: 'center' }}>اليوم :</Text>
                                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginTop: 15 }}>{this.state.Data.booking_date}</Text>

                                                    </View>
 
                                                    </View>

                                                ) : (
                                                    <View style={{ height: windowHeight * .8, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 23, textAlign: 'center', fontWeight: 'bold', color: '#FF5100' }}>{this.state.text}</Text>
                                                    </View>
                                                )

                                            }


                                        </ScrollView>
                                    </View>

                                </View>


                            </>
                        )
                }



            </>
        )
    }
}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '8%',   //windowHeight * .08
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
    },
    view_date: {
        width: windowWidth * .88,
        height: windowHeight*.4,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignSelf: 'center',
        // justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 40,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        paddingTop:20,
    
      },
})