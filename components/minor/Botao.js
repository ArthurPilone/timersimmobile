import * as React from 'react';

import { Pressable, Text } from 'react-native';

import { ContextoTema } from '../../contextoTema';

export const Botao = (props) => {

	var [ pressionado, setPressionado ] = React.useState(false);

	return (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => {
			var propiedades = {
				style: pressionado ? estilo.botaoPressionado : estilo.botao, 
				onPressIn: () => {setPressionado(true);props.callback()},  
				onPressOut: () => setPressionado(false),           
			};
			
			return (<Pressable {...propiedades} >
				<Text style={estilo.texto}>{props.texto}</Text>
			</Pressable>)
		}}
	</ContextoTema.Consumer>
	)
}  