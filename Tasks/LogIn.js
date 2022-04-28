



import React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, ScrollView, FlatList, Alert, TextInput
} from 'react-native'
  ;

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import axios from "axios";


export default class LogIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      nameEroor:'',
      phone: '',
      phoneEroor:'',
      showText: false,
      textEroor:'',
    }
  }


  async setItem() {
    let name =this.state.name
    let phone =this.state.phone
   await AsyncStorage.setItem("name", JSON.stringify(name))
   await AsyncStorage.setItem("phone", JSON.stringify(phone))
 }


 


  validateEmail = email => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
    return false;
    } else {
    return true;
    }
    };


  LogIn(){
   
    let Eroors=0;

     //name
     if(this.state.name.trim()== ''){
      Eroors++
       this.setState({nameEroor:'يجب عليك ادخال اسم ثلاثى '})
    }else if((this.state.name.trim()).length <6){
      Eroors++
      this.setState({nameEroor:'يجب عليك ادخال اسم ثلاثى'})
    }else{
      this.setState({nameEroor:''})
    }

   
      //phone
   if(this.state.phone== ''){
    Eroors++;
    this.setState({phoneEroor:'يجب عليك ادخال رقم الموبايل'})
    }else if( 
      this.state.phone.length !=11  || (
        !this.state.phone.startsWith("015") &&
        !this.state.phone.startsWith("011") &&
        !this.state.phone.startsWith("010") &&
        !this.state.phone.startsWith("012") 
      ) ||
      this.state.phone *0!=0
    )
    {
      Eroors++
      this.setState({phoneEroor:'هذا الرقم غير متاح'})
    }else{
      this.setState({phoneEroor:''})
    }
    


if(Eroors ==0){
   
  let data_to_send={
    name:this.state.name,
    phone:this.state.phone,
  }
  axios.post("http://192.168.1.3/Classic/LogIn.php",data_to_send).then(res=>{
        if(res.status ==200){
          if(typeof(res.data)== typeof({})){
           
            this.setItem()
            this.props.navigation.navigate("Home")
          }else{
            this.setState({textEroor:'الاسم او رقم التليفون غير صحيح'})
          }
      
         


        }else{
          alert("Try again later")
        }
  })

}

  }



  render() {
    return (
      <>
        <StatusBar
          backgroundColor="#fff"  //#FF6C00
          barStyle="dark-content"
        />
        <ScrollView>

          <View style={styles.header}>
            <Icon name="user-circle" size={110} style={{ color: '#FF5100' }} />
          </View>



          <View style={styles.container}>

           

          <View style={{height:80,justifyContent:'space-between'}}>
            <View style={styles.text_input}>
              <Icon name="user-alt" style={{ marginLeft: 5 }} size={21} />
              <TextInput placeholder="الاسم "
                style={{ fontSize: 18 }}
                
                value={this.state.name}
                onChangeText={(value) => {
                  this.setState({ name: value })
                }}
              />
            </View>
            <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>{this.state.nameEroor}</Text>
              </View>
           


              <View style={{height:80,}}>
            <View style={[styles.text_input, {  }]}>

              <Icon name="mobile" style={{ marginLeft: 5 }} size={20} />
             
                <TextInput placeholder="رقم الموبايل"
                  style={{ fontSize: 18 }}
                  keyboardType="number-pad"
                  value={this.state.phone}
                  onChangeText={(value) => {
                    this.setState({ phone: value.trim() })
                  }}
                />
            

              
            </View>
            <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>{this.state.phoneEroor}</Text>
              </View>


          </View>

          {
            this.state.textEroor !=''?(
              <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:'#FF5100',marginBottom:5}}>{this.state.textEroor}</Text>
            ):
            null
          }
        
          <TouchableOpacity
            onPress={()=>{
              this.LogIn()
            }}
          >
          <View style={{
            width:windowWidth*.55,
            height:50,
            backgroundColor:'#FFDDDE',
            borderRadius:15,
            alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',  
            marginTop:windowWidth*.1,
          }}>
              <Text style={{fontSize:22,fontWeight:'bold',color:'#000'}}>تسجيل دخول</Text>
          </View>
          </TouchableOpacity>

        </ScrollView>
      </>
    )
  }
}




const styles = StyleSheet.create({
  header: {
    width: windowWidth,
    height: windowHeight * .23,
    // backgroundColor:'#0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: windowWidth,
    height: windowHeight * .25,
    // backgroundColor:'#0ff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text_input: {
    width: windowWidth * .85,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF5100',
    paddingLeft: 10,
    paddingRight: 8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    alignSelf: 'center',
    // marginBottom:20,
  }

})