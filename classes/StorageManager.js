import AsyncStorage from '@react-native-async-storage/async-storage';

export {StorageManager as StorageManager, defaultSettings}

const settings = ['theme', 'timerHidden', 'realistic', 'soundsEnabled','pushNotif','warnedNotif']
const defaultSettings = ['l','f','f','t','t','f']

const stateVariables = ['testActive','testEnded','timerState','timerVisible','atTestScreen']
const initialStateVariablesValues = ['f','f','330;19200000;f;1677110361504;1;f;0,30;','t','f']

const READTIMEOUT = 100

class StorageManager {

	constructor(){
		this.settings = {};
		this.appState = {};
		this.settingsObservers = [];
		//this.appStateObservers = [];
	}

	subscribeToSettingsChange(identifier,key,callback){
		for (let obj of this.settingsObservers){
			if(obj.id == identifier && obj.settingKey == key){
				obj.call = callback;
				return;
			} 
		}
		this.settingsObservers.push({id: identifier, settingKey: key, call: callback})
	}

	async loadAll(){
		this.loadSettings()
		await this.loadPreviousState()
	}

	async loadSettings(){
		for(i = 0; i < settings.length; i+= 1){
			let key = settings[i];
			let dafaultVal = defaultSettings[i]
			try {
				Promise.race([
					AsyncStorage.getItem(key).then((v) => {
						if((typeof v === "undefined") || v == 'undefined' || v == null){
							v = dafaultVal
						}
						this.settings[key] = v;}),
					new Promise((resolve,reject) => {() => {setTimeout(reject('Setting not found in time: ' + key),READTIMEOUT)}})
				])
			} catch (e) {
				this.settings[key] = dafaultVal
				console.log("Erro lendo estado: " + e)
			}
		}
	}

	async loadPreviousState() {
		for(i = 0; i < stateVariables.length; i+= 1){
			let key = stateVariables[i];
			let dafaultVal = initialStateVariablesValues[i]
			try {
				Promise.race([
					AsyncStorage.getItem(key).then((v) => {
						if((typeof v === "undefined") || v == 'undefined' || v == null){
							v = dafaultVal
						}
						this.appState[key] = v;}),
					new Promise((resolve,reject) => {() => {setTimeout(reject('State variable not found in time: ' + key),READTIMEOUT)}})
				])
			} catch (e) {
				this.appState[key] = dafaultVal
				console.log("Erro lendo estado: " + e)
			}
		}
	}

	async loadSetting(key){
		try{
			val = await AsyncStorage.getItem(key)
			this.settings[key] = val
		}catch(e){
			console.log("Erro carregando setting individual: " + e)
			val = null;
		}
		return val
	}

	async getSetting(key){
		if(this.settings[key] == undefined){
			return await this.loadSetting(key)
		}else{
			return this.settings[key]
		}
	}

	getPreviousStateValue(key){
		return this.appState[key]
	}

	updateStateVariable(key,val) {
		this.appState[key] = val
	}

	saveSetting(key,val){
		this.settings[key] = val
		try{
			AsyncStorage.setItem(key, val)
		}catch(e){
			console.log("Erro salvando opcao no disco: " + e)
		}
		for (let obj of this.settingsObservers) {
			if(obj.settingKey == key){
				try{
					obj.call(val)
				}catch(e){
					console.log("Erro notificando inscrito da variável " + key + " erro: \n" + e)
				}
			}
		}
	}

	async saveState(){
		for(i = 0; i < stateVariables.length; i+= 1){
			let key = stateVariables[i];
			try {
				await AsyncStorage.setItem(key, this.appState[key])
			} catch (e) {
				console.log("Erro salvando estado: " + e)
				await AsyncStorage.setItem(key, initialStateVariablesValues[i])
			}
		}
	}

}