import * as React from 'react';
import { Text, View } from 'react-native';

import { ContextoTema } from '../../contextoTema';
import { IconeBotao } from './IconeBotao';

export const InputNumerico = (props) => {

	let [value, setValue] = React.useState(props.initialValue)

	let updateValue = (newVal) => {
		if(newVal < 0 || newVal > props.max){
			return
		}
		setValue(newVal)
		props.callback(newVal)
	}

	let decrement = () => {updateValue(value - props.step)}
	let increment = () => {updateValue(value + props.step)}

	return (	
		<ContextoTema.Consumer>
			{({estilo, trocaTema}) => (
				<View style={estilo.numericInput}>
					<View 
						style= {{
							height: '100%',
							width: (estilo.numericInput.width - 2*estilo.numericInput.borderWidth) / 3,
							borderRightColor: estilo.numericInput.borderColor,
							borderRightWidth: estilo.numericInput.borderWidth,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<IconeBotao iconImage='minus' callback={decrement} />
					</View>
					<Text style={[estilo.texto, 
						{textAlign: 'center',
						fontSize: estilo.subtitulo.fontSize,
						margin: 0,
						width: (estilo.numericInput.width - 2*estilo.numericInput.borderWidth) / 3,}]}
					> {value}
					</Text>
					<View 
						style= {{
							height: '100%',
							width: (estilo.numericInput.width - 2*estilo.numericInput.borderWidth) / 3,
							borderLeftColor: estilo.numericInput.borderColor,
							borderLeftWidth: estilo.numericInput.borderWidth,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<IconeBotao iconImage='plus' callback={increment} />
					</View>
				</View>
				// <NumericInput
				// 	onChange={props.callback} 
				// 	textColor={estilo.texto.color}
				// 	rightButtonBackgroundColor={estilo.botao.backgroundColor}
				// 	leftButtonBackgroundColor={estilo.botao.backgroundColor}
				// 	borderColor={estilo.botao.borderBottomColor}
				// 	iconStyle={{color:estilo.texto.color}}
				// 	//value={props.initialValue}
				// 	rounded step={props.step} minValue={0} maxValue={props.max} />
			)}
		</ContextoTema.Consumer>
	)
} 