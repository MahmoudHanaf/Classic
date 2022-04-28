

import React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,Alert,ActivityIndicator
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage' 
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import axios from "axios";
import { Wrap } from "native-base";


// import {NavigationContainer, StackActions} from '@react-navigation/native'
//  import {createDrawerNavigator} from '@react-navigation/drawer'

//  import { createStackNavigator } from '@react-navigation/stack';




export default class Confirm_Booking extends React.Component {
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
      Cart:[],
      num_services:0,
}
  }

  componentDidMount(){
      let user_id =this.props.navigation.getParam("user_id")
      let item=this.props.navigation.getParam("item")
      let hour=this.props.navigation.getParam("hour")
      let date=this.props.navigation.getParam("date")
      let Cart=this.props.navigation.getParam("Cart")
      let num_services=this.props.navigation.getParam("num_services")
      this.setState({
        item:item,
        hour:hour,
        date:date,
        user_id:user_id,
        Cart:Cart,
        num_services:num_services,
      })
      //  alert(Cart.join("//"))
      // alert(date)
    
  }



  getItems(){
    this.setState({loading:true})
    let data_to_send={
      user_id: this.state.user_id,
      booking_date:this.state.date,
      status:'حجز عادى',
      start_booking: this.state.hour +' '+ this.state.item,
      end_booking: this.state.num_services < 4?
      parseFloat( this.state.hour)+1+' '+this.state.item
      :
      this.state.num_services >=4 && this.state.num_services <6 ?
      parseFloat( this.state.hour)+1.5+' '+this.state.item
      :
      parseFloat( this.state.hour)+2+' '+this.state.item,

      services:this.state.Cart.join("//"),
    }
   
    axios.post("http://192.168.1.3/Classic/Insert_Order.php",data_to_send).then(res => {
     
      if (res.status == 200) {
      
        if((res.data)*0 == 0){
          this.setState({loading:false})
          // alert(res.data)
          this.props.navigation.navigate("Page4")
        }else{
          this.setState({text:'لقد تم الحجز مسبقا فى هذا اليوم',loading:false})
        }

      } else {
        alert("Try again later")
      }
    })

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
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000',marginLeft:10,textAlign:'center' }}>تاكيد الحجز</Text>
           </View>


          <View style={{width:windowWidth*.35}}>
          <TouchableOpacity
            onPress={()=>{
                this.props.navigation.goBack()
            }}
          >
           <Icon name ="arrow-left" size ={25} style={{color:'#000'}}/>
           </TouchableOpacity>
           </View>
        </View>
         
         <ScrollView>
         <View style={styles.view_date}>
         <Text style={{fontSize:24,fontWeight:'bold',color:'#000'}}>حجزك</Text>
         <Text style={{fontSize:20,fontWeight:'bold',color:'#000',marginTop:15,}}> من الساعة  : {this.state.hour} {this.state.item}</Text>
         <Text style={{fontSize:20,fontWeight:'bold',color:'#000',marginTop:15}}> الى الساعة  : 
         {
        this.state.num_services < 4?
        parseFloat( this.state.hour)+1+' '+this.state.item
        :
        this.state.num_services >=4 && this.state.num_services<6 ?
        parseFloat( this.state.hour)+1.5+' '+this.state.item
        :
        parseFloat( this.state.hour)+2+' '+this.state.item
         } </Text>
         
         <Text style={{fontSize:23,fontWeight:'bold',color:'#000',marginTop:15,textAlign:'center'}}>اليوم :</Text>
         <Text style={{fontSize:20,fontWeight:'bold',color:'#000',marginTop:15}}>{this.state.date}</Text>
         <Text style={{fontSize:23,fontWeight:'bold',color:'#000',marginTop:10}}>الخدمات</Text>
         
         <View style={[styles.sevice_view,{
              width:windowWidth*.84,
              // backgroundColor:'#0ff',
              // height:40,
              flexDirection:'row',
              flexWrap: 'wrap',
              marginBottom:13,
              justifyContent:'space-around'
              }]}>

          {
            this.state.Cart.map((data,index)=>
           
              <View style={[styles.sevice_view,{height:46}]}>
                <Icon name="square-full" size={18} style={{color:'#FF5100',marginRight:5}}/>
                 <Text numberOfLines={3} 
                 style={{fontSize:18,fontWeight:'bold',color:'#000',}}>{data}</Text>
              </View>
       
       
            )
            
          }
              
       </View>
         </View>
          
         

         <TouchableOpacity  disabled={this.state.loading}
           onPress={()=>{ 
            this.getItems()
            
           }}
         >
            <View style={[styles.button,{marginTop:windowHeight*.1}]}>
              <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#000' }}>تاكيد الحجز</Text>
            </View>
          </TouchableOpacity>

          <Text style={{fontSize:20,fontWeight:'bold',color:'#000',marginTop:15,textAlign:'center'}}>{this.state.text}</Text>
        
          {
           this.state.loading ==true ?
           <View style={{ justifyContent: 'center', alignItems: 'center',height:50 }}>
           <ActivityIndicator size={50} color="#FF5D00" ></ActivityIndicator>
         </View>
         :
         null
         }
</ScrollView>
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
        // height: windowHeight*.5,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignSelf: 'center',
        // justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 25,
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
        marginTop: 12,
        borderRadius: 15,
    
      },
      sevice_view:{
        width: windowWidth * .3,
        // height: 30,
        // backgroundColor: '#0f0',
        // justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        flexDirection:'row'
      },

   })