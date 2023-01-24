import * as React from 'react';

import { Animated } from 'react-native';

import { Botao } from '../minor/Botao';

const animationDuration = 300

export const TestController = (props) => {
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

	return (
		<Animated.View 
			style={{opacity: Animated.multiply(opacAnim, props.testEnded ? 0 : 1), flexDirection: 'row'}}>
			{((! props.testActive) && 
				<Botao texto="Começar Prova" callback={ () =>{
					blink()
					setTimeout(() => {
						props.setTestActive(true)
						props.timer.unpause(props.timer)
						},animationDuration/2)
				}} />
			)||
			(props.testActive && 
				((! props.paused)  &&
					<Botao texto="Pausar" key='p' args={[props.timer]} 
					callback={(timer) => {
						setTimeout(() => {timer.pause(timer)}, animationDuration/2)
						blink()
					}} />
				)||
				( props.paused &&
				<Botao texto="Retomar" key='unp' args={[props.timer]} 
				callback={(timer) => {
					setTimeout(() => {timer.unpause(timer)}, animationDuration/2)
					blink()
				}} />
				)
			)}
		</Animated.View>
	)
}  