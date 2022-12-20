import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { Logo }  from "../minor/Logo.js"
import { Etiqueta } from '../minor/Etiqueta.js';
import { Botao } from '../minor/Botao.js';

import { ContextoTema } from '../../contextoTema';
import { InputNumerico } from '../minor/InputNumerico.js';

export { HomeScreen as HomeScreen }

function HomeScreen() {
	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={estilo.container}>
					<Logo/>
					<InputNumerico callback={(x) => console.log(x)} step={5} max={60}/>
					<InputNumerico callback={(x) => console.log(x)} step={1} max={6}/>
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