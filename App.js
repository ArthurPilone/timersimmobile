import * as React from 'react';

import { lightStyle, darkStyle } from "./style/style.js"

import { ContextoTema } from "./contextoTema.js"

import { ContainedApp } from './components/major/ContainedApp.js';

export default function App() {
    let [estiloApp, settaTemaApp] = React.useState(lightStyle);

    function trocaTemaAPP(){
        if(estiloApp == lightStyle){
            settaTemaApp(darkStyle);
            return "d";
        }else{
            settaTemaApp(lightStyle);
            return "l";
        }
    }

    return (
        <ContextoTema.Provider value={{
            estilo: estiloApp,
            trocaTema: trocaTemaAPP}}>
            <ContainedApp/>
        </ContextoTema.Provider>
    );
}
