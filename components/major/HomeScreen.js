import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { Logo }  from "../minor/Logo.js"
import { styles } from "../../style/style.js"
import { Etiqueta } from '../minor/Etiqueta.js';
import { Botao } from '../minor/Botao.js';

export { HomeScreen as HomeScreen }

function HomeScreen() {
	return (
	  <View style={styles.container}>
		  <Logo/>
		  <Etiqueta h='1' m='30'/>
		  <Etiqueta h='1' m='00'/>
		  <Botao texto='Aperte me' callback={ () => {
				console.log("Apertado !")
		  	}} />
		  <StatusBar style="auto" />
	  </View>
	);
  }