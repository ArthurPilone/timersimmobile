import * as React from 'react';

import { ScrollView } from 'react-native';

import { HomeScreen } from "./HomeScreen"
import { ProvaScreen } from "./ProvaScreen"

export { ContainedApp as ContainedApp }

function ContainedApp(props) {
	let [scrollable, setScrollable] =  React.useState(false);
	
	let refScrollable = React.createRef()

	let trocarPagina = (praFrente) => {
		if(praFrente){
			refScrollable.current.scrollTo({x: 500, y: 0, animated: true})
		}else{
			refScrollable.current.scrollTo({x: 0, y: 0, animated: true})
		}
	}

	return (
		<ScrollView ref={refScrollable} horizontal={true} pagingEnabled scrollEnabled={scrollable}>
            <HomeScreen a={ () => {trocarPagina(true,refScrollable.current)}}/>
            <ProvaScreen/>
        </ScrollView>
	);
  }

