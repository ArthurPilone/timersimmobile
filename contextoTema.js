import * as React from 'react';

import { lightStyle } from "./style/style.js"

export const ContextoTema = React.createContext({
	estilo: lightStyle,
	trocaTema: () => {
		console.log("Tentou trocar o tema sem um provider acima !")
	}
});