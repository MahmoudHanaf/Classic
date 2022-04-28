
import React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, ScrollView, FlatList, Alert, TextInput,ActivityIndicator
} from 'react-native'
  ;

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LogIn from '../Tasks/LogIn';

import axios  from "axios";
import Home from "./Home";

 class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      name: '',
      nameEroor:'',
      phone: '',
      phoneEroor:'',
      showText: false,
      confirm_phone :'',
      eroor_confirm_phone:'',
      loading:true,
      age :0,
      eroorAge:'',
      
    }
  }


  async setItem() {
    let phone =this.state.phone
    let name =this.state.name
   await AsyncStorage.setItem("phone", JSON.stringify(phone))
   await AsyncStorage.setItem("name", JSON.stringify(name))
 }
 
//  async getItem() {
  
//      let data = await AsyncStorage.getItem("data")
//      let password = await AsyncStorage.getItem("password")
//      data = JSON.parse(data)
//      password = JSON.parse(password)
    

//      if(data !=''){
//       this.props.navigation.navigate("Page4",{
//         email:data,
//         password:password,
//       })

//     }
//      else{
//       this.setState({ email: data, password:password})
//      }
    
//     //  this.setState({loading:false})
     
//  }

 


  componentDidMount(){
      // this.setItem()
      // this.setState({loading:false})
      // this.getItem()
      this.setState({loading:false})
  }


  validateEmail = email => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
    return false;
    } else {
    return true;
    }
    };


  SignUp(){
   
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

    /// age 
    if(this.state.age == 0){
        Eroors++
         this.setState({eroorAge:'يجب عليك ادخال عمرك'})
      }else{
        this.setState({eroorAge:''})
      }


    //email
//     if(this.state.email== ''){
//       Eroors++
//       this.setState({emailEroor:'You must enter email'})
//    }else if(!this.validateEmail(this.state.email)){
//     Eroors++
//      this.setState({emailEroor:'Please enter vailed email'})
//    }else{
//      this.setState({emailEroor:''})
//    }
    
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
  

    //password
//     if(this.state.password.trim()== ''){
//       Eroors++;
//       this.setState({passwordEroor:'You must enter Password'})
//    }else if((this.state.password.trim()).length <6){
//     Eroors++;
//      this.setState({passwordEroor:'Password must be 6 or more '})
//    }else{
   
//      this.setState({passwordEroor:''})
//    }

   //confirm Password
   /// confirm_phone
   if(this.state.confirm_phone != this.state.phone){
    Eroors++;
    this.setState({eroor_confirm_phone:'تاكيد الرقم غير صحيح'})
 }


if(Eroors ==0){
     
  let data_to_send={
    user_name:this.state.name,
    user_phone:this.state.phone,
    user_age :this.state.age,
 
    
  }
  axios.post("http://192.168.1.3/Classic/SignUp.php",data_to_send).then(res=>{
        if(res.status ==200){
          // alert(res.data)
            
          this.setItem()
          this.props.navigation.navigate("Home")
          // alert(this.state.email)
          
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

{
          this.state.loading == true ?
            (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={60} color="#FF5D00" ></ActivityIndicator>
              </View>

            ) : (
              <>
              
        <ScrollView>
  
  <View style={styles.header}>
    <Icon name="user-circle" size={105} style={{ color: '#FF5100' }} />
  </View>
  
  

  <View style={styles.container}>
     <View style={{height:60,justifyContent:'space-between'}}>
    <View style={styles.text_input}>
      <Icon name="user-alt" style={{ marginLeft: 5,marginRight:7 }} size={21} />
      <TextInput placeholder="الاسم"
        style={{ fontSize: 20 }}

        value={this.state.name}
        onChangeText={(value) => {
          this.setState({ name: value })
        }}
      />
    </View>
       <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center'}}>{this.state.nameEroor}</Text>
      </View>



      <View style={{height:60,justifyContent:'space-between'}}>
    <View style={styles.text_input}>
      <Icon name="user-alt" style={{ marginLeft: 5,marginRight:7 }} size={22} />
      <TextInput placeholder="العمر" keyboardType='number-pad'
        style={{ fontSize: 20 }}
        
        value={this.state.age}
        onChangeText={(value) => {
          this.setState({ age: value })
        }}
      />
    </View>
    <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center'}}>{this.state.eroorAge}</Text>
      </View>


      <View style={{height:60,justifyContent:'space-between'}}>
    <View style={styles.text_input}>
      <Icon name="mobile-alt" style={{ marginLeft: 5 ,marginRight:7}} size={22} />
      <TextInput placeholder="رقم الموبايل" keyboardType='number-pad'
        style={{ fontSize: 20 }}
        
        value={this.state.phone}
        onChangeText={(value) => {
          this.setState({ phone: value.trim() })
        }}
      />
    </View>
    <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center'}}>{this.state.phoneEroor}</Text>
      </View>



      <View style={{height:60,justifyContent:'space-between'}}>
    <View style={styles.text_input}>
      <Icon name="mobile-alt" style={{ marginLeft: 5,marginRight:7 }} size={22} />
      <TextInput placeholder="تاكيد رقم الموبايل" keyboardType='number-pad'
        style={{ fontSize: 20 }}
        
        value={this.state.confirm_phone}
        onChangeText={(value) => {
          this.setState({ confirm_phone: value.trim() })
        }}
      />
    </View>
    <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center'}}>{this.state.eroor_confirm_phone}</Text>
      </View>


 

      
      
  </View>
  

  <Text style={{fontSize:20,fontWeight:'600',textAlign:'center',marginTop:5}} >هل تمتلك حساب بالفعل ؟</Text>
   <TouchableOpacity
     onPress={()=>{
       this.props.navigation.navigate("LogIn")
     }}
   >
  <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',color:'#FF5100',marginTop:8}} >تسجيل دخول</Text>
   </TouchableOpacity>

  <TouchableOpacity
   onPress={()=>{
     this.SignUp()
   
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
    marginTop:13,
  }}>
      <Text style={{fontSize:22,fontWeight:'bold',color:'#000'}}>تسجيل حساب</Text>
  </View>
  </TouchableOpacity>

</ScrollView>
              </>
            )
}



      </>
    )
  }
}

export default  createAppContainer(
  createStackNavigator(
    {
      
      Page1: SignUp,
      LogIn: LogIn,
      Home:Home,
      // Screen1:Screen1,
    },
    {
      headerMode: 'none'
    },
    {
      initialRouteName: 'page1'
    }
  ),
)


const styles = StyleSheet.create({
  header: {
    width: windowWidth,
    height: windowHeight * .2,
     //backgroundColor:'#0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: windowWidth,
    height: windowHeight * .58,
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
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    // marginBottom:20,
  }

})