import { ActivityIndicator, View,Dimensions, } from 'react-native'
import React, {useEffect} from 'react'
import { COLORS } from '../constants'
const{width,height}=Dimensions.get('window')

export default function Loader({loading=false,fullScreen=true}) {
    
    if(loading)
    return (
        fullScreen?
        <View style={{flex:1,height:height,width:width,position:'absolute',zIndex:10000,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.2)'}}>
            <ActivityIndicator color={COLORS.primary} size="large"/>
        </View>
        :
        <View style={{alignItems:'center',justifyContent:'center',}}>
        <ActivityIndicator color={COLORS.primary} size="large"/>
    </View>
    )
else
return null
}

