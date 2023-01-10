import * as React from 'react';

import { Dimensions, ScrollView } from 'react-native';

import { HomeScreen } from "./HomeScreen"
import { ProvaScreen } from "./ProvaScreen"

import { Timer } from '../../classes/Timer';

export { ContainedApp as ContainedApp }

function ContainedApp(props) {
	let [scrollable, setScrollable] =  React.useState(false)
	let [refScrollable, setRefScrollable] = React.useState(null)

	let [timer, setTimer] = React.useState(new Timer(0))

	let [testActive, setTestActive] =  React.useState(false)

	let trocarPagina = (praFrente,scroller) => {
		if(praFrente){
			scroller.scrollTo({x: Dimensions.get('window').width, y: 0, animated: true})
		}else{
			scroller.scrollTo({x: 0, y: 0, animated: true})
		}
	}

	return (
		<ScrollView ref={setRefScrollable} horizontal={true} pagingEnabled scrollEnabled={scrollable}>
            <HomeScreen 
				criaTimer={ (duracao) => {timer.free();setScrollable(true);setTimer(new Timer(duracao))}}
				testActive={ testActive }
				setTestActive={ setTestActive }
				proxPagina={ () => {trocarPagina(true,refScrollable)}}
			/>
            <ProvaScreen 
				timerProva={ timer } 
				testActive={ testActive }
				setTestActive={ setTestActive }
				a={ () => {trocarPagina(false,refScrollable)}}/>
        </ScrollView>
	);
  }

