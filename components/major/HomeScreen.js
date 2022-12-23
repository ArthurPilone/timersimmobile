import { Text,View } from 'react-native';

import { Logo }  from "../minor/Logo.js"
import { Botao } from '../minor/Botao.js';

import { ContextoTema } from '../../contextoTema';
import { DuracaoPicker } from '../intermediate/DuracaoPicker.js';

export { HomeScreen as HomeScreen }

function HomeScreen(props) {
	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={[estilo.container, estilo.page]}>
					<Logo/>
					<Text style={estilo.subtitulo}>Bora fazer uma prova?</Text>
					<DuracaoPicker/>
					<Botao texto='Aperte me' callback={ () => {
						trocaTema();
					}} />
					<Botao texto='Prova' callback={props.a} />
				</View>
			)}
		</ContextoTema.Consumer>
	);
  }