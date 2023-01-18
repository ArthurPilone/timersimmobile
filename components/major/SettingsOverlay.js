import * as React from 'react';

import { Text,View } from 'react-native';

import { ContextoTema } from '../../contextoTema';
import { BooleanInput } from '../minor/BooleanInput.js';
import { Botao } from '../minor/Botao';

export { SettingsOverlay as SettingsOverlay }

function SettingsOverlay(props) {

	if(props.storage == null){return}

	let optionsStorage = props.storage

	let [theme, setTheme] =  React.useState(optionsStorage.getSetting('theme'))
	let [realistic, setRealistic] =  React.useState(optionsStorage.getSetting('realistic'))
	let [timerHidden, setTimerHidden] =  React.useState(optionsStorage.getSetting('timerHidden'))
	let [sounds, setSounds] =  React.useState(optionsStorage.getSetting('sounds'))
	let [pushNotif, setPushNotif] =  React.useState(optionsStorage.getSetting('pushNotif'))

	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={[estilo.container, estilo.page, estilo.backOverlayed]}>
					<View style={[estilo.card,estilo.settingsOverlay]}>
						<Text style={estilo.subtitulo}>Opções</Text>
						<View style={estilo.optionsRow}>
							<Text style={estilo.texto}>
								Tema escuro
							</Text>
							<BooleanInput 
								val={theme == 'd'}
								callback={
								(v) => {
									let option = v? 'd' : 'l'
									setTheme(option)
									optionsStorage.saveSetting('theme',option)
									trocaTema(option)
								} }/>
						</View>
						<View style={estilo.optionsRow}>
						<View style={{width:"80%"}}>
								<Text style={estilo.texto}>
									Fiscal Realista
								</Text>
								<Text style={estilo.textoLeve}>
									Pode se atrasar ao retirar uma etiqueta
								</Text>
							</View>
							<BooleanInput 
								val={realistic == 't'}
								callback={
								(v) => {
									let option = v? 't' : 'f';
									setRealistic(option)
									optionsStorage.saveSetting('realistic',option)
								} }/>
						</View>
						<View style={estilo.optionsRow}>
							<View style={{width:"80%"}}>
								<Text style={estilo.texto}>
									Esconder Tempo de Prova
								</Text>
								<Text style={estilo.textoLeve}>
									Você só terá as etiquetas para se orientar!
								</Text>
							</View>
							<BooleanInput 
								val={timerHidden == 't'}
								callback={
								(v) => {
									let option = v? 't' : 'f';
									setTimerHidden(option)
									optionsStorage.saveSetting('timerHidden',option)
								} }/>
						</View>
						<Botao texto="Salvar Mudanças" callback={props.saveAndQuit}/>
						<Text style={[estilo.textoLeve, {textAlign: 'center'}]}> Alterações feitas só serão aplicadas a partir da próxima prova!!</Text>
					</View>
				</View>
			)}
		</ContextoTema.Consumer>
	);
  }