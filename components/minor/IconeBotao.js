import { Image, Pressable } from 'react-native';

import { ContextoTema } from '../../contextoTema';

const icons = {
	settings: require("../../assets/settingsIcon.png"),
	back: require("../../assets/backIcon.png"),
}

const darkIcons = {
	settings: require("../../assets/settingsIconDark.png"),
	back: require("../../assets/backIconDark.png"),
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
				<Image 
					source={
						estilo.subtitulo['color'] == "#fff" ? 
						darkIcons[props.iconImage] : 
						icons[props.iconImage]}    
					style={{width: '100%', resizeMode: 'contain' }}/>
			</Pressable>
		)}
	</ContextoTema.Consumer>
)

IconeBotao.defaultProps = {
	args: []
}