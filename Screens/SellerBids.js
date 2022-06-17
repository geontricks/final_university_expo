import { StyleSheet, Text,Image, View, ToastAndroid } from 'react-native'
import React,{useEffect,useState} from 'react'
import strawberry from '../assets/strawberry.jpg'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { getConnection } from '../Connection'
import { FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const SingleBidItem = ({id, name, address, contact, image, quantity, accepted, value, days, amount }) => {
    
    const acceptBid = (stat) => {
        AsyncStorage.getItem('auth_code', (error, result) => {
            if (error) {
                console.log(error)
            } else {
                AsyncStorage.getItem('current_profile', (err, resu) => {
                    if (err) {
                        console.log(err)
                    } else {
                        fetch(getConnection() + '/api/auction/accept-bid', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'token': result,
                                'profile':resu
                            },
                            body: JSON.stringify({
                                bid: id,
                                acceptance:stat
                            })
                        }).then((respi) => respi.json()).then((jsonResponse) => {
                            if (jsonResponse.data) {
                                accepted:stat
                            } else {
                                ToastAndroid.show("Something Went Wrong!",ToastAndroid.SHORT)
                            }
                        })
                    }
                })
            }
        })
    }

    return (
        <View style={{
            borderWidth: 1,
            borderColor: '#c4c4c4',
            margin: 8,
            borderRadius:10
        }}>
            <View style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection:'row'
            }}>
                <Image source={{uri:image}} style={{
                    height: 80,
                    width: 80,
                    margin:8,
                    borderRadius:40
                }} />
                <View>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize:18
                    }}>{name}</Text>
                    <Text>{address}</Text>
                    <Text>{contact}</Text>
                </View>
            </View>
            <View style={styles.holderContainer}>
                <View style={styles.holder}>
                    <Text style={styles.holderTitle}>Amount</Text>
                    <Text style={styles.holderCont}>{amount}</Text>
                </View>
                <View style={styles.holder}>
                    <Text style={styles.holderTitle}>quantity</Text>
                    <Text style={styles.holderCont}>{quantity}</Text>
                </View>
                <View style={styles.holder}>
                    <Text style={styles.holderTitle}>Value</Text>
                    <Text style={styles.holderCont}>{value}</Text>
                </View>
                <View style={styles.holder}>
                    <Text style={styles.holderTitle}>days</Text>
                    <Text style={styles.holderCont}>{days}</Text>
                </View>
            </View>
            <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection:'row'
            }}>
                {
                    accepted ? (<TouchableOpacity onPress={()=>acceptBid(false)} style={styles.buttonCover}>
                    <Text>Reject</Text>
                </TouchableOpacity>):(<TouchableOpacity onPress={()=>acceptBid(true)} style={styles.buttonCover}>
                    <Text>Accept</Text>
                </TouchableOpacity>)
                }
            </View>
        </View>
    )
}

const SellerBids = ({ route, navigation }) => {
    
    const { id } = route.params
    const [dataList, setDataList] = useState([]);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        //color
        loadData();
    }, [id])

    const loadData = () => {
        fetch(getConnection() + "/api/auction/post-and-bid/" + id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json"
            }
        }).then((result) => result.json()).then(resasjson => {
            console.log(resasjson.bids)
            setImage(getConnection() + "/post-img/" + resasjson.post.image);
            setTitle(resasjson.post.title)
            setDataList(resasjson.bids)
        }).catch(error => {
            console.log(error)
        })
    }

    const renderItem = ({ item }) => <SingleBidItem accepted={item.accepted} name={item.bidder.firstname + " " + item.bidder.lastname} address={item.bidder.address} amount={item.amount} quantity={item.quantity} value={item.value} days={item.buy_after} contact={item.bidder.contact} image={getConnection() + "/profile/" + item.bidder.image} id={item._id} />
    

  return (
    <View>
          <View style={{
              backgroundColor: '#6B8E23',
              padding:8,
              paddingTop: 25,
              borderBottomLeftRadius:20,
              borderBottomRightRadius:20
          }}>
              <Text style={{
                  fontWeight: 'bold',
                  color: '#fff',
                  textAlign: 'center',
                  margin:10,
                  fontSize:20
              }}>{title}</Text>
              <View style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection:'row'
              }}>
                  {
                      image ? (<Image source={{uri:image}} style={{
                    height: 150,
                      width: 150,
                    borderRadius:15
                }} />):null
                  }
                  <View style={{
                      margin:10
                  }}>
                      <Text style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: '#fff',
                          fontSize:18
                      }}>Total Bids</Text>
                <Text style={{
                          textAlign: 'center',
                          color: '#fff',
                          fontSize:18
                      }}>{dataList.length}</Text>
                </View>
              </View>
          </View> 
          <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection:'row'
          }}>
              <TextInput style={{
                  backgroundColor: '#c3c3c3',
                  width: '70%',
                  margin: 5,
                  padding: 8,
                  borderRadius: 25,
                  paddingHorizontal: 18,
                  fontWeight:'bold'
              }} />
              <TouchableOpacity style={{
                  backgroundColor: '#c3c3c3',
                  margin: 5,
                  padding: 8,
                  borderRadius:25
              }}>
                  <FontAwesome name="search" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity  style={{
                  backgroundColor: '#c3c3c3',
                  margin: 5,
                  padding: 8,
                  borderRadius:25
              }}>
                  <FontAwesome name="filter" size={24} color="black" />
              </TouchableOpacity>
          </View>
          <FlatList data={dataList} renderItem={renderItem} keyExtractor={item=>item._id} />
    </View>
  )
}

export default SellerBids

const styles = StyleSheet.create({
    buttonCover: {
        backgroundColor: '#688e23',
        padding: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        margin:10
    },
    holderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row'
    },
    holder: {
        marginHorizontal:10
    },
    holderTitle: {
        fontWeight: 'bold',
        fontSize:14
    },
    holderCont:{}
})