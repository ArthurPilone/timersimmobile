import * as React from 'react';

import { View } from 'react-native';

import { ContextoTema } from '../../contextoTema';

import { Botao } from '../minor/Botao';

export const TestController = (props) => {
	return (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
			<View style={{flexDirection: 'row'}}>
				{(! props.testActive) && 
					<Botao texto="Começar Prova" callback={ () =>{
						props.setTestActive(true)
						props.timer.unpause(props.timer)
					}} />
				}
				{props.testActive && 
					((! props.paused)  &&
						<Botao texto="Pausar" key='p' callback={props.timer.pause} args={[props.timer]}/>
					)||
					( props.paused &&
					<Botao texto="Retomar" key='unp' callback={props.timer.unpause} args={[props.timer]}/>
					)
				}
			</View>	
		)}
	</ContextoTema.Consumer>
	)
}  