import * as React from 'react';

import { Switch } from 'react-native';

import { ContextoTema } from '../../contextoTema';

export const BooleanInput = (props) => (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
			<Switch
				{...estilo.switch}
				onValueChange={(newValue) => {props.callback(newValue)}}
				value={props.val}
			/>
		)}
	</ContextoTema.Consumer>
)