import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';



export const Formulario = ({moneda,criptomoneda,setCriptomoneda,setMoneda,guardarConsultaAPI}) => {
    
    const [criptomonedas, setCriptomonedas] = useState([]);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(url);
            
            setCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, [])

    const obtenerMoneda = moneda => {
        
        setMoneda(moneda);
    }

    const cotizarPrecio = ()=> {
        if (moneda.trim() === '' || criptomoneda.trim() === '') {
            
            mostrarAlerta();
            return;
        }

        guardarConsultaAPI(true);
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [
                {text:'OK'}
            ]
        )
    }

    return (
        <View>
            <Text style={styles.label} >Moneda</Text>
            <Picker 
            selectedValue={moneda}
            onValueChange={ moneda => obtenerMoneda(moneda)  } 
            >
                <Picker.Item label="- Seleccione -" value="" />
                <Picker.Item label="Dolar de EUA" value="USD" />
                <Picker.Item label="Peso MXN" value="MXN" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
            </Picker>


            <Text style={styles.label} >Criptomoneda</Text>

            <Picker 
            selectedValue={criptomoneda}
            onValueChange={ cripto => setCriptomoneda(cripto)  } 
            >
                <Picker.Item label="- Seleccione -" value="" />
                { criptomonedas.map( cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                ))}
            </Picker>


            <TouchableHighlight
            style={styles.btnCotizar}
            onPress={cotizarPrecio}
            >
                <Text
                style={styles.textoCotizar}
                >
                    Cotizar
                </Text>
            </TouchableHighlight>
        </View>
    )
}



const styles = StyleSheet.create({
    label:{
        fontFamily: 'Lato-Black',
        textTransform:'uppercase',
        fontSize: 22,
        marginVertical:20,
        
    },
    btnCotizar:{
        backgroundColor:'#5E49E2',
        padding:10,
        marginTop:20,
    },
    textoCotizar:{
        color:'#FFF',
        fontSize:18,
        fontFamily:'Lato-Black',
        textTransform: 'uppercase',
        textAlign:'center',
        
    }
});
