import AsyncStorage from '@react-native-async-storage/async-storage';

export {StorageManager as StorageManager, defaultSettings}

const settings = ['theme', 'timerHidden', 'realistic', 'soundsEnabled','pushNotif','warnedNotif']
const defaultSettings = {
	'theme': 'l',
	'timerHidden': 'f',
	'realistic': 'f',
	'soundsEnabled': 't',
	'pushNotif': 't',
	'warnedNotif': 'f',
}

const stateVariables = ['testActive','testEnded','timerState','timerVisible','atTestScreen']
const initialStateVariablesValues = {
	'testActive': 'f',
	'testEnded': 'f',
	'timerState': '330;19200000;f;1677110361504;1;f;0,30;',
	'timerVisible': 't',
	'atTestScreen': 'f',
}

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
		for(let key of settings){
			await this.loadSetting(key)
		}
	}

	async loadPreviousState() {
		for(key of stateVariables){
			await this.loadPreviousStateVariable(key)
		}
	}

	async loadSetting(key){
		let val = null
		try{
			val = await AsyncStorage.getItem(key) // 
			if(val == null || val.toString() == 'undefined'){
				val = defaultSettings[key]
			}
			this.settings[key] = val
		}catch(e){
			console.log("Erro carregando setting individual: " + e)
		}
		return val
	}

	async loadPreviousStateVariable(key){
		let val = null
		try{
			val = await AsyncStorage.getItem(key)
			if(val == null || val.toString() == 'undefined'){
				val = initialStateVariablesValues[key]
			}
			this.appState[key] = val
		}catch(e){
			console.log("Erro carregando estado individual: " + e)
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

	updateStateVariable(key,val) {
		this.appState[key] = val
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