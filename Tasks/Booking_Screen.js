
import React, { version } from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList, Alert,Platform,ActivityIndicator,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ModalDatePicker } from "react-native-material-date-picker";



export default class Booking_Screen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenDate :'',
      tirmnate: true,
      loading: true,
       isPickerShow:false,
      //  date:new Date(),
      // // date:'',
       setDate:new Date().toString(),
       mode:'date',
      date:new Date().toString(),
       Data:[],
      show :false ,
      item:'اختر',
      hour:0,
      error_hour:'',
      text:'',
      user_id:0,
       Times:[
         {
           name:'صباحا',
         },
         {
          name:'مساءا',
         },
       ],
    
    }
  }

  

  getItems(mydate){
   
    let data_to_send={
      booking_date: mydate
    }
   
    axios.post("http://192.168.1.3/Classic/Select_Booking_Times.php",data_to_send).then(res => {
     
      if (res.status == 200) {
       
        if(typeof(res.data) == typeof({})){
           this.setState({
             Data:res.data,
             loading: false,
           })
          //  alert(res.data)
        }else{
           this.setState({text:'لا يوجد حجز',loading:false})
        }
      
      } else {
        alert("Try again later")
      }
    })

  }



  componentDidMount(){
    let user_id =this.props.navigation.getParam("user_id")
    this.setState({user_id:user_id})
    this.getItems(this.state.date.slice(0,16))
   
  }


  register(){
    this.setState({error_hour:''})
    if(this.state.hour ==0 || this.state.item =='اختر'){
       this.setState({error_hour:'برجاء اختيار ساعة الحجز والفترة الزمنية'})
    }
   else{
      this.props.navigation.navigate("Services",{
         user_id:this.state.user_id,
         item:this.state.item,
         hour:this.state.hour,
         date:this.state.date.slice(0,16),
       })
    }
    
  }


 




  render() {
    return (
      <>

        <StatusBar
          backgroundColor={"#fff"}
          barStyle="dark-content"
        />


        <View style={styles.header}>
          <View style={{ width: windowWidth * .52, alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#000', marginLeft: 10, textAlign: 'center' }}>الحجز</Text>
          </View>


          <View style={{ width: windowWidth * .4 }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack()
              }}
            >
              <Icon name="arrow-left" size={25} style={{ color: '#000' }} />
            </TouchableOpacity>
          </View>


        </View>

 <View style={{width:windowWidth,height:windowHeight*.81}}>  
<ScrollView>

    <View style={{flex: 1, alignSelf: 'stretch'}}>
    <ModalDatePicker 
        button={ 
          <View style={styles.view_date}>
        <Icon name="calendar-minus" size={20} style={{ color: '#FF5100' }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>اختر تاريخ الحجز</Text>
        </View>
        
      } 
        locale="tr" 
        onSelect={(date) => {
          this.setState({date:date.toString(),text:'',location:true})
          this.getItems(date.toString().slice(0,16))
          // this.getItems(this.state.date.slice(0,16))
        }
        }
        isHideOnSelect={true}
        initialDate={new Date()}
        language={require('../Tasks/en.json')}
         color={'#FF5100'}
         
     />             
  </View>

<Text style={{fontSize:18,fontWeight:'bold',color:'#000',textAlign:'center',marginTop:10}}>{this.state.date.slice(0,16)}</Text>

    
       <View style={[styles.view_date,{}]}>
        {/* <Icon name="clock" size={20} style={{ color: '#FF5100' }} /> */}
        <TextInput 
        width={windowWidth*.24}
          fontSize={19}
          fontWeight='700'
          color="#000"
          placeholder="اختر ساعة"
          keyboardType="number-pad"
          onChangeText={(value)=>{

            this.setState({hour:value.trim()})
          }}
        />
          <View style={{width:2,height:35,backgroundColor:'#000'}}>
          </View>

          <TouchableOpacity
        onPress={()=>{
           this.state.show == true?
           this.setState({show :false})
           :
           this.setState({show :true})
         
        }}
     >
        <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',width:windowWidth*.18}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>{this.state.item}</Text>
          <Icon name="caret-down" size={25} style={{ color: '#000' }} />
          </View>
          </TouchableOpacity>
        </View>
        

        <Text style={{ fontSize: 16, fontWeight: '700', color: '#FF5100', textAlign: 'center',marginTop:12 }}>{this.state.error_hour}</Text>

         
         {
           this.state.show == true ?
           <View style={[styles.view_date,{ backgroundColor: '#fff', shadowColor: "#000",
           marginTop:7,height:windowHeight*.3,width:windowWidth*.3,marginLeft:windowWidth*.32,}]}>
               <View style={{width:windowWidth*.2,height:windowHeight*.26,justifyContent:'space-between'}}>
                    {
                      this.state.Times.map((item,index)=>
                        <View style={{
                          width: windowWidth * .3,
                           height:40,
                          // backgroundColor:'#0ff',
                          // borderRadius: 15,
                          alignSelf: 'center', 
                          alignItems: 'center',
                          marginTop: 0,
                          borderBottomColor:'#000',
                          borderBottomWidth:.5,
                        
                        }} >
                          <TouchableOpacity
                             onPress={()=>{
                             this.setState({item:item.name,show:false})
                             
                             }}
                          >
                          <View style={{ width: windowWidth * .3, paddingLeft: 12 }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: '#000', }}>{item.name}</Text>
                          </View>
                          </TouchableOpacity>
                          </View>
                      )
                    }
               </View>
            </View>
             :
             null
         }

{
  this.state.text =='' ?(
    <>
{
          this.state.loading == true ?
          (
            <View style={{ justifyContent: 'center', alignItems: 'center',height:windowHeight*.5 }}>
              <ActivityIndicator size={60} color="#FF5D00" ></ActivityIndicator>
            </View>

            ) : (
        <>
         
               <View style={[styles.view_date, { width: windowWidth * .9, backgroundColor: '#fff', shadowColor: "#000",height:47 }]}>
          <View style={{ width: windowWidth * .3, paddingLeft: 12 }}>
            <Text style={{ fontSize: 19, fontWeight: "bold", color: '#000' }}>من</Text>
          </View>

          <View style={{
            width: windowWidth * .3,
            //  backgroundColor:'#0ff',
            alignItems: 'center',
            borderLeftColor: '#000',
            borderLeftWidth: 2,
            borderRightWidth: 2,
            height: 40,
            justifyContent: 'center',
          }}>
            <Text style={{ fontSize: 19, fontWeight: "bold", color: '#000' }}>الى</Text>
          </View>
          <View style={{ width: windowWidth * .3, paddingLeft: 14 }}>
            <Text style={{ fontSize: 19, fontWeight: "bold", color: '#000' }}>الحالة</Text>
          </View>
        </View>



        <FlatList 
        data={this.state.Data}
        
        renderItem ={({item,index})=>
          
        <TouchableOpacity disabled={true}
        onPress={() => {
          // this.props.navigation.navigate("")
        }}
      >
        <View style={[styles.view_date, {
          width: windowWidth * .9, backgroundColor: '#fff',height:48,
        }]}>
          <View style={{ width: windowWidth * .3, paddingLeft: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: '#000', }}>{item.start_booking}</Text>
          </View>

          <View style={{
            width: windowWidth * .3,
            //  backgroundColor:'#0ff',
            alignItems: 'center',
            borderLeftColor: '#000',
            borderLeftWidth: 2,
            borderRightWidth: 2,
            height: 40,
            justifyContent: 'center'
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: '#000' }}>{item.end_booking} </Text>
          </View>

          <View style={{ width: windowWidth * .3, paddingLeft: 12 }}>
            {
              item.status.trim() == 'حجز عادى' || item.status.trim() == 'حجز عريس' ?
                <Text style={{ fontSize: 18, fontWeight: "bold", color: '#FF5100' }}>محجوز</Text>
                :
                <Text style={{ fontSize: 18, fontWeight: "bold", color: '#000' }}>{item.status} </Text>
            }

          </View>
        </View>

      </TouchableOpacity>

        }
        
        />


        {/* {
          this.state.Data.map((item, index) =>
          )
        } */}

      <View  style={{width:50,height:50}}>

      </View>
             

      </>
            )
      }
 </>
  ):
  <View style={{height:windowHeight*.4,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:22,textAlign:'center',fontWeight:'bold',color:'#FF5100'}}>
      {
    this.state.date.toString().slice(0,3) == 'Mon' ?
  "هذا اليوم اجازة برجاءالحجز فى يوم اخر":
    this.state.text
  }
  </Text>
  </View>
}



  </ScrollView>
  </View>  
  <TouchableOpacity
           onPress={()=>{
             this.register()
            
           }}
         >
            <View style={[styles.button,{}]}>
              <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#000' }}>تسجيل الحجز</Text>
            </View>
          </TouchableOpacity>


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
    width: windowWidth * .65,
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
    shadowColor: "#C8C7CA",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row'

  },
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  button: {
    width: windowWidth * .65,
    height: windowHeight * .08,
    backgroundColor: '#FFDDDE',
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
   
    borderRadius: 15,

  },
})
