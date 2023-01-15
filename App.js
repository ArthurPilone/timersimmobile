import * as React from 'react';

import { lightStyle, darkStyle } from "./style/style.js"

import { ContextoTema } from "./contextoTema.js"

import { ContainedApp } from './components/major/ContainedApp.js';

import { StorageManager } from './classes/StorageManager.js';

export default function App() {
    
    let [storageManager, setStorage] = React.useState(null)
    let [estiloApp, settaTemaApp] = React.useState(lightStyle);

    let trocaTemaAPP = () => {
        if(estiloApp == lightStyle){
            settaTemaApp(darkStyle);
            storageManager.saveSetting('theme',"d")
            return "d";
        }else{
            settaTemaApp(lightStyle);
            storageManager.saveSetting('theme',"l")
            return "l";
        }
    }

    React.useEffect( () => {

        let sm = new StorageManager()

        setStorage(sm)
        let estiloInicial = sm.getSetting('theme')

        estiloInicial = (estiloInicial == "l") ? lightStyle : darkStyle;

        settaTemaApp(estiloInicial)
        
    },[])

    return (
        <ContextoTema.Provider value={{
            estilo: estiloApp,
            trocaTema: trocaTemaAPP}}>
            <ContainedApp storageManager={storageManager}/>
        </ContextoTema.Provider>
    );
}
