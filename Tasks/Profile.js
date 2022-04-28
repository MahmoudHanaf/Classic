


import React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,Alert,Linking
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage' 
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import * as ImagePicker from 'react-native-image-picker';
// import {NavigationContainer, StackActions} from '@react-navigation/native'
//  import {createDrawerNavigator} from '@react-navigation/drawer'

//  import { createStackNavigator } from '@react-navigation/stack';
import axios from "axios";
// import { show } from "react-native-fbsdk/lib/commonjs/FBGameRequestDialog";
// import RNFetchBlob from 'react-native-fetch-blob'


export default class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photo: '',
      Item: {}, 
      name:'',
      photo_uri:'',
      Data:{},
      phone:'',
      show:false ,
      photo_data:null,
      key_photo:0,
    }
  }


  


  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          // title: 'Cool Photo App Camera Permission',
          // message:
          //   'Cool Photo App needs access to your camera ' +
          //   'so you can take awesome pictures.',
          // buttonNeutral: 'Ask Me Later',
          // buttonNegative: 'Cancel',
          // buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  async componentDidMount() {
    this.requestCameraPermission();

    let name=this.props.navigation.getParam("name")
    let phone=this.props.navigation.getParam("phone")
    this.setState({
      name:name,
      phone:phone,
    })

    this.Select(name,phone);

    ///
    this.getData()
    
  }

  select_first_photo() {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary({options, includeBase64: true}, res => {
      // console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
        res.assets='kjhg';
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        if (this.state.photo_uri == this.state.defaultPhoto_uri) {
          this.state.options.push({
            text: 'مسح الصورة',
            destructive: true,
            onPress: () => {
              this.setState({
                photo_uri: this.state.defaultPhoto_uri,
                V_uri: false,
              });
              
              ToastAndroid.showWithGravity(
                'تم مسح صورة البروفايل',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
              this.state.options.pop();
            },
          });
         

          ///this.props.actions.uploadImage(imageData).then(response => alert(response)
        }
        
        // console.log(res.assets[0].uri) 
        // if(typeof(photo_uri) ==typeof({}) ){
         
          this.setState({
            photo_data: res.data,
            photo_uri: res.assets[0].uri,
          })
        // }
        this.setItem( res.assets[0].uri)

      }

      /// send uri of photo to sever

      // alert(res.assets[0].uri)
      // alert(this.state.email)
      //////////////////////////////////////
      // let  data_to_send={
        
      //   photo_uri: res.assets[0].uri,
      //   name:this.state.name,
      //   phone:this.state.phone,
        
      // }
      // axios.post("http://192.168.1.3/Classic/Insert_photo.php",data_to_send).then(res=>{
      //   if(res.status ==200){
      //      if(res.data !=null){
      //          this.Select(this.state.name,this.state.phone)
      //      }    
        
      //   }else{
      //     alert("Try again later")
      //   }
  
      // })
     
      ////

    });

  }

  




  



// Insert_photo(){
//  let  data_to_send={
//     name:this.state.name,
//     phone:this.state.phone,
//     photo_uri:this.state.photo_uri,
//   }
//   axios.post("http://192.168.1.3/Classic/Insert_photo.php",data_to_send).then(res=>{
//     if(res.status ==200){
//        if(res.data !=null){
//         this.setState({
//           Data:res.data,
//         })
//        }
     
//       // alert(res.data)
//     }else{
//       alert("Try again later")
//     }
//   })
// }



// upload(){
//   alert("slkjhbnmkl")
//   RNFetchBlob.fetch('POST', 'http://192.168.1.3/Classic/Insert_photo.php', {
//     Authorization: "Bearer access-token",
//     otherHeader: "foo",
//     'Content-Type': 'multipart/form-data',
//   }, [
  
//     // custom content type
//     { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.photo_data },
   
//   ]).then((resp) => {
//     // ...
//   }).catch((err) => {
//     // ...
//   })

// }



