import * as React from 'react';

import { ContextoTema } from '../../contextoTema';

import { Text,View } from 'react-native';

export const TimerDisplay = (props) => {

	return (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
			<View style={estilo.timerDisplay} >
				<Text style={estilo.subtitulo}>Tempo Restante</Text>
				<View style={estilo.rowFlex}>
					<Text style={estilo.tempoProva}>{props.hs}:{props.ms}:{props.s}</Text>
				</View>
			</View>	
		)}
	</ContextoTema.Consumer>
	)
}  