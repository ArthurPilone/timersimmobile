import * as React from 'react';

import { Text,View } from 'react-native';

import { Logo }  from "../minor/Logo.js"
import { Botao } from '../minor/Botao.js';

import { Timer } from '../../classes/Timer.js';

import { ContextoTema } from '../../contextoTema';
import { ContextoTimer } from '../../contextoTimer.js';

import { DuracaoPicker } from '../intermediate/DuracaoPicker.js';
import { BotaoDesativavel } from '../minor/BotaoDesativavel.js';

export { HomeScreen as HomeScreen }

function HomeScreen(props) {
	let [tempoProva, setTempoProva] = React.useState(330)

	return (
		<ContextoTimer.Consumer>
		{({timer,setTimer}) => (
			<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={[estilo.container, estilo.page]}>
					<Logo/>
					<Text style={estilo.subtitulo}>Bora fazer uma prova?</Text>
					<DuracaoPicker atualizarTempo={setTempoProva}/>
					<BotaoDesativavel texto='Nova Prova' ativo={tempoProva!=0}
						callback={async () => {
							timer.free();
							let realista = await(props.storage.getSetting('realistic')) == 't'
							setTimer(new Timer(tempoProva,realista))
							props.newTestCallback()
							setTimeout(() => {props.setTestActive(false)}, 150 )
						}} />
					{props.testActive && 
						<Botao texto='Voltar à Prova' callback={props.returnToTestCallback} />
					}
				</View>
			)}
			</ContextoTema.Consumer>	
		)}
		</ContextoTimer.Consumer>
	);
  }