async setItem(photo_uri) {
  // let photo_uri =photo_uri   //
 await AsyncStorage.setItem("photo_uri", JSON.stringify(photo_uri))

}


async getItem() { 
  let photo_uri = await AsyncStorage.getItem("photo_uri")
  photo_uri = JSON.parse(photo_uri)
  this.setState({photo_uri:photo_uri})

}

/////////

async setData(key_photo) {
  // let photo_uri =photo_uri   //key_photo
 await AsyncStorage.setItem("key_photo", JSON.stringify(key_photo))

}


async getData() { 
  let key_photo = await AsyncStorage.getItem("key_photo")
  key_photo = JSON.parse(key_photo)
  this.setState({key_photo:key_photo})

  if(key_photo ==0){
    this.createAlertPhoto()
  }

}




Select(name,phone){
  let  data_to_send={
     name:name,
     phone:phone,
   }
   axios.post("http://192.168.1.3/Classic/Select_Profile.php",data_to_send).then(res=>{
     if(res.status ==200){
         if(typeof(res.data) == typeof({}) && res.data != null){
          this.setState({
            Data:res.data,
          })
          this.getItem()
          // alert(res.data)
         }
 
     }else{
       alert("Try again later")
     }
   })
 }



 createAlertPhoto = () =>
 Alert.alert(
   "هل تسمح للتطبيق بالوصول الى الصور والملفات ",
   "",

   [
     {
       text: "رفض",
       onPress: () => console.log("Cancel Pressed"),
       style: 'cancel',
     },
     { text: "سماح", onPress: () => {

     this.setState({key_photo:1})
     this.setData(1)
     }
    
  }
   ],
   { cancelable: false }
 );



 createTwoButtonAlert = () =>
 Alert.alert(
   "هل تريد تسجبل خروج ",
   "",

   [
     {
       text: "لا",
       onPress: () => console.log("Cancel Pressed"),
       style: 'cancel',
     },
     { text: "نعم", onPress: () => {

    //  this.setState({Data:{}})
     this.props.navigation.navigate("SignUp")
    
     }
    
  }
   ],
   { cancelable: false }
 );
  

//  componentDidUpdate(){  // update value sequncely 
//   this.Select(this.state.name,this.state.phone)
//  }



  
 render(){
     return(
         <>
              <StatusBar
          backgroundColor="#fff"  //#FF6C00
          barStyle="dark-content"
        />

        <View style={styles.header}>

            <View style={{width:25,height:40}}></View>
          <Text style={{ fontSize: 22, fontWeight: 'bold',color:'#000' }}>الصفحة الشخصية</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Home")
            }}
          >
            <Icon name="arrow-left" size={21} style={{ color: '#000' }} />
          </TouchableOpacity>
        </View>

