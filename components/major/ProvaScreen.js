import * as React from 'react';

import { View } from 'react-native';

import { ContextoTema } from '../../contextoTema';
import { Botao } from '../minor/Botao';

import { TimerDisplay } from '../intermediate/TimerDisplay';
import { EtiquetasContainer } from '../intermediate/EtiquetasContainer';

export { ProvaScreen as ProvaScreen }

function ProvaScreen(props){

	let timer = props.timerProva

	let [provaS, setSValue] = React.useState(timer.getS())
	let [provaM, setMValue] = React.useState(timer.getM())
	let [provaH, setHValue] = React.useState(timer.getH())

	let [nextTestTag, setNextTag] = React.useState(0)

	timer.loadTimer(setSValue,setMValue,setHValue,setNextTag)

	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={[estilo.container, estilo.page]}>
					<TimerDisplay hs={provaH} ms={provaM} s={provaS}/>
					<Botao texto="Pausa" callback={props.timerProva.pause} args={[timer]}/>
					<Botao texto="Despausa" callback={props.timerProva.unpause} args={[timer]}/>
					<Botao texto="voltaaa" callback={props.a}></Botao>
					<EtiquetasContainer tags={timer.tags} nextTag={nextTestTag}/>
				</View>
			)}
		</ContextoTema.Consumer>
	);
  }