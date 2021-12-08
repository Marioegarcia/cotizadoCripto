import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Formulario } from './components/Formulario';
import { Header } from './components/Header';
import Cotizacion from './components/Cotizacion';

const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarApi, guardarConsultaAPI] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);


  useEffect(() => {
    
    const cotizarCriptomoneda = async () => {
      if (consultarApi) {
        //Consulta a la api
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const resultado = await axios.get(url);
       
        guardarCargando(true);
        setTimeout(() => {

          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
          guardarConsultaAPI(false);
          guardarCargando(false);
        }, 3000);
        
      }
    }
    cotizarCriptomoneda();
  }, [consultarApi]);

  const componente = cargando ? <ActivityIndicator size="large" color="#5E49E2" /> : <Cotizacion resultado={resultado}/>

  return (
    <>
    <ScrollView>
      <Header/>

      <Image
        source={require('./assets/img/cryptomonedas.png')}
        style={styles.imagen}
      />

      <View style={styles.contenido} >
        <Formulario
        moneda={moneda}
        criptomoneda={criptomoneda}
        setMoneda={setMoneda}
        setCriptomoneda={setCriptomoneda}
        guardarConsultaAPI={guardarConsultaAPI}
        />

        
      </View>

      <View style={{marginTop:10}} >
        { componente }
      </View>

      

    </ScrollView>

    </>
  );
};

const styles = StyleSheet.create({
  imagen:{
    width:'100%',
    height:150,
    // marginHorizontal:'2.5%'
  },
  contenido:{
    marginHorizontal:'2%'
  }
})



export default App;
