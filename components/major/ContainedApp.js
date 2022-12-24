import * as React from 'react';

import { Dimensions, ScrollView } from 'react-native';

import { HomeScreen } from "./HomeScreen"
import { ProvaScreen } from "./ProvaScreen"

export { ContainedApp as ContainedApp }

function ContainedApp(props) {
	let [scrollable, setScrollable] =  React.useState(false);
	
	let [refScrollable, setRefScrollable] = React.useState(null)

	let trocarPagina = (praFrente,scroller) => {
		if(praFrente){
			scroller.scrollTo({x: Dimensions.get('window').width, y: 0, animated: true})
		}else{
			scroller.scrollTo({x: 0, y: 0, animated: true})
		}
	}

	return (
		<ScrollView ref={setRefScrollable} horizontal={true} pagingEnabled scrollEnabled={scrollable}>
            <HomeScreen a={ () => {trocarPagina(true,refScrollable)}}/>
            <ProvaScreen a={ () => {trocarPagina(false,refScrollable)}}/>
        </ScrollView>
	);
  }

