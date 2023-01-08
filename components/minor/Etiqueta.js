import { View, Text } from 'react-native';

import { ContextoTema } from '../../contextoTema';

export const Etiqueta = (props) => (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
			<View style={props.removida? estilo.etiquetaRemovida : estilo.etiqueta}>
				<Text style={props.removida? estilo.textoLeve : estilo.texto}>{props.h}h {props.m}m</Text>
			</View>
		)}
	</ContextoTema.Consumer>
  )  