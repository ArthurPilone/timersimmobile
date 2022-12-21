import NumericInput from 'react-native-numeric-input'

import { ContextoTema } from '../../contextoTema';

export const InputNumerico = (props) => (

	<ContextoTema.Consumer>
		{({estilo, trocaTema}) => (
			<NumericInput
				onChange={props.callback} 
				textColor={estilo.texto.color}
				rightButtonBackgroundColor={estilo.botao.backgroundColor}
				leftButtonBackgroundColor={estilo.botao.backgroundColor}
				borderColor={estilo.botao.borderBottomColor}
				iconStyle={{color:estilo.texto.color}}
				value={props.initialValue}
				rounded step={props.step} minValue={0} maxValue={props.max} />
		)}
	</ContextoTema.Consumer>
)  