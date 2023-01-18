import * as React from 'react';

import { Text, View } from 'react-native';

import { ContextoTema } from '../../contextoTema';
import { IconeBotao } from '../minor/IconeBotao';

import { TimerDisplay } from '../intermediate/TimerDisplay';
import { EtiquetasContainer } from '../intermediate/EtiquetasContainer';
import { TestController } from '../intermediate/TestController';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

export { ProvaScreen as ProvaScreen }

function ProvaScreen(props){

	if(props.storage == null){return}

	let timer = props.timerProva
	let timerAvaliable = (props.storage.getSetting("timerHidden") == 'f')

	let [provaS, setSValue] = React.useState(timer.getS())
	let [provaM, setMValue] = React.useState(timer.getM())
	let [provaH, setHValue] = React.useState(timer.getH())

	let [nextTestTag, setNextTag] = React.useState(0)

	let [paused, setPaused] = React.useState(false)

	let [timerVisible, setTimerVisible] = React.useState(timerAvaliable)

	timer.loadTimer(setSValue,setMValue,setHValue,setNextTag,setPaused)

	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={[estilo.container, estilo.page]}>
					{timerAvaliable &&
					<View style={[estilo.container,{width: "60%"}]} >
						<Pressable 
							style={{
								flexDirection: 'row',
								justifyContent: 'space-around',
								alignItems: 'center',
								width: "90%"
							}}
							onPressIn={
								() => {
									setTimerVisible(!timerVisible)
								}
							}
							>
							<IconeBotao 
								iconImage={timerVisible? "invisible" : "visible" } 
								callback={() => {}}/>
							<Text>
								{timerVisible? "Esconder Tempo de Prova" : "Revelar Tempo de Prova"}
							</Text>
						</Pressable>
						
						{timerVisible &&
							<TimerDisplay hs={provaH} ms={provaM} s={provaS}/>}
						{! timerVisible &&
							<View style={[estilo.timerDisplay,{opacity: 0}]}></View>
						}
					</View>}
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