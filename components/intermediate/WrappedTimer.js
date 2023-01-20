import * as React from 'react';

import { ContextoTema } from '../../contextoTema';

import { Easing, Animated, View } from 'react-native';
import { TimerVisibilityController } from './TimerVisibilityController';
import { TimerDisplay } from './TimerDisplay';

const animationDuration = 400

export const WrappedTimer = (props) => {

	let [timerVisible, setTimerVisible] = React.useState(true)

	let timer = props.timer

	let [provaS, setSValue] = React.useState(timer.getS())
	let [provaM, setMValue] = React.useState(timer.getM())
	let [provaH, setHValue] = React.useState(timer.getH())

	timer.loadTimerRenderers(setSValue,setMValue,setHValue, 
		() => {setTimerVisible(true)})

	const opacAnim = React.useRef(new Animated.Value(1)).current;

	const blink = () => {
		Animated.sequence([
			Animated.timing(opacAnim, {
				toValue: 0,
				duration: animationDuration/2,
				useNativeDriver: true,
			})
			,
			Animated.timing(opacAnim, {
				toValue: 1,
				duration: animationDuration/2,
				useNativeDriver: true,
			})
		]).start();
	};

	return(
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<Animated.View style={[estilo.container,
					{width: "60%",
					opacity: opacAnim
					}]} >
					<TimerVisibilityController timerVisible={timerVisible} 
					toggleVisibility={() => {
						setTimeout(() => {setTimerVisible(!timerVisible)},(animationDuration/2))
						blink()}}/>
					{timerVisible &&
						<TimerDisplay hs={provaH} ms={provaM} s={provaS}/>}
					{! timerVisible &&
						<View style={[estilo.timerDisplay,{opacity: 0}]}></View>
					}
				</Animated.View>
			)}
		</ContextoTema.Consumer>
	)
}