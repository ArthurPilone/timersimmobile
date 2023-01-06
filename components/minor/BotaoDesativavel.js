import * as React from 'react';

import { Pressable, Text } from 'react-native';

import { ContextoTema } from '../../contextoTema';

export const BotaoDesativavel = (props) => {

	var [ pressionado, setPressionado ] = React.useState(false);

	return (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => {
			var propiedades = {
				style: (pressionado || ! props.ativo) ? estilo.botaoPressionado : estilo.botao, 
				onPressIn: () => { if(props.ativo){setPressionado(true);props.callback(...props.args)}},  
				onPressOut: () => { if(props.ativo){setPressionado(false)}},           
			};
			
			return (<Pressable {...propiedades} >
				<Text style={estilo.texto}>{props.texto}</Text>
			</Pressable>)
		}}
	</ContextoTema.Consumer>
	)
}  

BotaoDesativavel.defaultProps = {
	args: []
}