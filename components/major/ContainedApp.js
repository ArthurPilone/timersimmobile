import * as React from 'react';

import { View, Dimensions, ScrollView, Platform } from 'react-native';

import { ContextoTema } from '../../contextoTema';

import { HomeScreen } from "./HomeScreen"
import { ProvaScreen } from "./ProvaScreen"
import { SettingsOverlay } from './SettingsOverlay';

import { IconeBotao } from "../minor/IconeBotao"

import { NotificationsInfoPopup } from '../intermediate/NotificationsInfoPopup';

export { ContainedApp as ContainedApp }

function ContainedApp(props) {

	if(! props.loaded){return}
	let storage = props.storageManager

	let [testActive, setTestActiveVal] = React.useState(storage.getPreviousStateValue('testActive') == 't')
	let [testEnded, setTestEndedVal] = React.useState(storage.getPreviousStateValue('testEnded') == 't')

	let refScrollable = React.useRef(null)
	let [scrollable, setScrollable] =  React.useState(testActive || testEnded)
	let [previouslyScrollable, setPreviouslyScrollable] =  React.useState(scrollable)

	let [overlayActive, toggleOverlay] = React.useState(false)
	let [settingsOverlayed, toggleSettings] = React.useState(false)
	let [notificationsWarningOverlayed, toggleNotificationsWarning] = React.useState(false)

	let setTestActive = (v) => {
		setTestActiveVal(v);
		let val = v ? 't' : 'f'
		storage.updateStateVariable('testActive',val)}

	let setTestEnded = (v) => {
		setTestEndedVal(v);
		let val = v ? 't' : 'f'
		storage.updateStateVariable('testEnded',val)}

	let trocarPagina = (praFrente,scrollerRef) => {
		if(praFrente){
			storage.updateStateVariable('atTestScreen','t')
			scrollerRef.current.scrollTo({x: Dimensions.get('window').width, y: 0, animated: true})
		}else{
			storage.updateStateVariable('atTestScreen','f')
			scrollerRef.current.scrollTo({x: 0, y: 0, animated: true})
		}
	}

	React.useEffect(() => {
		if((storage.getPreviousStateValue('atTestScreen')) == 't'){
			refScrollable.current.scrollTo({x: Dimensions.get('window').width, y: 0, animated: true})
		}
		storage.loadSetting('warnedNotif').then((v) => {
			if(v == 'f' && Platform.OS == 'android'){
				toggleNotificationsWarning(true)
				toggleOverlay(true)
			}
		})
	},[props.loaded])

	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
			<ScrollView ref={refScrollable} horizontal={true} pagingEnabled scrollEnabled={scrollable}>
				<HomeScreen
					newTestCallback= {() => {
						setScrollable(true)
						setTestEnded(false)
						trocarPagina(true,refScrollable)
					}}
					returnToTestCallback= { () => {trocarPagina(true,refScrollable)}} 
					storage={ storage }
					testActive={ testActive }
					setTestActive={ setTestActive }
					setTestEnded={ setTestEnded }
				/>
				<ProvaScreen
					testActive={ testActive }
					setTestActive={ setTestActive }
					testEnded={ testEnded }
					setTestEnded={ setTestEnded }
					soundManager={ props.soundManager }
					storageManager = {storage}
					timerHidden={ 
						storage ? storage.getSetting("timerHidden") : 'f' }
					return={ () => {trocarPagina(false,refScrollable)}}/>
				{overlayActive || <IconeBotao 
					estiloLayout={estilo.topLeft}
					iconImage="settings" 
					callback={() => {
						toggleOverlay(true);
						toggleSettings(true);
						setPreviouslyScrollable(scrollable);
						setScrollable(false)}}/>}
				{overlayActive &&
					<View style={[estilo.page, {position: 'absolute', top: 0, left: 0, alignItems: 'center',
					justifyContent: 'center',backgroundColor: '#000000c0', zIndex: 2, elevation: 2 }]}>
						{settingsOverlayed && 
							<SettingsOverlay 
								style={estilo.topLeft} 
								storage={storage} 
								saveAndQuit={() => {
									toggleOverlay(false);
									toggleSettings(false);
									setScrollable(previouslyScrollable);
									} }
								toggleSoundsCallback={(v) => {props.soundManager.setSoundsEnabled(v)}}
							/>
						}
						{notificationsWarningOverlayed &&
							<NotificationsInfoPopup 
								ackCallback={() => {
									toggleOverlay(false)
									toggleNotificationsWarning(false)
									storage.saveSetting('warnedNotif','t')
								}}/>
						}
					</View>
				}
			</ScrollView> )}
		</ContextoTema.Consumer>
	);
  }

