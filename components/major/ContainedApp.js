import * as React from 'react';

import { Dimensions, ScrollView } from 'react-native';

import { HomeScreen } from "./HomeScreen"
import { ProvaScreen } from "./ProvaScreen"

export { ContainedApp as ContainedApp }

function ContainedApp(props) {
	let [scrollable, setScrollable] =  React.useState(false)
	let [refScrollable, setRefScrollable] = React.useState(null)
	let [duracaoProva, setDuracao] = React.useState(0)

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
				proxPagina={ () => {trocarPagina(true,refScrollable)}}
				setDuracao={setDuracao}
			/>
            <ProvaScreen hs={Math.floor(duracaoProva/60)} ms={duracaoProva%60} s={0} a={ () => {trocarPagina(false,refScrollable)}}/>
        </ScrollView>
	);
  }

