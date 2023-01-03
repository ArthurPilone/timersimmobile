import * as React from 'react';

import { View } from 'react-native';

import { ContextoTema } from '../../contextoTema';
import { Botao } from '../minor/Botao';

import { TimerDisplay } from '../intermediate/TimerDisplay';

export { ProvaScreen as ProvaScreen }

function ProvaScreen(props){

	let timer = props.timerProva

	let [provaS, setSValue] = React.useState(timer.getS())
	let [provaM, setMValue] = React.useState(timer.getM())
	let [provaH, setHValue] = React.useState(timer.getH())

	timer.loadTimer(setSValue,setMValue,setHValue)

	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={[estilo.container, estilo.page]}>
					<TimerDisplay hs={provaH} ms={provaM} s={provaS}/>
					<Botao texto="voltaaa" callback={props.a}></Botao>
				</View>
			)}
		</ContextoTema.Consumer>
	);
  }