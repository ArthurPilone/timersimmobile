export {Timer as Timer}

import { ExtraMath } from "./ExtraMath" 

import { testNotificationsManager } from "./TestNotificationsManager"

class Timer {

	constructor(duracaoMin, realistic){
		this.duracaoMs = duracaoMin*60*1000
		this.duracaoMin = duracaoMin
		this.restanteMs = this.duracaoMs
		this.restanteS = 0
		this.restanteM = duracaoMin%60
		this.restanteH = Math.floor(duracaoMin/60)
		
		this.pausado = true;
		this.acabou = false;
		this.ultimoTick = Date.now();
		this.wasJustAway = false;

		this.renderS = null;
		this.renderM = null;
		this.renderH = null;
		this.renderNextTag = () => {};
		this.notifyPaused = () => {};
		this.notifyTestEnded = () => {};

		this.nextTagSoundCallback = () => {};
		this.testEndSoundCallback = () => {};

		this.provaScreenNotifiersLoaded = false;
		this.pauseNotifierLoaded = false;
		this.renderersLoaded = false;
		this.soundsCallbacksLoaded = false;

		this.nextTag = 0;
		this.realistic = realistic
		this.buildTags()
		this.buildTagRemotionMarkers(realistic);
	}

	exportTimerState(){
		if((this.ultimoTick + "") == "Invalid Date"){
			this.computeElapsedTime()
		}

		let stateString = ''
		stateString += this.duracaoMin + ';'
		stateString += this.restanteMs + ';'
		stateString += (this.pausado? 't' : 'f') + ';'
		stateString += this.ultimoTick + ';'
		stateString += this.nextTag + ';'
		stateString += (this.realistic? 't' : 'f') + ';'
		stateString += this.tagRemotion + ';'

		return stateString
	}

	reloadTimer(timerStateString){
		let splitInfo = timerStateString.split(';')

		this.duracaoMin = Number(splitInfo[0])
		this.duracaoMs = 60000 * this.duracaoMin

		this.restanteMs = Number(splitInfo[1])
		this.updateRestantesFromMs()

		this.pausado = (splitInfo[2] == 't')

		this.ultimoTick = (new Date(Number(splitInfo[3]))).getTime()

		this.nextTag = Number(splitInfo[4])

		this.realistic = (splitInfo[5] == 't')

		this.buildTags()

		this.tagRemotion = (splitInfo[6]).split(',').map(Number)

		this.provaScreenNotifiersLoaded = false;
		this.pauseNotifierLoaded = false;
		this.renderersLoaded = false;
		this.soundsCallbacksLoaded = false;

		this.passo()
	}

	buildTags(){
		this.tags = [];
		let testTime = this.duracaoMin
		while(testTime > 60){
			this.tags.push(testTime)
			testTime -= 30
		}
		while(testTime >= 15){
			this.tags.push(testTime)
			testTime -= 15
		}
		if(testTime != 0){
			this.tags.push(testTime)
		}
		this.tags.push(0)
	}

	buildTagRemotionMarkers(realistic){
		
		if(!realistic){
			this.tagRemotion = this.tags
			return
		}

		this.tagRemotion = this.tags.map(this.randomizeTagMarker)
	}

	randomizeTagMarker(tagTime, tagIndex,tags){
		if(tagIndex == 0 || (tagIndex >= tags.length - 2)){
			return tagTime
		}

		let offset = ExtraMath.gaussianRandom(0,1.2)
		offset = Math.round(offset)
		offset = ExtraMath.clamp(offset,-14,5)

		return tagTime += offset
	}

	computeElapsedTime(){
		let agora = Date.now()
		let elapsed = agora - this.ultimoTick
		this.wasJustAway = elapsed > 300
		this.restanteMs -= elapsed
		this.ultimoTick = agora
		this.updateRestantesFromMs()
	}

	updateRestantesFromMs(){
		this.restanteH = Math.floor(this.restanteMs / (1000 * 60 * 60))
		this.restanteM = Math.floor(this.restanteMs / (1000 * 60)) % 60
		this.restanteS = Math.floor(this.restanteMs / 1000) % 60
	}

