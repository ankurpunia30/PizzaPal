import { View, Text ,Image,StyleSheet,Pressable} from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Stack } from "expo-router";
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import Button from '@/src/components/Button';
import { useCart } from '@/src/provider/CartProvider';
import { PizzaSize } from '@/src/types';
const sizes:PizzaSize[]=['S','M','L','XL'];
const ProductDetailsScreen = () => {
  //useLocalSearchParams is a hook that is used to get the id from the url
  const {id}=useLocalSearchParams();
  const [selectedSize,setSelectedSize]=useState<PizzaSize>('M');
const {addItem}=useCart();
  const product=products.find((product)=>product.id.toString()===id);
  const router=useRouter();
  const addToCart=()=>{
    if(!product) return;
    addItem(product,selectedSize);
    router.push('/cart');
  }
  
  if(!product) 
    return <Text>Product not found</Text>
  return (
    <View style={styles.container}>
      <Stack.Screen  options={{title:product.name}} />        
      <Image source={{uri:product.image|| defaultPizzaImage}} style={styles.image}/>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    
    </View>
  )
}
const styles=StyleSheet.create({
  container:{
      backgroundColor:'white',
      flex:1,
      padding:10,

  },
image:{
  width:'100%',
  aspectRatio:1,
},
sizes:{
  flexDirection:'row',
  justifyContent:'space-around',
  paddingVertical:10,
  marginVertical:10,
},

size:{
  backgroundColor:'gainsboro',
  width:50,
  aspectRatio:1,
  borderRadius:25,
  justifyContent:'center',
  alignItems:'center',
},
sizeTxt:{
  fontSize:20,
  fontWeight:'500',

},
title:{
  fontSize:20,
  fontWeight:'bold',
  marginVertical:10,
},
price:{
  fontSize:18,
  fontWeight:'bold',
  
 
}
})
export default ProductDetailsScreen
