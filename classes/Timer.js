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
		this.renderNextTag = null;
		this.notifyPaused = () => {};
		this.notifyTestEnded = () => {};

		this.nextTagSoundCallback = () => {};
		this.testEndSoundCallback = () => {};

		this.notifiersLoaded = false;
		this.renderersLoaded = false;
		this.soundsCallbacksLoaded = false;

		this.nextTag = 0;
		this.realistic = realistic
		this.buildTags()
		this.buildTagRemotionMarkers(realistic);
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
		elapsed = agora - this.ultimoTick
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

	loadNotifiers(fnt,fps,fte){
		if(this.notifiersLoaded) return;

		this.setNotifyPausedCallback(fps)
		this.setNextTagRenderCallback(fnt)
		this.renderNextTag(0)
		this.setTestEndedCallback(fte)

		this.notifiersLoaded = true
	}

	loadSoundCallbacks(fNt, fTe){
		if(this.soundsCallbacksLoaded) return;

		this.nextTagSoundCallback = fNt;
		this.testEndSoundCallback = fTe;
	}

	loadTimerRenderers(fs,fm,fh,fCallback){
		if(this.renderersLoaded)	return;
		this.setSRenderCallback(fs)
		this.setMRenderCallback(fm)
		this.setHRenderCallback(fh)
		this.updateView()
		fCallback()
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