import { Image } from 'react-native';

import { ContextoTema } from '../../contextoTema';

export const Logo = () => (
	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
		<Image
		source={estilo.subtitulo['color'] == "#fff" ? require('../../assets/TimerSimDark.png') : require('../../assets/TimerSim.png')}
		style={{height: '20%', resizeMode: 'contain' }} />
		)}
	</ContextoTema.Consumer>
)  