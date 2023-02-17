import { Pressable } from 'react-native';

import { ContextoTema } from '../../contextoTema';

import { Icon } from './Icon';

export const IconeBotao = (props) => (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
			<Pressable 
				style={[estilo.iconSize,
					{justifyContent:'center',
					alignItems: 'center'},
					props.estiloLayout]
					} 
				onPressIn={() => {props.callback(...props.args)}}>
				<Icon iconImage={props.iconImage}/>
			</Pressable>
		)}
	</ContextoTema.Consumer>
)

IconeBotao.defaultProps = {
	args: [],
	estiloLayout: {},
}