import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import strawberry from '../assets/strawberry.jpg'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import { getConnection } from '../Connection';

const Post = ({username,incompleted,postid,postdate,title,quantity,price,type,image,authid,navigation,authimg}) => {

    const [typeName, setTypeName] = useState("")
    const [isDirect, setIsDirect] = useState(false)
    const [authUri, setAuthUri] = useState(null)

    useEffect(() => {
        
        setAuthUri(getConnection() + "/profile/" + authimg);
        if(type == "Direct Sell"){
            setTypeName("Direct Sell")
            setIsDirect(true)
        }else{
            setTypeName("Auction")
            setIsDirect(false)
        }
    }, [])
    

  return (
    <View style={styles.card}>
        <View style={styles.container2}>
              <TouchableOpacity onPress={() => navigation.navigate("ViewProfile", {uid:authid})} style={styles.container1}>
                  {
                      authUri ? (<Image source={{uri:authUri}} style={styles.userImage} />):null
                }
                <View>
                    <Text style={styles.user}>{username}</Text>
                    <Text>{postdate.substring(0,10)}</Text>
                </View>
              </TouchableOpacity>
              {
                  isDirect ? (<TouchableOpacity style={styles.btn1} onPress={()=>navigation.navigate("Cart")}>
                        <Image style={styles.icon} source={require('../assets/add-cart.png')} />
                        <Text style={{color:'white',fontWeight:'bold'}}>Add To Cart</Text>
                    </TouchableOpacity>):(<TouchableOpacity style={styles.btn1}>
                        <Image style={styles.icon} source={require('../assets/bid.png')} />
                        <Text style={{color:'white',fontWeight:'bold'}}>Bid Now</Text>
                    </TouchableOpacity>)
              }
        </View>
        <ImageBackground source={{uri:image}} style={styles.image}>
            <LinearGradient
                colors={["rgba(0,0,0,0.7)","transparent"]}
                style={styles.gradient}
            />
            <Text style={styles.titleText}>{title}</Text>
        </ImageBackground>
        <View style={styles.container2}>
            <View>
                  <Text style={styles.typeBtn}>{ typeName}</Text>
                <View style={styles.container1}>
                      <TouchableOpacity style={styles.btn2}>
                          <Image style={styles.icon} source={require('../assets/location.png')} />
                        <Text style={{color:'white',fontWeight:'bold'}}>Location</Text>
                    </TouchableOpacity>
                      <TouchableOpacity onPress={()=>navigation.navigate("CompletePost",{id:postid})} style={styles.btn2}>
                          <Image style={styles.icon} source={require('../assets/view.png')} />
                        <Text style={{color:'white',fontWeight:'bold'}}>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{margin:10}}>
                  <Text style={{ fontSize: 17 }}>{quantity} { incompleted > 0 ? " - "+incompleted : null} kg</Text>
                <Text style={{fontSize:17}}>Rs :{price.toFixed(2)}</Text>
            </View>
        </View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
    card:{
        borderColor:'#000000',
        borderRadius:10,
        borderWidth:1,
        margin: 8
    },
    user:{
        fontWeight:'bold'
    },
    gradient:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0
    },
    image:{
        height:250,
        resizeMode:'cover',
        width:'100%',
    },
    typeBtn:{
        marginLeft:8,
        fontWeight:'bold'
    },
    titleText:{
        color:'#ffffff',
        margin:8,
        fontWeight:'bold',
        fontSize:18
    },
    userImage:{
        height:50,
        width:50,
        margin:8,
        borderRadius:25
    },
    container1:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    container2:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    btn1:{
        backgroundColor:'#4d8aeb',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        margin:8,
        paddingHorizontal:10,
        borderRadius: 8,
        flexDirection:'row'
    },
    btn2:{
        backgroundColor:'#6B8E23',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        margin:8,
        paddingHorizontal:10,
        borderRadius: 8,
        flexDirection:'row'
    },
    icon: {
        height: 25,
        width: 25,
        tintColor:'white'
    }
})