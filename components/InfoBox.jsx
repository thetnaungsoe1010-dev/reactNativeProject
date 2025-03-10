import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View style={[containerStyles]}>
      <Text style={[ { color:"#fff", textAlign:"center" , fontFamily:"Poppins-SemiBold"}, titleStyles]}>{title}</Text>
      {subtitle && <Text style={{ color:"gray", fontSize:12, fontWeight:"400"}}>{subtitle}</Text>} 
    </View>
  )
}

export default InfoBox