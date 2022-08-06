import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { lightStyle, darkStyle } from "./style/style.js"

import { HomeScreen } from "./components/major/HomeScreen.js"

import { ContextoTema } from "./contextoTema.js"

const Stack = createNativeStackNavigator();

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
        <NavigationContainer>
            <ContextoTema.Provider value={{
				estilo: estiloApp,
                trocaTema: trocaTemaAPP}}>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </ContextoTema.Provider>
        </NavigationContainer>
    );
}
