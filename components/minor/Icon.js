import { Image } from 'react-native';

import { ContextoTema } from '../../contextoTema';

const icons = {
	visible: require("../../assets/visible.png"),
	invisible: require("../../assets/invisible.png"),
	settings: require("../../assets/settingsIcon.png"),
	back: require("../../assets/backIcon.png"),
	plus: require("../../assets/plus.png"),
	minus: require("../../assets/minus.png"),
}

const darkIcons = {
	visible: require("../../assets/visibleDark.png"),
	invisible: require("../../assets/invisibleDark.png"),
	settings: require("../../assets/settingsIconDark.png"),
	back: require("../../assets/backIconDark.png"),
	plus: require("../../assets/plusDark.png"),
	minus: require("../../assets/minusDark.png"),
}

export const Icon = (props) => (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => {
			return(
				<Image 
					source={
						estilo.subtitulo['color'] == "#fff" ? 
						darkIcons[props.iconImage] :
						icons[props.iconImage]}    
					style={props.overwriteSizeStyle ? props.sizeStyle : estilo.iconSize}/>
			)
		}}
	</ContextoTema.Consumer>
)

Icon.defaultProps = {
	overwriteSizeStyle: false,
	sizeStyle: {}
}