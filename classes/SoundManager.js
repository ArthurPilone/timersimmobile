// Using https://www.npmjs.com/package/react-native-sound

// I still need to add the sound files to iOs port using xCode xd

var Sound = require('react-native-sound');

Sound.setCategory('Playback');

export {SoundManager as SoundManager}

class SoundManager {
	
	constructor(){
		this.sounds = {}
		this.loadSounds()
	}

	loadSounds(){

		let afterLoadCallback = (error) => {
			if(error){
				console.log("Erro carregando som: " + error)
			}
		}

		this.sounds['desgrudar'] = new Sound('desgrudar.wav', Sound.MAIN_BUNDLE, afterLoadCallback)
		this.sounds['sirene'] = new Sound('sirene.wav', Sound.MAIN_BUNDLE, afterLoadCallback)
	}

	playSound(key){
		this.sounds['desgrudar'].setVolume(0.25)
		this.sounds[key].play((success) => {
			if(! success){
				console.log("Não consegui tocar um áudio")
			}
		})
	}
}