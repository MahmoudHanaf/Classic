

import React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,Alert,ActivityIndicator,Linking
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage' 
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import axios from "axios";


export default class Special_Booking extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Booking_Data :{},
      date:'',
      item:'',
      hour:0,
      loading: false,
      name:'',
      phone:'',
      user_id:0,
      text:'',
}
  }

  componentDidMount(){
    
  }



  
  

  render(){
      return(
          <>
     <StatusBar
          backgroundColor={"#fff"}
          barStyle="dark-content"
        />


       <View style={styles.header}>
          <View style={{width:windowWidth*.58,alignItems:'flex-end'}}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000',marginLeft:10,textAlign:'center' }}>حجز عريس</Text>
           </View>


          <View style={{width:windowWidth*.35,}}>
          <TouchableOpacity
            onPress={()=>{
                this.props.navigation.navigate("Home")
            }}
          >
           <Icon name ="arrow-left" size ={25} style={{color:'#000'}}/>
           </TouchableOpacity>
           </View>
        </View>


         <View style={{height:windowHeight*.8,justifyContent:'center'}}>
         <View style={[styles.view_date,{height:windowHeight*.41}]}>
         <Text style={{fontSize:24,fontWeight:'bold',color:'#000'}}>اهلا بك يا عريس !!</Text>
         <Text style={{fontSize:20,fontWeight:'bold',color:'#000',
         marginTop:25,textAlign:'center',margin:14}}> برجاء الاتصال على الرقم التالى لتسجيل حجزك</Text>
           
           <View style={[styles.style_view,{alignSelf:'center',marginTop:10}]}>
              <TouchableOpacity
               onPress={()=>{
                Linking.openURL("tel:01154482520")
               }}
              >
              <Icon name="phone" size={25} style={{color:'#00f'}}/>
              </TouchableOpacity>

              <TouchableOpacity
               onPress={()=>{
                Linking.openURL("https://api.whatsapp.com/send?phone=201154482520")
               }}
              >
              <Icon name="whatsapp-square" size={32} style={{color:'#0f0'}}/>
              </TouchableOpacity>
                 
                <Text style={{fontSize:18,fontWeight:'bold',color:'#000'}}>01154482520</Text>

              </View>



              <View style={[styles.style_view,{alignSelf:'center',marginTop:10,}]}>
              <TouchableOpacity
               onPress={()=>{
                Linking.openURL("tel:01207532208")
               }}
              >
              <Icon name="phone" size={25} style={{color:'#00f'}}/>
              </TouchableOpacity>

              <TouchableOpacity
               onPress={()=>{
                Linking.openURL("https://api.whatsapp.com/send?phone=201207532208")
               }}
              >
              <Icon name="whatsapp-square" size={32} style={{color:'#0f0'}}/>
              </TouchableOpacity>
                 
                <Text style={{fontSize:18,fontWeight:'bold',color:'#000'}}>01207532208</Text>

              </View>

         </View>
          
        
         </View>
        
          </>
      )
  }
}

const styles = StyleSheet.create({
    header: {
      width: windowWidth,
      height: windowHeight * .085,
      backgroundColor: '#fff',
    //   justifyContent: "center",
      alignItems: "center",
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: 'row',
  
    },
    view_date: {
        width: windowWidth * .88,
        height: windowHeight*.38,
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
      button: {
        width: windowWidth * .65,
        height: windowHeight * .08,
        backgroundColor: '#FFDDDE',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 15,
    
      },
      style_view:{
        width:windowWidth*.7,
        height:50,
        alignSelf:'flex-end',
      // backgroundColor:'#ddd',
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row',
        paddingRight:0,
       },

   })