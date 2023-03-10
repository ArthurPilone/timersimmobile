import * as React from 'react';

import { Pressable, Text, Image } from 'react-native';

import { ContextoTema } from '../../contextoTema';
import { Icon } from '../minor/Icon';

const VisibilityIcons = {
	visible: require("../../assets/visible.png"), 
	visibleDark: require("../../assets/visibleDark.png"), 
	invisible: require("../../assets/invisible.png"), 
	invisibleDark: require("../../assets/invisibleDark.png"),  
}

export const TimerVisibilityController = (props) => {
	return (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
			<Pressable 
				style={{
					flexDirection: 'row',
					justifyContent: 'space-around',
					alignItems: 'center',
					width: "90%"
				}}
				onPressIn={props.toggleVisibility}>
				<Icon iconImage={props.timerVisible? "invisible" : "visible"} />
				<Text style={estilo.texto}>
					{props.timerVisible? "Esconder Tempo de Prova" : "Revelar Tempo de Prova"}
				</Text>
			</Pressable>
		)}
	</ContextoTema.Consumer>
	)
}  