



import React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,Alert,Button
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ImageSlider from 'react-native-image-slider';
import { SliderBox } from "react-native-image-slider-box";
import Booking_Screen from "../Tasks/Booking_Screen";
import Confirm_Booking from '../Tasks/Confirm_Booking';
import Rented from '../Tasks/Rented'
import MyOrder from '../Tasks/MyOrder';
import Profile from '../Tasks/Profile';
import ChangeAge from '../Tasks/ChangeAge';
import Special_Booking from '../Tasks/Special_Booking';
import Services from '../Tasks/Services'
import ChangePhone from '../Tasks/ChangePhone';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios  from "axios";
import NetInfo from "@react-native-community/netinfo";

import { BannerAd, TestIds,AdMobBanner,InterstitialAd  } from '@react-native-admob/admob';


 class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      name :'',
      phone:'',
      Data :{},
      work_time:'',
      UNIT_ID_BANNER:'ca-app-pub-1042748141632557~4400907682',
      interstitialAd:{},
      adLoaded:false,
      adDismissed:true,
      images: [
            require('../img/m2.jpg'),
            require('../img/m3.jpg'),
            require('../img/m4.jpg'),
            require('../img/m5.jpg'),
        ]

    }
  }

  



  onLayout = e => {
    this.setState({
      width: e.nativeEvent.layout.width*1
    });
  };
  


  async getItem() { 
    let phone = await AsyncStorage.getItem("phone")
    let name = await AsyncStorage.getItem("name")
    phone = JSON.parse(phone)
    name = JSON.parse(name)
    //  alert(name)
    //  alert(phone)
     this.get_User_Data(name,phone);
  }




get_User_Data(name,phone){
  let data_to_send = {
    name:name,
    phone:phone,
    }
    
    axios.post("https://camp-coding.com/classic/Select_User_Data.php", data_to_send).then(res => {
        if (res.status == 200) {   
            if (typeof (res.data) == typeof ({})) {
                this.setState({
                    Data: res.data,
                })
            } 

        }
    })
}


