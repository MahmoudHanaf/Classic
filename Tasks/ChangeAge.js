
import * as React from 'react'
import {
    Text, StyleSheet, View, ScrollView, Switch, TextInput, Dimensions,
    StatusBar, Image, TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { backgroundColor, border_color2, text, border_color } from '../Tasks/Colors';
import axios  from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class ChangeAge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age:  '',
            ageError:'',
            user_id:0,
            phone:'',
            name:'',
        }
    }



    componentDidMount(){
      let age =this.props.navigation.getParam("age")
      let name =this.props.navigation.getParam("name")
      let phone =this.props.navigation.getParam("phone")
      this.setState({
      age :age,
      name:name,
      phone:phone,
      })
      // alert(user_id)
    }


    myData(){
   
      let Eroors=0;
  
      if(this.state.age == 0){
        Eroors++
         this.setState({ageError:'يجب عليك ادخال عمرك'})
      }else{
        this.setState({ageError:''})
      }
  
  
  if(Eroors ==0){
    let data_to_send={
       age :this.state.age,
       name :this.state.name,
       phone:this.state.phone,
    }
     axios.post("http://192.168.1.3/Classic/ChangeAge.php",data_to_send).then(res=>{
        
     if(res.status ==200){
      //  alert(res.data)

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

        <View style={styles.header}>

            <View style={{width:25,height:40}}></View>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color:'#000'}}>تعديل العمر</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
             <Icon name="arrow-left" size={21} style={{color:'#0000'  }} />
          </TouchableOpacity>
        </View>
              
         <ScrollView >
                       
                   
             <View style={{height:80,justifyContent:'space-between'}}>
            <View style={styles.text_input}>
              <Icon name="user-alt" style={{ marginLeft: 5 }} size={19} />
              <TextInput placeholder="العمر "
                style={{ fontSize: 19 }}
                 keyboardType="number-pad"
                value={this.state.age}
                onChangeText={(value) => {
                  this.setState({ age: value })
                }}
              />
            </View>
               <Text style={{fontSize:17,fontWeight:'bold',textAlign:'center',marginTop:10}}>{this.state.ageError}</Text>
              </View>

              <TouchableOpacity
            onPress={()=>{
               this.myData()
               this.props.navigation.navigate("Home")
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



});

