import * as React from 'react';

import { Text,View } from 'react-native';

import { Logo }  from "../minor/Logo.js"
import { Botao } from '../minor/Botao.js';

import { ContextoTema } from '../../contextoTema';
import { DuracaoPicker } from '../intermediate/DuracaoPicker.js';
import { BotaoDesativavel } from '../minor/BotaoDesativavel.js';

export { HomeScreen as HomeScreen }

function HomeScreen(props) {
	let [tempoProva, setTempoProva] = React.useState(330)

	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={[estilo.container, estilo.page]}>
					<Logo/>
					<Text style={estilo.subtitulo}>Bora fazer uma prova?</Text>
					<DuracaoPicker atualizarTempo={(x) => {
						setTempoProva(x);
						console.log(tempoProva + " minutos de prova")}
					}/>
					<Botao texto='Trocar tema' callback={trocaTema} />
					<BotaoDesativavel texto='Começar Prova!' ativo={tempoProva!=0} callback={props.a} />
				</View>
			)}
		</ContextoTema.Consumer>
	);
  }