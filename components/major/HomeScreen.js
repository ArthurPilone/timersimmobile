import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { Logo }  from "../minor/Logo.js"
import { Etiqueta } from '../minor/Etiqueta.js';
import { Botao } from '../minor/Botao.js';

import { ContextoTema } from '../../contextoTema';

export { HomeScreen as HomeScreen }

function HomeScreen() {
	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={estilo.container}>
					<Logo/>
					<Etiqueta h='1' m='30'/>
					<Etiqueta h='1' m='00'/>
					<Botao texto='Aperte me' callback={ () => {
						trocaTema();
					}} />
				<StatusBar style="auto" />
				</View>
			)}
		</ContextoTema.Consumer>
	);
  }