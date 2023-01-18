export {Timer as Timer}

class Timer {

	constructor(duracaoMin){
		this.duracaoMs = duracaoMin*60*1000
		this.duracaoMin = duracaoMin
		this.restanteMs = this.duracaoMs
		this.restanteS = 0
		this.restanteM = duracaoMin%60
		this.restanteH = Math.floor(duracaoMin/60)
		
		this.pausado = true;
		this.acabou = false;
		this.ultimoTick = Date.now();

		this.renderS = null;
		this.renderM = null;
		this.renderH = null;
		this.renderNextTag = null;
		this.notifyPaused = () => {};

		this.loaded = false;

		this.nextTag = 0;
		this.buildTags();
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

	computeElapsedTime(){
		let agora = Date.now()
		elapsed = agora - this.ultimoTick
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
	}

	unpause(timer){
		if(!timer.pausado || timer.acabou){return}
		timer.pausado = false;
		timer.ultimoTick = Date.now()
		timer.notifyPaused(false)
		setTimeout(() => {timer.passo()},100)
	}

	checkTags(){
		let nextTagMin = this.tags[this.nextTag]
		if(nextTagMin >= (this.restanteMs / (60* 1000))){
			this.nextTag+=1
			this.renderNextTag(this.nextTag)
		}
	}

	checkForTestEnd(){
		if(this.restanteMs <= 0){
			this.acabou = true
			this.pausado = true
			this.restanteMs = 0
			this.updateRestantesFromMs()
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
		} catch (error) {
			console.log("Não foi possível atualizar display do timer: " + error)
		}
		
	}

	loadTimer(fs,fm,fh,fnt,fp,fCallback){
		if(this.loaded)	return;
		this.setSRenderCallback(fs)
		this.setMRenderCallback(fm)
		this.setHRenderCallback(fh)
		this.setNextTagRenderCallback(fnt)
		this.renderNextTag(0)
		this.updateView()
		this.setNotifyPausedCallback(fp)
		fCallback()
		this.loaded = true
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
	}
}