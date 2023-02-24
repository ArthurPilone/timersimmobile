import * as React from 'react';

import { View } from 'react-native';

import { ContextoTema } from '../../contextoTema';
import { IconeBotao } from '../minor/IconeBotao';

import { EtiquetasContainer } from '../intermediate/EtiquetasContainer';
import { TestController } from '../intermediate/TestController';
import { WrappedTimer } from '../intermediate/WrappedTimer';
import { ContextoTimer } from '../../contextoTimer';

export { ProvaScreen as ProvaScreen }

function ContainedProva (props){
	
	let timer = props.timer

	let [timerAvaliable, setTimerAvaliable] = React.useState(true)
	let [nextTestTag, setNextTag] = React.useState(0)

	React.useEffect( () => {
		props.storageManager.getSetting('timerHidden').then((hidden) => {
			setTimerAvaliable(hidden == 'f')
		})
		props.storageManager.subscribeToSettingsChange('cp_th','timerHidden',(newHidden) => {
			let avaliable = newHidden == 'f'
			setTimerAvaliable(avaliable)
			if(avaliable){
				timer.renderersLoaded = false
			}
		})
	},[])

	timer.loadProvaScreenNotifiers(setNextTag,() => {props.setTestEnded(true)})
	timer.loadSoundCallbacks(
		() => {props.soundManager.playSound('desgrudar')},
		() => {props.soundManager.playSound('sirene')})

	return (
		<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
			<View style={[estilo.container, estilo.page]}>
				{timerAvaliable &&
					<WrappedTimer timer={timer} testEnded={props.testEnded} storage={props.storageManager}/>
				}
				<TestController 
					testActive={props.testActive}
					setTestActive={props.setTestActive}
					testEnded={props.testEnded}/>
				<EtiquetasContainer tags={timer.tags} nextTag={nextTestTag}/>
				<IconeBotao 
					estiloLayout={estilo.topLeft}
					iconImage="back" 
					callback={props.return}/>
			</View>
		)}
		</ContextoTema.Consumer>
	)

}

function ProvaScreen(props){
	return (
		<ContextoTimer.Consumer>
		{({timer, setTimer}) => (
			<ContainedProva
			testActive={ props.testActive }
			setTestActive={ props.setTestActive }
			testEnded={ props.testEnded }
			setTestEnded={ props.setTestEnded }
			soundManager={ props.soundManager }
			storageManager = {props.storageManager}
			timerHidden={props.timerHidden}
			return={props.return}
			timer={timer}
			/>
		)}
		</ContextoTimer.Consumer>
	)
  }