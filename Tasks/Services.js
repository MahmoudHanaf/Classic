
import React, { version } from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, 
  TextInput, ScrollView, FlatList, Alert,Platform,ActivityIndicator,
} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import axios from "axios";

export default class Services extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        user_id:0,
        item:'',
        hour:'',
        loading:true,
        date:'',
        isSelected:true,
         Cart:[],
        Services:[
           
        ]
      }
    }

    componentDidMount(){
        let user_id =this.props.navigation.getParam("user_id")
        let item=this.props.navigation.getParam("item")
        let hour=this.props.navigation.getParam("hour")
        let date=this.props.navigation.getParam("date")
        this.setState({
          item:item,
          hour:hour,
          date:date,
          user_id:user_id,
          textError:'',
        })
       
         this.getData()
    }



    Add_Services(){
      let Services =this.state.Services;
      let Cart =this.state.Cart;
      let num_services =0;
       for(let i=0;i<Services.length ;i++){
        if(Services[i].checked ==true){
          Cart.push(Services[i].sevice_name)
          num_services++;
        }
      
       }
      
       if(num_services !=0){
        this.props.navigation.navigate("Page3",{
          user_id:this.state.user_id,
          item:this.state.item,
          hour:this.state.hour,
          date:this.state.date,
          Cart:Cart,
          num_services:num_services,
        })

        // this.setState({Cart:Cart})
       }else{
           this.setState({textError:'برجاء اختيار خدمة'})
       }
      

       
    }
   



    getData(){
      axios.get("http://192.168.1.3/Classic/Select_Services.php").then(res=>{
          if(res.status ==200){ 
              if(typeof(res.data) == typeof({})){
                this.setState({
                  Services :res.data,
                  loading:false,
                  
                })
              
              }
              
          }else{
            alert("Try agaib later")
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
          <View style={{ width: windowWidth * .52, alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#000', marginLeft: 10, textAlign: 'center' }}>الخدمات</Text>
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



        {
          this.state.loading == true ?
          (
            <View style={{ justifyContent: 'center', alignItems: 'center',height:windowHeight*.5 }}>
              <ActivityIndicator size={60} color="#FF5D00" ></ActivityIndicator>
            </View>

            ) : (
               <>
               <ScrollView>
                 <View style={{}}>


                 <FlatList 
                   data={this.state.Services}
                   renderItem={({item,index})=>

                   <View style={[styles.view_date, {
                    width: windowWidth * .9, backgroundColor: '#fff',height:48,
                  }]}>
                    <View style={{width:windowWidth*.4,}}>
                      <Text style={{ fontSize: 18, fontWeight: "bold", color: '#000', }}>{item.sevice_name}</Text>
                    </View>
                    {
                      JSON.parse(item.checked) == true?
                      <Text style={{ fontSize: 18, fontWeight: "bold", color: '#000' }}>{item.sevice_price}</Text>
                      :
                      null
                    }
                     
                       
                      <CheckBox
                         
                        value={JSON.parse(item.checked) }
                              
                        onValueChange={(value) => {
                            let data=this.state.Services
                             data[index].checked= value
                             this.setState({Services:data}) 
                        }  
                        }
                        style={{with:40,height:40,}}
                        />
                  </View>

                   }
                 
                 />
  
                  {/* {
             this.state.Services.map((item,index)=>
             
            
             )
         } */}

               </View>
               </ScrollView>
            {
              this.state.textError !=''? 
              <Text style={{fontSize:18,fontWeight:'bold',color:'#FF5100',textAlign:'center'}}>{this.state.textError}</Text>
              :
              null
            }
           

              <TouchableOpacity
              onPress={()=>{
                this.Add_Services()

              }}
            >
            <View style={[styles.button,{marginTop:10}]}>
              <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#000' }}>تسجيل الخدمات</Text>
            </View>
          </TouchableOpacity>

               </>
            )
      }


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
        justifyContent: 'space-between',
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
        flexDirection: 'row',
        paddingLeft:12,
        paddingRight:12,
    
      },
      button: {
        width: windowWidth * .65,
        height: windowHeight * .08,
        backgroundColor: '#FFDDDE',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
       
        borderRadius: 15,
        marginBottom:20,
    
      },
})

