export {StorageManager as StorageManager}

// Usar https://react-native-async-storage.github.io/async-storage/docs ?

class StorageManager {

	constructor(){
		this.state = this.loadSettings()
	}

	loadSettings(){
		console.log("'Li' tudo do disco")
		return {
			theme: "l"	
		}
	}

	loadSetting(key){
		console.log("'Li' " + key + " do disco")
		val = true
		//this.state[key] = val
		return val
	}

	getSetting(key){
		if(this.state[key] == undefined){
			return this.loadSetting(key)
		}else{
			return this.state[key]
		}
	}

	saveSetting(key,val){
		this.state[key] = val
		console.log("Salvando no disco: " + key + " = " + val)
	}

}