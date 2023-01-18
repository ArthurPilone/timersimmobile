import * as React from 'react';

import { Dimensions, ScrollView } from 'react-native';

import { ContextoTema } from '../../contextoTema';

import { HomeScreen } from "./HomeScreen"
import { ProvaScreen } from "./ProvaScreen"

import { IconeBotao } from "../minor/IconeBotao"

import { Timer } from '../../classes/Timer';
import { SettingsOverlay } from './SettingsOverlay';

export { ContainedApp as ContainedApp }

function ContainedApp(props) {
	let [scrollable, setScrollable] =  React.useState(false)
	let [previouslyScrollable, setPreviouslyScrollable] =  React.useState(false)
	let [refScrollable, setRefScrollable] = React.useState(null)

	let [timer, setTimer] = React.useState(new Timer(0))

	let [testActive, setTestActive] = React.useState(false)

	let [settingsOverlayed, toggleSettings] = React.useState(false)

	let storage = props.storageManager

	let trocarPagina = (praFrente,scroller) => {
		if(praFrente){
			scroller.scrollTo({x: Dimensions.get('window').width, y: 0, animated: true})
		}else{
			scroller.scrollTo({x: 0, y: 0, animated: true})
		}
	}

	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
			<ScrollView ref={setRefScrollable} horizontal={true} pagingEnabled scrollEnabled={scrollable}>
				{settingsOverlayed && 
					<SettingsOverlay 
						style={estilo.topLeft} 
						storage={storage} 
						saveAndQuit={() => {toggleSettings(false);setScrollable(previouslyScrollable)} }/>}
				<HomeScreen 
					criaTimer={ (duracao) => {
						timer.free();
						setScrollable(true);
						setTimer(new Timer(duracao))}
					}
					testActive={ testActive }
					setTestActive={ setTestActive }
					proxPagina={ () => {trocarPagina(true,refScrollable)}}
				/>
				<ProvaScreen 
					timerProva={ timer } 
					testActive={ testActive }
					setTestActive={ setTestActive }
					storage={ storage }
					return={ () => {trocarPagina(false,refScrollable)}}/>
				{settingsOverlayed || <IconeBotao 
					estiloLayout={estilo.topLeft}
					iconImage="settings" 
					callback={() => {
						toggleSettings(true);
						setPreviouslyScrollable(scrollable);
						setScrollable(false)}}/>}
			</ScrollView> )}
		</ContextoTema.Consumer>
	);
  }