<ScrollView>    
        <View style={styles.photo_view}>
          
          {
            this.state.photo_uri ==''  ?(
              <Icon name ='user-circle' size={90} style={{color:'#fff'}}/>
            ):(
              <Image source={{uri:this.state.photo_uri}}
              style={{
                  width:windowWidth*.35,
                  height:windowHeight*.18,
                  resizeMode:'contain',
                  borderRadius:12
               }}
            />
            )
          }
            
            
           
             <View style={{
                 width:38
                ,height:38,
                backgroundColor:'#fff',
                alignSelf:'flex-start',
                justifyContent:'center',
                alignItems:'center',
                marginTop:-windowWidth*.02,
                borderRadius:18,
                marginLeft:8,
                }}>
                   <TouchableOpacity
                      onPress={()=>{
                        this.select_first_photo()
                      
                        
                      }}
                   >
                 <Icon name="pencil-alt" size={19} style={{color:'#FF5100'}}  />
                 </TouchableOpacity>
             </View>
              
        </View>
              

              <Text style={{fontSize:21,fontWeight:'bold',textAlign:'center',marginTop:10,color:'#000'}}>{this.state.Data.user_name}</Text>
             

              <View style={[styles.style_view,{marginTop:20,width:windowWidth*.55,}]}>
                 <Text style={{fontSize:19,fontWeight:'bold',color:'#000'}}>{this.state.Data.user_phone}</Text>
                 <Icon name="phone" size={20} style={{}}/>
              </View>  

            <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
            <View style={[styles.style_view,{width:windowWidth*.5,height:50,justifyContent:'flex-start'}]}>
            <TouchableOpacity
              onPress={()=>{
                this.props.navigation.navigate("ChangeAge",{
                   age:this.state.Data.user_age,
                   name:this.state.Data.user_name,
                   phone:this.state.Data.user_phone,
                })
                this.setState({show:true})
              }}
            >
            <Icon name="angle-right" size={29} style={{colo:'#000'}}/>
            </TouchableOpacity>
            </View>

              <View style={[styles.style_view,{width:windowWidth*.37,marginTop:13}]}>
                 <Text style={{fontSize:19,fontWeight:'bold',color:'#000'}}>{this.state.Data.user_age}  سنة</Text>
                 <Icon name="user-alt" size={20} style={{}}/>
              </View>
             
             </View>
              
              <View style={{
                width:windowWidth*.88,
                height:50,
                flexDirection:'row',
              //  backgroundColor:'#ff0',
                alignSelf:'flex-end',
                alignItems:'center',
                justifyContent:'space-between',
                marginTop:8,
                
                }}>

              
              <TouchableOpacity>
                  <View style={{width:windowWidth*.3,height:50,justifyContent:'center',alignItems:'flex-start',}}>
                    <Icon  name="toggle-on" size={28} style={{}}/>
                  </View>
              </TouchableOpacity>

              <View style={[styles.style_view,{width:windowWidth*.41,marginTop:13}]}>
                 <Text style={{fontSize:19,fontWeight:'bold',color:'#000'}}>الاشعارات</Text>
                 <Icon name="bell" size={22} style={{}}/>
              </View>
              </View>



              <TouchableOpacity
                onPress={()=>{
                  this.createTwoButtonAlert()
                }}
              >
              <View style={[styles.style_view,{marginTop:13,width:windowWidth*.48}]}>
                 <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}>تسجيل خروج</Text>
                 <Icon name="sign-out-alt" size={25} style={{}}/>
              </View>
              </TouchableOpacity>

             <View style={[styles.style_view,{width:windowWidth*.9,marginTop:10}]}>

              <View style={[styles.style_view,{alignSelf:'center',}]}>
              <TouchableOpacity
               onPress={()=>{
                Linking.openURL("tel:01012748258")
               }}
              >
              <Icon name="phone" size={24} style={{color:'#00f'}}/>
              </TouchableOpacity>

              <TouchableOpacity
               onPress={()=>{
                Linking.openURL("https://api.whatsapp.com/send?phone=201012748258")
               }}
              >
              <Icon name="whatsapp-square" size={30} style={{color:'#0f0'}}/>
              </TouchableOpacity>
              </View>
               
               <View style={{width:50}}></View>

              <View style={[styles.style_view,{width:windowWidth*.54,}]}>
              <Text style={{fontSize:19,fontWeight:'bold',color:'#000',}}>الدعم والمساعدة</Text>
                 <Icon name="info" size={22} style={{}}/>
              </View>
 
              </View>
              
              
              </ScrollView>
         </>
     )
 }
}

const styles=StyleSheet.create({
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
      photo_view:{
         width:windowWidth*.48,
         height:windowHeight*.24,
         backgroundColor:'#F2ECFF',
         justifyContent:"center",
          alignItems:"center",
          marginTop:windowHeight*.07,
          alignSelf:"center",
          borderRadius:20,
     },

     style_view:{
      width:windowWidth*.36,
      height:50,
      alignSelf:'flex-end',
    // backgroundColor:'#ddd',
      justifyContent:'space-around',
      alignItems:'center',
      flexDirection:'row',
      paddingRight:10,
     },
})
