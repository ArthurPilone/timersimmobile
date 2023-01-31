import * as React from 'react';

import { Text, View } from 'react-native';

import { ContextoTema } from '../../contextoTema';
import { IconeBotao } from '../minor/IconeBotao';

import { EtiquetasContainer } from '../intermediate/EtiquetasContainer';
import { TestController } from '../intermediate/TestController';
import { WrappedTimer } from '../intermediate/WrappedTimer';

export { ProvaScreen as ProvaScreen }

function ProvaScreen(props){

	let timer = props.timerProva

	let [timerAvaliable, settimerAvaliable] = React.useState(false)

	Promise.resolve(props.timerHidden).then((v) => {settimerAvaliable(v == 'f')})

	let [nextTestTag, setNextTag] = React.useState(0)

	let [paused, setPaused] = React.useState(false)

	let [testEnded, setTestEnd] = React.useState(false)

	timer.loadNotifiers(setNextTag,setPaused,() => {setTestEnd(true)})

	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={[estilo.container, estilo.page]}>
					{timerAvaliable &&
						<WrappedTimer timer={timer} testEnded={testEnded}/>
					}
					<TestController 
						testActive={props.testActive}
						setTestActive={props.setTestActive} 
						timer={timer}
						paused={paused}
						testEnded={testEnded}/>
					<EtiquetasContainer tags={timer.tags} nextTag={nextTestTag}/>
					<IconeBotao 
						estiloLayout={estilo.topLeft}
						iconImage="back" 
						callback={props.return}/>
				</View>
			)}
		</ContextoTema.Consumer>
	);
  }