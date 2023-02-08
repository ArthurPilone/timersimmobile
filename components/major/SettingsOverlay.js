import * as React from 'react';

import { Text, View, Pressable, Linking } from 'react-native';

import { ContextoTema } from '../../contextoTema';
import { BooleanInput } from '../minor/BooleanInput.js';
import { Botao } from '../minor/Botao';

import { defaultSettings } from '../../classes/StorageManager';
import { testNotificationsManager } from "../../classes/TestNotificationsManager"

export { SettingsOverlay as SettingsOverlay }

function SettingsOverlay(props) {

	if(props.storage == null){return}

	let optionsStorage = props.storage

	let [theme, setTheme] = React.useState(defaultSettings[0])
	let [realistic, setRealistic] = React.useState(defaultSettings[1])
	let [timerHidden, setTimerHidden] = React.useState(defaultSettings[2])
	let [soundsEnabled, setSoundsEnabled] = React.useState(defaultSettings[3])
	let [pushNotif, setPushNotif] = React.useState(defaultSettings[4])

	React.useEffect(() => {
		optionsStorage.getSetting('theme').then((v) => {setTheme(v)})
		optionsStorage.getSetting('realistic').then((v) => {setRealistic(v)})
		optionsStorage.getSetting('timerHidden').then((v) => {setTimerHidden(v)})
		optionsStorage.getSetting('soundsEnabled').then((v) => {setSoundsEnabled(v)})
		optionsStorage.getSetting('pushNotif').then((v) => {
			setPushNotif(v);
			testNotificationsManager.toggleNotifications(v == 't')
		})
    },[])

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
									Fiscal Impreciso
								</Text>
								<Text style={estilo.textoLeve}>
									Pode se atrasar ou adiantar ao retirar uma etiqueta
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
						<View style={estilo.optionsRow}>
							<Text style={estilo.texto}>
								Efeitos Sonoros
							</Text>
							<BooleanInput 
								val={soundsEnabled == 't'}
								callback={
								(v) => {
									let option = v? 't' : 'f'
									setSoundsEnabled(option)
									optionsStorage.saveSetting('soundsEnabled',option)
									props.toggleSoundsCallback(v)
								} }/>
						</View>
						<View style={estilo.optionsRow}>
							<View style={{width:"80%"}}>
								<Text style={estilo.texto}>
									Notificações
								</Text>
								<Pressable onPressIn={() => {Linking.openURL("https://timersim.com")}}>
								<Text style={estilo.textoLeve}>
									Em caso de problemas com notificações, acesse: timersim.com/notificacoes
								</Text>
								</Pressable>		
							</View>
							<BooleanInput 
								val={pushNotif == 't'}
								callback={
								(v) => {
									let option = v? 't' : 'f';
									setPushNotif(option)
									optionsStorage.saveSetting('pushNotif', option)
									testNotificationsManager.toggleNotifications(v)
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