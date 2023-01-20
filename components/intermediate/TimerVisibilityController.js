import * as React from 'react';

import { Pressable, Text, Image } from 'react-native';

import { ContextoTema } from '../../contextoTema';

const VisibilityIcons = {
	visible: require("../../assets/visible.png"), 
	invisible: require("../../assets/invisible.png"),  
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
				<Image
					style={estilo.iconSize} 
					source={VisibilityIcons[props.timerVisible? "invisible" : "visible"]}
					/>
				<Text style={estilo.texto}>
					{props.timerVisible? "Esconder Tempo de Prova" : "Revelar Tempo de Prova"}
				</Text>
			</Pressable>
		)}
	</ContextoTema.Consumer>
	)
}  