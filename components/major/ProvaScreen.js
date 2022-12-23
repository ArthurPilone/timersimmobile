import { Text,View } from 'react-native';

import { ContextoTema } from '../../contextoTema';

export { ProvaScreen as ProvaScreen }

function ProvaScreen(props) {
	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={[estilo.container, estilo.page]}>
					<Text style={estilo.subtitulo}>Prova vem Aqui :) </Text>
				</View>
			)}
		</ContextoTema.Consumer>
	);
  }