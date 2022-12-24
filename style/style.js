import { StyleSheet, Dimensions } from 'react-native';
import { lightColors, darkColors } from './colorPalletes.js';
import { fuseStyles } from './utilitaries.js' ;

const vh = Dimensions.get('window').height/100;
const vw = Dimensions.get('window').width/100;
const em = 14;

const styleComum = StyleSheet.create({
	texto: {
		fontSize: em, 
	},

	subtitulo: {
		fontSize: 1.3*em,
		fontWeight: 'bold',
		margin: 0.4 * em,
	},

	tempoProva: {
		fontSize: 2.3*em,
		margin: 0.5 * em,
		marginTop: 0,
	},

	duracaoPicker: {
		height: 25 * vh,
		width: 80 * vw,
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 1 * em,
		borderWidth: 0.3*em,
		borderRadius: 1 * em,
	},

	timerDisplay: {
		height: 15 * vh,
		width: 60 * vw,
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 0.8 * em,
		borderWidth: 0.3*em,
		borderRadius: 1 * em,
	},

	container: {
	  	flex: 1,
	  	alignItems: 'center',
	  	justifyContent: 'center',
	},

	rowFlex: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},

	etiqueta: {
		height: 2 * em,
		margin: 0.6 * em,
		padding: 0.2 * em,
		borderRadius: 0.2 * em,
	},

	botao: {
		margin: 0.4*em,
		padding: 0.3 * em,
		borderRadius: 0.2 * em,
		borderBottomWidth: 0.2 * em,
	},

	botaoPressionado: {
		margin: 0.5*em,
		padding: 0.3 * em,
		borderRadius: 0.2 * em,
	},

	page:{
		flex: 1,
		width: 100*vw,
		minHeight: 100*vh,
	},

  });

/**
 * Creates a new Style object based on a given color pallete
 * @param {Object} cores object containing the colors to be used
 * @returns {Object} style object
 */
 function mountPallete(cores){
	return StyleSheet.create({
		texto: {
			color: cores.corFontePrincipal,
		},

		subtitulo: {
			color: cores.corFonteRealce,
		},

		tempoProva: {
			color: cores.corFonteRealce,
		},

		container: {
			backgroundColor: cores.fundoPrimario,
		},
	
		duracaoPicker: {
			borderColor: cores.borders,
			backgroundColor: cores.fundoSecundarioHover,
		},

		timerDisplay: {
			borderColor: cores.borders,
			backgroundColor: cores.fundoSecundarioHover,
		},

		etiqueta: {
			backgroundColor: cores.fundoSecundarioHover,
		},
	
		botao: {
			borderBottomColor: cores.borders,
			backgroundColor: cores.fundoSecundario,
		},
	
		botaoPressionado: {
			backgroundColor: cores.fundoSecundario,
		},
	});
};

const lightPallete = mountPallete(lightColors);
const darkPallete = mountPallete(darkColors);

const lightStyle = fuseStyles(styleComum,lightPallete);
const darkStyle = fuseStyles(styleComum,darkPallete)

export {lightStyle, darkStyle};