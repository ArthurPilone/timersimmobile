import * as React from 'react';

import { Pressable, Text } from 'react-native';

import { styles } from "../../style/style.js"

export const Botao = (props) => {

	var [ pressionado, setPressionado ] = React.useState(false);

	var propiedades = {
		style: pressionado ? styles.botaoPressionado : styles.botao, 
		onPressIn: () => {setPressionado(true);props.callback()},  
		onPressOut: () => setPressionado(false),           
	};

	return (
	<Pressable {...propiedades} >
		<Text>{props.texto}</Text>
	</Pressable>)
	}  