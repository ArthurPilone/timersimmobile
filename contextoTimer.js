import * as React from 'react';

import { Timer } from './classes/Timer';

export const ContextoTimer = React.createContext({
	timer: new Timer(0,false),
	setTimer: (x) => {timer = x} ,
});