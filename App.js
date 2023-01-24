import * as React from 'react';

import { lightStyle, darkStyle } from "./style/style.js"

import { ContextoTema } from "./contextoTema.js"

import { ContainedApp } from './components/major/ContainedApp.js';

import { StorageManager } from './classes/StorageManager.js';

import { StatusBar } from 'react-native';

export default function App() {
    
    let [storageManager, setStorage] = React.useState(null)
    let [estiloApp, settaTemaApp] = React.useState(lightStyle);
    let [conteudoBarra, setConteudoBarra] = React.useState('dark-content'); 

    let trocaTemaAPP = (val) => {
        if(val == 'd'){
            settaTemaApp(darkStyle);
            setConteudoBarra('light-content');
            return "d";
        }else{
            settaTemaApp(lightStyle);
            setConteudoBarra('dark-content');
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
            <StatusBar backgroundColor={estiloApp.card.backgroundColor} barStyle={conteudoBarra}/>
        </ContextoTema.Provider>
    );
}
