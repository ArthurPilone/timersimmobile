import * as React from 'react';

import { InputNumerico } from '../minor/InputNumerico';
import { Text, View } from 'react-native';

import { ContextoTema } from '../../contextoTema';


export const DuracaoPicker = (props) => {

	var [ horas, setHoras ] = React.useState(5);
	var [ minutos, setMinutos ] = React.useState(30);

	return (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
			<View style={estilo.duracaoPicker} >
				<Text style={estilo.subtitulo}>Tempo de Prova</Text>
				<View style={estilo.rowFlex}>
					<InputNumerico initialValue={horas} callback={setHoras} step={1} max={6}/>
					<Text style={[estilo.texto, {marginLeft: 15}]}>Horas e</Text>
				</View>
				<View style={estilo.rowFlex}>
					<InputNumerico initialValue={minutos} callback={setMinutos} step={5} max={55}/>
					<Text style={[estilo.texto, {marginLeft: 15}]}>minutos</Text>
				</View>	
			</View>	
		)}
	</ContextoTema.Consumer>
	)
}  