import AsyncStorage from '@react-native-async-storage/async-storage';

export {StorageManager as StorageManager, defaultSettings}

const settings = ['theme', 'timerHidden', 'realistic', 'soundsEnabled']
const defaultSettings = ['l','f','f','t']

class StorageManager {

	constructor(){
		this.state = {};
	}

	async loadSettings(){
		for(i = 0; i < settings.length; i+= 1){
			let key = settings[i];
			try {
				(AsyncStorage.getItem(key)).then((val) => {this.state[key] = val})
			} catch (e) {
				console.log("Erro lendo settings: " + e)
				this.state[key] = defaultSettings[i]
			}
		}

	}

	async loadSetting(key){
		try{
			val = await AsyncStorage.getItem(key)
			this.state[key] = val
		}catch(e){
			console.log("Erro carregando setting individual: " + e)
			val = null;
		}
		return val
	}

	async getSetting(key){
		if(this.state[key] == undefined){
			return await this.loadSetting(key)
		}else{
			return this.state[key]
		}
	}

	saveSetting(key,val){
		this.state[key] = val
		try{
			AsyncStorage.setItem(key, val)
		}catch(e){
			console.log("Erro salvando opcao no disco: " + e)
		}
	}

}