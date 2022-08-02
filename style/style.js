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
	}
  });