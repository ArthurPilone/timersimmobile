import * as React from 'react';

import { ContextoTema } from '../../contextoTema';

import { Text,View } from 'react-native';

export const TimerDisplay = (props) => {

	let testEnded = (props.s =='00') && (props.ms == '00') && (props.hs == 0)

	return (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
			<View style={[estilo.card, estilo.timerDisplay]} >
				{! testEnded && <Text style={estilo.subtitulo}>Tempo Restante</Text>}
				{testEnded && <Text style={estilo.subtitulo}>Fim de Prova!</Text>}
				<View style={estilo.rowFlex}>
					<Text style={estilo.tempoProva}>{props.hs}:{props.ms}:{props.s}</Text>
				</View>
			</View>	
		)}
	</ContextoTema.Consumer>
	)
}  