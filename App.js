


import React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage'
import { createAppContainer,createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ImageSlider from 'react-native-image-slider';
import { SliderBox } from "react-native-image-slider-box";
import axios  from "axios";
import Booking_Screen from "./Tasks/Booking_Screen";
import Confirm_Booking from './Tasks/Confirm_Booking';
import Rented from './Tasks/Rented'
import DateTimePicker from '@react-native-community/datetimepicker';
import Home from "./Tasks/Home";
import Profile from './Tasks/Profile';
import SignUp from './Tasks/SignUp'
import MyOrder from './Tasks/MyOrder';
import Special_Booking from './Tasks/Special_Booking';
import LogIn  from "./Tasks/LogIn";
import ChangeAge from './Tasks/ChangeAge'
import Services from './Tasks/Services'
import ChangePhone from './Tasks/ChangePhone'
import NetInfo from "@react-native-community/netinfo";
import { BannerAd, TestIds } from '@react-native-admob/admob';

 class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: true,
      tirmnate: true,
      show:false,
      phone:'',
      name:'',
      network_connection:false,
    }
  }

  async getItem() { 
    let phone = await AsyncStorage.getItem("phone")
    let name = await AsyncStorage.getItem("name")
    phone = JSON.parse(phone)
    name = JSON.parse(name)

    // alert(name)
    // alert(phone)

    let data_to_send={
      phone:phone,
      name:name,
    }//http://classic.epizy.com   ////  https://classicapp.000webhostapp.com
   
    axios.post("http://192.168.1.3/Classic/Check_Auth.php",data_to_send).then(res => {
      
      if (res.status == 200) {
        //  alert(res.data)
        if(typeof(res.data) == typeof({})){
          // this.setState({name:name,phone:phone})

          this.props.navigation.navigate("Home")
        
        }else{
          this.setState({name:'',phone:''})
          this.props.navigation.navigate("SignUp")
          // alert(res.data)
        }
      
  
      } else {
        alert("Try again later")
      }
      
    })


  }


  netInfoState() {
   
    NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        this.setState({network_connection: true});
        this.getItem();
       
      } else {
        this.setState({network_connection: false});
      }
    });
  }
   
  
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false
    });
  }


  componentDidMount() {
 
    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 5000);
  
    this.netInfoState()
    // this.setItem()
  }



  render() {
    let Splash_Screen = (

      <View style={styles.SplashScreen_RootView}>
        <StatusBar
          hidden={true}
        />
        <View style={styles.SplashScreen_ChildView}>

          <Image source={require('./img/mahmoud.png')}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
        </View>
      </View>)

    return (
      <>
     
     {
      this.state.network_connection ==false?
      <View style={{height:windowHeight,justifyContent:'center',alignItems:'center'}}>
     <Image  source={require('./img/wifi.png')}
          style={{width:80,height:80,resizeMode:'contain'}}
        />
      <Text style={{fontSize:20,textAlign:'center',fontWeight:'bold',color:'#000',marginTop:8}}>لا يتوفر اتصال بالانترنت</Text>
      </View>
      :
      null
      }

      {
          (this.state.isVisible === true) ? Splash_Screen : null
      }


      {/* {
       this.state.name && this.state.phone == ''?
      
        this.props.navigation.navigate("SignUp")
         :
         this.props.navigation.navigate("Home",{
           name :this.state.name,
           phone:this.state.phone, 
          
         })
      
      } */}
     
      </>
     
    )
  }
}
0

const App_Screen= (
  createStackNavigator(
    {
      Page1:App,
      Home:Home,
      Profile:Profile,
      MyOrder:MyOrder,
      Special_Booking:Special_Booking,
      Page2 :Booking_Screen,
      Page3:Confirm_Booking,
      Services:Services,
      Page4:Rented,
      SignUp:SignUp ,
      LogIn:LogIn,
      ChangeAge:ChangeAge,
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


const Auth =(
  createStackNavigator(
    {
      Page1:App,
      SignUp:SignUp ,
      LogIn:LogIn,
    },
    {
      headerMode: 'none'
    },
    {
      initialRouteName: 'page1'
    }
  )
) 



export default  createAppContainer(
  createSwitchNavigator(
    {
      Page1:App,
      Auth:Auth,
      Screens:App_Screen,
      Home:Home,
      SignUp:SignUp ,
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
    height: windowHeight * .36,
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
    marginTop:30
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
  
    MainContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },

    SplashScreen_RootView:
    {
      justifyContent: 'center',
      flex: 1,

      position: 'absolute',
      width: '100%',
      height: '100%',
    },

    SplashScreen_ChildView:
    {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#D6D4D9', //#D6D4D9
      flex: 1,
    },

})



///////////////////////////////////////////////////////////////////




// import React from "react";
// import {
//   Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,Button
// } from 'react-native'

// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { Dimensions } from 'react-native';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// import AsyncStorage from '@react-native-community/async-storage'
// import { createAppContainer,createSwitchNavigator } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack'
// import ImageSlider from 'react-native-image-slider';
// import { SliderBox } from "react-native-image-slider-box";
// import axios  from "axios";
// import Booking_Screen from "./Tasks/Booking_Screen";
// import Confirm_Booking from './Tasks/Confirm_Booking';
// import Rented from './Tasks/Rented'
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Home from "./Tasks/Home";
// import Profile from './Tasks/Profile';
// import SignUp from './Tasks/SignUp'
// import MyOrder from './Tasks/MyOrder';
// import Special_Booking from './Tasks/Special_Booking';
// import LogIn  from "./Tasks/LogIn";
// import ChangeAge from './Tasks/ChangeAge'
// import Services from './Tasks/Services'
// import ChangePhone from './Tasks/ChangePhone'
// import NetInfo from "@react-native-community/netinfo";
// import { BannerAd, TestIds,AdMobBanner } from '@react-native-admob/admob';

//  export default class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       // bannerRef=
//       UNIT_ID_BANNER:'ca-app-pub-1042748141632557~4400907682',
//       interstitialAd:null,
//       adLoaded:false,
//       adDismissed:false,
//     }
//   }


//   useEffect(() => {
//     const interstitial = InterstitialAd.createAd(TestIds.INTERSTITIAL);
//     setInterstitialAd(interstitial);

//     const subscriptions = [
//       interstitial.addEventListener('onAdLoaded', () => {
//         setAdLoaded(true);
//       }),
//       interstitial.addEventListener('onAdDismissed', () => {
//         setAdDismissed(true);
//       }),
//     ];

//     return () => subscriptions.forEach((sub) => sub.remove());
//   }, []

//   useEffect(() => {
//     if (adDismissed) {
//       navigation.navigate('NextScreen');
//     }
//   }, [adDismissed, navigation]);


 

//   render(){
//     return(
//       <>
//       <View style={{width:windowWidth,height:windowHeight,justifyContent:'center',alignItems:"center"}}>
//       <BannerAd size="300x400" unitId={TestIds.BANNER} />
       
//       <View>
//       <Button
//         title="Navigate to next screen"
//         onPress={() => {
//           if (this.state.adLoaded) {
//             this.state.interstitialAd?.show();
//           } else {
//               alert("gfdsdfgh")
//           }
//         }}
//       />
//     </View>

//     </View>
//       </>
//     )
//   }

// }
/////////////////////////////////////////////////////////////

