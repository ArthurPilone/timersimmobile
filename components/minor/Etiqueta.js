import { View, Text } from 'react-native';

import { ContextoTema } from '../../contextoTema';

export const Etiqueta = (props) => (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
			<View style={estilo.etiqueta}>
				<Text style={estilo.texto}>{props.h}h {props.m}m</Text>
			</View>
		)}
	</ContextoTema.Consumer>
  )  