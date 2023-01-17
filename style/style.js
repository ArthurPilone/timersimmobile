import { StyleSheet, Dimensions } from 'react-native';
import { lightColors, darkColors } from './colorPalletes.js';
import { fuseStyles } from './utilitaries.js' ;

const vh = Dimensions.get('window').height/100;
const vw = Dimensions.get('window').width/100;
const em = 14;

const styleComum = StyleSheet.create({
	textoLeve: {
		fontSize: em, 
	},

	texto: {
		fontSize: em, 
	},

	subtitulo: {
		fontSize: 1.3*em,
		fontWeight: 'bold',
		margin: 0.4 * em,
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

	card: {
		alignItems: 'center',
		justifyContent: 'space-between',
		borderWidth: 0.3*em,
		borderRadius: 1 * em,
		padding: 1 * em,
	},

	tempoProva: {
		fontSize: 2.3*em,
		margin: 0.5 * em,
		marginTop: 0,
	},

	duracaoPicker: {
		height: 25 * vh,
		width: 80 * vw,
	},

	timerDisplay: {
		height: 15 * vh,
		width: 60 * vw,
		padding: 0.8 * em,
	},

	settingsOverlay: {
		width: 70 * vw,
	},

	backOverlayed: {
	},

	optionsRow: {
		width: '90%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	switch: {
	},

	etiqueta: {
		height: 2.2 * em,
		width: 4.5 * em,
		margin: 0.6 * em,
		padding: 0.1 * em,
		borderRadius: 0.2 * em,
		borderWidth: 0.2 * em,
		textAlign: 'center',
	},

	etiquetaRemovida: {
		height: 2.2 * em,
		width: 4.5 * em,
		margin: 0.6 * em,
		padding: 0.3 * em,
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

	topLeft:{
		position: 'absolute',
		top: 1.5*em,
		left: 1.5*em,
	},

	topRight:{
		position: 'absolute',
		top: 2*em,
		right: 1.5*em,
	},

	iconSize:{
		width: 2.2*em,
		height: 2.2*em,
	},	

  });

/**
 * Creates a new Style object based on a given color pallete
 * @param {Object} cores object containing the colors to be used
 * @returns {Object} style object
 */
 function mountPallete(cores){
	return StyleSheet.create({
		textoLeve: {
			color: cores.corFonteSutil
		},

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

		card: {
			borderColor: cores.borders,
			backgroundColor: cores.fundoSecundarioHover,
		},

		backOverlayed: {
			backgroundColor: cores.fundoSobreposto
		},

		switch: {
			trackColor: {
				false: cores.corFonteSutil, 
				true: cores.borders},
			thumbColor: cores.borders,
			ios_backgroundColor: cores.fundoSecundario
		},

		etiqueta: {
			backgroundColor: cores.fundoSecundarioHover,
			borderColor: cores.fundoSecundario,
		},

		etiquetaRemovida: {
			backgroundColor: cores.etiquetaSumiu,
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