getData(){
  axios.get("https://camp-coding.com/classic/Select_Work_Time.php").then(res=>{
      if(res.status ==200){ 
          // alert(res.data)
            this.setState({
              work_time :res.data,
              loading:false,
            })
         
      }else{
        alert("Try agaib later")
      }
   })
}



  componentDidMount(){
    this.getItem()
    this.getData()
   
  }

  render() {
    return (
      <>
        <StatusBar
          backgroundColor={"#fff"}
          barStyle="dark-content"
        />

      <View style={styles.header}>
         
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#000',marginLeft:10 }}>Classic</Text>
      <Image style={{ width: 70, height: 60, resizeMode: 'contain' }}
          source={require('../img/mm.png')} />
    </View>


{
  this.state.adDismissed == true ?
  <View style={{
    width:windowWidth*.9,  
    height:windowHeight*.9,
    justifyContent:'center',
    alignItems:"center",
    // backgroundColor:'#0ff',
    alignSelf:'center'
    // position:'relative',
    // marginTop:120,
    // left:'50%',
    // marginLeft:-24,
    // marginTop:-24,
    // position:'absolute',
    }}>
      <BannerAd size="300x600" unitId={this.state.UNIT_ID_BANNER} 
          onAdClosed={()=>{
             this.setState({adDismissed:false})
          }}
          onAdFailedToLoad ={()=>{
            this.setState({adDismissed:false})
          }}

      />
  
    </View>
    :
     

    <ScrollView>
  

    <View style={{}}>
      <View style={styles.view_img} onLayout={this.onLayout}>
      <SliderBox
          images={this.state.images}
          sliderBoxHeight={windowHeight*.36}
          dotColor="#FF5100"
          resizeMode="stretch"
          inactiveDotColor="#90A4AE"
          parentWidth={windowWidth*.88}
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          onCurrentImagePressed={index => `image ${index} pressed`} //=> console.warn(`image ${index} pressed`)
          currentImageEmitter={index => `current pos is: ${index}`}//=> console.warn(`current pos is: ${index}`)
        />
  
        </View>
  
       
  
  <Text style={{ fontWeight: '800', fontSize: 18, color: '#000',textAlign:'center',margin:15,marginTop:15 }}>{this.state.work_time.trim()}</Text>
  
  
  <View style={{ height: windowHeight * .3,backgroundColor:'#F3F3F3'}}>
  
       <View style={{height:windowHeight*.25,justifyContent:'center',justifyContent:'center',}}>
       <TouchableOpacity
         onPress={()=>{
           this.props.navigation.navigate("Page2",{
            user_id:this.state.Data.user_id
           })
         
         }}
       >
  
          <View style={[styles.button,{alignSelf:'flex-start',marginLeft:18}]}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000' }}>حجز عادى </Text>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity
          onPress={()=>{
            this.props.navigation.navigate("Special_Booking")
          }}
        >
          <View style={[styles.button,{marginTop:50,alignSelf:'flex-end',marginRight:18}]}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000' }}>حجز عريس </Text>
          </View>
        </TouchableOpacity>
       </View>
       
  
      </View>
     
      <View style={styles.tap_view}>
  
        <View style={styles.my_view}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Profile", {
              name: this.state.Data.user_name,
              phone: this.state.Data.user_phone,
            })
          }}
        >
          <Icon name="user-alt" size={25} style={{ color: '#8E8EA0', }} />
        </TouchableOpacity>
          <Text style={{fontSize:18,fontWeight:'800',color:'#000'}}>بروفايل</Text>
          </View>
  
        <View style={styles.view_icon}>
          <TouchableOpacity
            onPress={() => {
              // this.props.navigation.navigate("Page1")
            }}
          >
            <Icon name="home" size={30} style={{ color: '#fff' }} />
          </TouchableOpacity>
        </View>
  
        <View style={styles.my_view}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('MyOrder', {
              user_id:this.state.Data.user_id
            })
          }}
        >
          <Icon name="shopping-bag" size={25} style={{ color: '#8E8EA0',marginRight:13  }} />
          <Text style={{fontSize:18,fontWeight:'800',color:'#000'}}>حجزى</Text>
        </TouchableOpacity>
        </View>
       
  
      </View>
  
      </View>
      </ScrollView>

}
    

 
   

  
      </>
    )
  }
}

export default createAppContainer(
    createStackNavigator(
      {
      
        Home:Home,
        Page2 :Booking_Screen,
        Page3:Confirm_Booking,
        Services:Services,
        Page4:Rented,
        Profile:Profile,
        MyOrder:MyOrder,
        ChangeAge:ChangeAge,
        Special_Booking:Special_Booking,
        ChangePhone:ChangePhone,

      },
      {
        headerMode: 'none'
      },
      {
        initialRouteName: 'page1'
      }
    )
  )




const styles = StyleSheet.create({
  header: {
    width: windowWidth,
    height: windowHeight * .085,
    backgroundColor: '#fff',
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',

  },
  view_img: {
    width: windowWidth,
    height: windowHeight * .35,
    backgroundColor: '#F3F3F3',
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop:20,
    flexDirection:'row',
  },
  button: {
    width: windowWidth * .6,
    height: windowHeight * .08,
    backgroundColor: '#FFDDDE',
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    marginTop: 0,
    borderRadius: 15,

  },
  tap_view: {
    width: '100%',
    height: windowHeight * .1,
    backgroundColor: '#fff',   //#F3F0F7
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 13,
    paddingRight: 13,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
    marginTop:15
  },
  view_icon: {
    width: 70,
    height: 70,
    backgroundColor: '#FF5100',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -55,
    borderRadius: 40,
    // alignSelf: 'flex-end'

  },
  my_view:{
    flexDirection:'column',
    width:60,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10,
    height:60,
  },

})

///////////////////////////////////////////////////////////////////
