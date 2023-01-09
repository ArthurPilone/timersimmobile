import * as React from 'react';

import { View } from 'react-native';

import { Etiqueta } from '../minor/Etiqueta';

import { ContextoTema } from '../../contextoTema';


export const EtiquetasContainer = (props) => {

	let tags = props.tags

	let renderedTags = tags.map((tagTime,index) => {
		let thisM = tagTime % 60
		let thisH = (tagTime - thisM) / 60 
		return (<Etiqueta key={index} removida={index < props.nextTag} h={thisH} m={thisM}/>)
	})

	let groupedTags = []

	for (i = 0; i < renderedTags.length; i+= 2){
		if(i + 1 < renderedTags.length){
			groupedTags.push(
				<View key={i} style={{flexDirection: 'row'}}>
					{renderedTags[i]}
					{renderedTags[i+1]}
				</View>
			)
		}else{
			groupedTags.push(
				<View key={i} style={{flexDirection: 'row'}}>
					{renderedTags[i]}
				</View>
			)
		}
	}

	return (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => {
			return (
				<View>
					{groupedTags}
				</View>
			)
		}}
	</ContextoTema.Consumer>
	)
}  