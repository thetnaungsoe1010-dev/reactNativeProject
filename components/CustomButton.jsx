import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyle ,textStyle,isLoading}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    style={{ 
        minHeight: 50,
        width: '100%',
        backgroundColor: '#FFA001',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        ...containerStyle,
        opacity: isLoading ? 0.5 : 1,
        disabled: isLoading,
    }}>
        <Text style={{ fontSize: 16, fontFamily:"Poppins-SemiBold", color:"#000", ...textStyle }}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
