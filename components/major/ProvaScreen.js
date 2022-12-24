import { Text,View } from 'react-native';

import { ContextoTema } from '../../contextoTema';
import { Botao } from '../minor/Botao';

import { TimerDisplay } from '../intermediate/TimerDisplay';

export { ProvaScreen as ProvaScreen }

function ProvaScreen(props) {
	return (
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={[estilo.container, estilo.page]}>
					<TimerDisplay hs={props.hs} ms={props.ms} s={props.s}/>
					<Botao texto="voltaaa" callback={props.a}></Botao>
				</View>
			)}
		</ContextoTema.Consumer>
	);
  }