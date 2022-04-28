




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


export default class ChangePhone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      nameEroor:'',
      phone: '',
      phoneEroor:'',
      showText: false,
      textEroor:'',
      user_id:'',
    }
  }


  async setItem() {
    let name =this.state.name
    let phone =this.state.phone
   await AsyncStorage.setItem("name", JSON.stringify(name))
   await AsyncStorage.setItem("phone", JSON.stringify(phone))
 }




  myData(){
   
    let Eroors=0;

    
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
    user_id:this.state.user_id,
    phone:this.state.phone,
  }
  axios.post("http://192.168.1.3/Classic/ChangePhone.php",data_to_send).then(res=>{
        if(res.status ==200){
            alert(res.data)
            this.setItem()
            // this.props.navigation.navigate("Home")
          
        }else{
          alert("Try again later")
        }
  })

}

  }



  componentDidMount(){
    let user_id =this.props.navigation.getParam("user_id")
    let name =this.props.navigation.getParam("name")
    let phone =this.props.navigation.getParam("phone")
    this.setState({
    user_id :user_id,
    phone:phone,
    name:name,
    })
  }



  render() {
    return (
      <>
                 <StatusBar
          backgroundColor="#fff"  //#FF6C00
          barStyle="dark-content"
        />

        <View style={styles.header}>

            <View style={{width:25,height:40}}></View>
          <Text style={{ fontSize: 21, fontWeight: 'bold', color:'#000'}}>تعديل رقم الموبايل</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
             <Icon name="arrow-left" size={21} style={{color:'#000'  }} />
          </TouchableOpacity>
        </View>
              
         <ScrollView >
                       
                   
             <View style={{height:80,justifyContent:'space-between'}}>
            <View style={styles.text_input}>
              <Icon name="mobile" style={{ marginLeft: 5 }} size={21} />
              <TextInput placeholder="رقم الموبايل "
                style={{ fontSize: 19 }}
                 keyboardType="number-pad"
                value={this.state.phone}
                onChangeText={(value) => {
                  this.setState({ phone: value })
                }}
              />
            </View>
               <Text style={{fontSize:17,fontWeight:'bold',textAlign:'center',marginTop:10}}>{this.state.ageError}</Text>
              </View>

              <TouchableOpacity
            onPress={()=>{
               this.myData()
               this.props.navigation.goBack()
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
            marginTop:windowWidth*.3
          }}>
              <Text style={{fontSize:22,fontWeight:'bold',color:'#000'}}>حفظ</Text>
          </View>
          </TouchableOpacity>



                    </ScrollView>
             
      </>
    )
  }
}




const styles = StyleSheet.create({
    text_input: {
        width: windowWidth * .85,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 8,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop:windowWidth*.1,
        // marginBottom:20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      
        elevation: 3,
          
      },
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




})