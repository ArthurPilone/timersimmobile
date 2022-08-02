import { StyleSheet, Dimensions} from 'react-native';

const vh = Dimensions.get('window').height;
const em = 14;

export const styles = StyleSheet.create({
	geral: {
		fontSize: em, 
	},
	
	container: {
	  	flex: 1,
	  	backgroundColor: '#fff',
	  	alignItems: 'center',
	  	justifyContent: 'center',
	},

	etiqueta: {
		height: 2 * em,
		margin: 0.6 * em,
		padding: 0.2 * em,
		borderRadius: 0.2 * em,
		backgroundColor: '#d6ecfa',
	},

	botao: {
		margin: 0.4*em,
		padding: 0.3 * em,
		borderRadius: 0.2 * em,
		borderBottomColor: '#8ccaf3',
		borderBottomWidth: 0.2 * em,
		backgroundColor: '#c3e2f5',
	},

	botaoPressionado: {
		margin: 0.5*em,
		padding: 0.3 * em,
		borderRadius: 0.2 * em,
		backgroundColor: '#c3e2f5',
	},
  });