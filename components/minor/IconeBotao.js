import { Image, Pressable } from 'react-native';

import { ContextoTema } from '../../contextoTema';

const icons = {
	settings: require("../../assets/settingsIcon.png"),
	theme: require("../../assets/theme.png"),
	back: require("../../assets/backIcon.png")  
}

export const IconeBotao = (props) => (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
			<Pressable style={[props.estiloLayout,estilo.iconSize]} onPressIn={() => {props.callback(...props.args)}}>
				<Image source={icons[props.iconImage]} style={{height: '100%', resizeMode: 'contain' }}/>
			</Pressable>
		)}
	</ContextoTema.Consumer>
)

IconeBotao.defaultProps = {
	args: []
}