	passo(){
		if(!this.pausado){
			this.computeElapsedTime()
			this.checkTags()
			this.checkForTestEnd()
			this.updateView()
			setTimeout(() => {this.passo()},100)
		}else{
			this.checkForTestEnd()
		}	
	}

	pause(timer){
		if(timer.pausado || timer.acabou){return}
		timer.pausado = true;
		timer.computeElapsedTime()
		timer.notifyPaused(true)
		testNotificationsManager.clearNotifications()
	}

	unpause(timer){
		if(!timer.pausado || timer.acabou){return}
		timer.pausado = false;
		timer.ultimoTick = Date.now()
		timer.notifyPaused(false)
		timer.createScheduledNotifications()
		setTimeout(() => {timer.passo()},100)
	}

	createScheduledNotifications(){
		testNotificationsManager.buildNotifs(this.tags,this.tagRemotion,Date.now(),this.restanteMs, this.realistic)
	}

	checkTags(){
		let nextTagMin = this.tags[this.nextTag]
		if(nextTagMin >= (this.restanteMs / (60* 1000))){
			this.nextTag+=1
			this.renderNextTag(this.nextTag)
			if(! this.wasJustAway){
				this.nextTagSoundCallback()
			}		
		}
	}

	checkForTestEnd(){
		if(this.restanteMs <= 0){
			this.acabou = true
			this.pausado = true
			this.restanteMs = 0
			this.updateRestantesFromMs()
			this.notifyTestEnded()
			this.testEndSoundCallback()
		}
	}

	updateView(){
		try {
			if(this.restanteS < 10){
				this.renderS("0" + this.restanteS)
			}else{
				this.renderS(this.restanteS)
			}
			
			if(this.restanteM < 10){
				this.renderM("0" + this.restanteM)
			}else{
				this.renderM(this.restanteM)
			}

			this.renderH(this.restanteH)
		} catch (error) {}
		
	}

	loadPauseNotifier(fp){
		if(this.pauseNotifierLoaded) return;
		this.setNotifyPausedCallback(fp)
		this.notifyPaused(this.pausado)
		this.pauseNotifierLoaded = true;
	}

	loadProvaScreenNotifiers(fnt,fte){
		if(this.provaScreenNotifiersLoaded) return;

		this.setNextTagRenderCallback(fnt)
		try{this.renderNextTag(this.nextTag)}
		catch{}
		this.setTestEndedCallback(fte)

		this.provaScreenNotifiersLoaded = true
	}

	loadSoundCallbacks(fNt, fTe){
		if(this.soundsCallbacksLoaded) return;

		this.nextTagSoundCallback = fNt;
		this.testEndSoundCallback = fTe;
	}

	loadTimerRenderers(fs,fm,fh){
		if(this.renderersLoaded)	return;
		this.setSRenderCallback(fs)
		this.setMRenderCallback(fm)
		this.setHRenderCallback(fh)
		this.updateView()
		this.renderersLoaded = true
	}

	setSRenderCallback(f){
		this.renderS = f
	}

	setMRenderCallback(f){
		this.renderM = f
	}

	setHRenderCallback(f){
		this.renderH = f
	}

	setNextTagRenderCallback(f){
		this.renderNextTag = f
	}

	setNotifyPausedCallback(fp){
		this.notifyPaused = fp		
	}
	
	setTestEndedCallback(fte){
		this.notifyTestEnded = fte
	}

	getS() {
		return this.restanteS
	}

	getM() {
		return this.restanteM
	}

	getH() {
		return this.restanteH
	}

	toString(){
		return "Timer " + (this.pausado? "pausado [" : "rodando [")
		 + this.restanteMs +"/" + this.duracaoMs + "]"
	}

	free(){
		this.pausado = true
		this.renderS = () => {}
		this.renderM = () => {}
		this.renderH = () => {}
		this.renderNextTag = () => {}
		this.notifyPaused = () => {}
		testNotificationsManager.clearNotifications()
	}
}