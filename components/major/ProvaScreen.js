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
	let timerAvaliable = props.timerAvaliable

	let [nextTestTag, setNextTag] = React.useState(0)

	let [paused, setPaused] = React.useState(false)

	timer.loadNotifiers(setNextTag,setPaused)

	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={[estilo.container, estilo.page]}>
					{timerAvaliable &&
						<WrappedTimer timer={timer}/>
					}
					<TestController 
						testActive={props.testActive}
						setTestActive={props.setTestActive} 
						timer={timer}
						paused={paused}/>
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