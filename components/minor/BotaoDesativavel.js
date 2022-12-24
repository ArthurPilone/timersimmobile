import * as React from 'react';

import { Pressable, Text } from 'react-native';

import { ContextoTema } from '../../contextoTema';

export const BotaoDesativavel = (props) => {

	var [ pressionado, setPressionado ] = React.useState(false);

	return (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => {
			var propiedades = {
				style: (pressionado || ! props.ativado) ? estilo.botaoPressionado : estilo.botao, 
				onPressIn: () => { if(props.ativado){setPressionado(true);props.callback()}},  
				onPressOut: () => { if(props.ativado){setPressionado(false)}},           
			};
			
			return (<Pressable {...propiedades} >
				<Text style={estilo.texto}>{props.texto}</Text>
			</Pressable>)
		}}
	</ContextoTema.Consumer>
	)
}  