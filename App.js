import * as React from 'react';

import { lightStyle, darkStyle } from "./style/style.js"

import { ContextoTema } from "./contextoTema.js"
import { ContextoTimer } from './contextoTimer';

import { ContainedApp } from './components/major/ContainedApp.js';

import { StorageManager } from './classes/StorageManager.js';
import { SoundManager } from './classes/SoundManager.js';
import { Timer } from './classes/Timer.js';

import { AppState, StatusBar } from 'react-native';

export default function App() {
    
    let [storageManager, setStorage] = React.useState(new StorageManager())
    let [soundManager, setSoundManager] = React.useState(new SoundManager())
    let [estiloApp, settaTemaApp] = React.useState(lightStyle);
    let [timerApp, settaTimerApp] = React.useState(new Timer(0,false))
    let [conteudoBarra, setConteudoBarra] = React.useState('dark-content'); 

    let [valuesLoaded, setValuesLoaded] = React.useState(false)

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

    let saveState = async (proximoEstado) => {
		if(proximoEstado != 'background' && proximoEstado != 'inactive'){
			return
		}

        storageManager.updateStateVariable('timerState',timerApp.exportTimerState())

		await storageManager.saveState()
	}

    React.useEffect(() => {

        let sm = storageManager;

        let loadValues = async () =>{
            await sm.loadAll()

            let newTimer = new Timer(0,false)

            newTimer.reloadTimer(sm.getPreviousStateValue('timerState'))

            settaTimerApp(newTimer)

            sm.getSetting('theme').then((v) => {
                let estiloInicial = (v == "l") ? lightStyle : darkStyle;
                settaTemaApp(estiloInicial)
            })

            setValuesLoaded(true)
        }

        loadValues()

    },[])

    React.useEffect(() => {
        AppState.addEventListener('change', saveState);
        storageManager.subscribeToSettingsChange('app','pushNotif',(v) => {
            if(v == 't'){
                timerApp.createScheduledNotifications()
            }}
        )
    })

    return (
        <ContextoTema.Provider value={{
            estilo: estiloApp,
            trocaTema: trocaTemaAPP}}
        >
        <ContextoTimer.Provider value={{
            timer: timerApp,
            setTimer: settaTimerApp, 
        }}>
            <ContainedApp loaded={valuesLoaded} storageManager={storageManager} soundManager={soundManager}/>
            <StatusBar backgroundColor={estiloApp.card.backgroundColor} barStyle={conteudoBarra}/>
        </ContextoTimer.Provider>
        </ContextoTema.Provider>
    );
}
