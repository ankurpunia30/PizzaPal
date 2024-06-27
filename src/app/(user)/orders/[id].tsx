import { StyleSheet, Text, View,FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import  orders  from '../../../../assets/data/orders'
import OrderListItem from '../../../components/OrderListItem'
import OrderItemListItem from '../../../components/OrderItemListItem'
import Colors from '../../../constants/Colors'
import { Pressable } from 'react-native'
import { OrderStatusList}  from '../../../types'
import { useOrderDetails, useUpdateOrder } from '@/src/api/orders'
import { useUpdateOrderSubscription } from '@/src/api/orders/subscriptions'
const OrderDetailsScreen = () => {
  const {id:idString}=useLocalSearchParams();
  const id=parseFloat(typeof idString==='string'?idString:'');
  const {data:order,isLoading,error}=useOrderDetails(id);
  //const order=orders.find((order)=>order.id.toString()===id);
  useUpdateOrderSubscription(id);
  if(isLoading) 
    return <ActivityIndicator/>
  if(error || !order) 
    return <Text>unable to fetch</Text>

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title:`Order#${order.id}`}} />
      <OrderListItem order={order}/>
      <FlatList
      data={order.order_item}
      contentContainerStyle={{gap:10}}
      
    renderItem={({item})=><OrderItemListItem item={item}/>
  
  }
      />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        
        flex:1,
        padding:10,
        gap:10
    }
})
export default OrderDetailsScreen

