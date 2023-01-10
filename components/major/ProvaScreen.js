import * as React from 'react';

import { View } from 'react-native';

import { ContextoTema } from '../../contextoTema';
import { Botao } from '../minor/Botao';

import { TimerDisplay } from '../intermediate/TimerDisplay';
import { EtiquetasContainer } from '../intermediate/EtiquetasContainer';
import { TestController } from '../intermediate/TestController';

export { ProvaScreen as ProvaScreen }

function ProvaScreen(props){

	let timer = props.timerProva

	let [provaS, setSValue] = React.useState(timer.getS())
	let [provaM, setMValue] = React.useState(timer.getM())
	let [provaH, setHValue] = React.useState(timer.getH())

	let [nextTestTag, setNextTag] = React.useState(0)

	let [paused, setPaused] = React.useState(false)

	timer.loadTimer(setSValue,setMValue,setHValue,setNextTag,setPaused)

	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={[estilo.container, estilo.page]}>
					<TimerDisplay hs={provaH} ms={provaM} s={provaS}/>
					<TestController 
						testActive={props.testActive}
						setTestActive={props.setTestActive} 
						timer={timer}
						paused={paused}/>
					<Botao texto="voltaaa" callback={props.a}></Botao>
					<EtiquetasContainer tags={timer.tags} nextTag={nextTestTag}/>
				</View>
			)}
		</ContextoTema.Consumer>
	);
  }