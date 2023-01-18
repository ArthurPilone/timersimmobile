import { Image, Pressable } from 'react-native';

import { ContextoTema } from '../../contextoTema';

const icons = {
	settings: require("../../assets/settingsIcon.png"),
	theme: require("../../assets/theme.png"),
	back: require("../../assets/backIcon.png"),
	visible: require("../../assets/visible.png"), 
	invisible: require("../../assets/invisible.png"),  
}

export const IconeBotao = (props) => (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
			<Pressable 
				style={[props.estiloLayout,estilo.iconSize,
					{justifyContent:'center',
					alignItems: 'center'}]
					} 
				onPressIn={() => {props.callback(...props.args)}}>
				<Image source={icons[props.iconImage]} style={{width: '100%', resizeMode: 'contain' }}/>
			</Pressable>
		)}
	</ContextoTema.Consumer>
)

IconeBotao.defaultProps = {
	args: []
}