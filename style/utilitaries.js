export {fuseStyles};

/**
 *  Auxiliary function used to merge properties assigned to different
 * style classes from different style objects.
 * @param {Object} style1 
 * @param {Object} style2 
 * @returns {Object} composed of style1 plus style2's values in classes
 * common to both styles.
 */
function fuseStyles(style1, style2){
	let saida = {};
	for (let entrada in style1){
		let novaEntrada = {};
		
		for(let chave in style1[entrada]){
			novaEntrada[chave] = style1[entrada][chave];
		}

		if(entrada in style2){
			for (let entradaDOEstilo in style2[entrada]){
				novaEntrada[entradaDOEstilo] = style2[entrada][entradaDOEstilo];
			}
			
		}

		saida[entrada] = novaEntrada;
	}

	return saida;
}
