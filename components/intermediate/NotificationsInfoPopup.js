import * as React from 'react';

import { Text, View, Pressable, Linking } from 'react-native';

import { Botao } from '../minor/Botao';

import { ContextoTema } from '../../contextoTema';

export const NotificationsInfoPopup = (props) => {

	return (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
			<View style={[estilo.card, estilo.alert]} >
				<Text style={estilo.subtitulo}>Atenção!</Text>
				<Text style={[estilo.texto, {textAlign: 'justify'}]}>Em alguns dispositivos Android, o sistema operacional impõe, por padrão, otimizações de bateria sobre o aplicativo que quebram as notificações. Se você notar que as notificações do TimerSim não estão sendo disparadas na hora certa, desabilite as otimizações de energia para o aplicativo nas configurações do seu dispositivo.</Text>
				<Pressable onPressIn={() => {Linking.openURL("https://timersim.com/notificacoes.html")}}>
				<Text style={estilo.texto}>Para mais informações, acesse timersim.com/notificacoes.html</Text>
				</Pressable>
				<Botao callback={props.ackCallback} texto={"Entendi"}/>
			</View>	
		)}
	</ContextoTema.Consumer>
	)

}  