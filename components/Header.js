import React from 'react'
import { Text,StyleSheet, Platform } from 'react-native'

export const Header = () => {
    return (
        <>
            <Text style={styles.encabezado} >Criptomonedas</Text>
            
        </>
    )
}


 
const styles = StyleSheet.create({
    encabezado:{
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        fontSize:40,
        fontFamily:'Lato-Black',
        color:'#FFF',
        backgroundColor:'#5E49E2',
        paddingBottom:10,
        textAlign:'center',
        textTransform:'uppercase',
        marginBottom:20
    }
})

