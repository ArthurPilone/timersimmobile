import * as React from 'react';

import { ContextoTema } from '../../contextoTema';

import { View } from 'react-native';
import { TimerVisibilityController } from './TimerVisibilityController';
import { TimerDisplay } from './TimerDisplay';

export const WrappedTimer = (props) => {

	let [timerVisible, setTimerVisible] = React.useState(true)

	let timer = props.timer

	let [provaS, setSValue] = React.useState(timer.getS())
	let [provaM, setMValue] = React.useState(timer.getM())
	let [provaH, setHValue] = React.useState(timer.getH())

	timer.loadTimerRenderers(setSValue,setMValue,setHValue, 
		() => {setTimerVisible(true)})

	return(
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={[estilo.container,{width: "60%"}]} >
					<TimerVisibilityController timerVisible={timerVisible} 
					toggleVisibility={() => {setTimerVisible(!timerVisible)}}/>
					{timerVisible &&
						<TimerDisplay hs={provaH} ms={provaM} s={provaS}/>}
					{! timerVisible &&
						<View style={[estilo.timerDisplay,{opacity: 0}]}></View>
					}
				</View>
			)}
		</ContextoTema.Consumer>
	)
}