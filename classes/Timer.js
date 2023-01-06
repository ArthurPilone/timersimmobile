export {Timer as Timer}

class Timer {

	constructor(duracaoMin){
		this.duracaoMs = duracaoMin*60*1000
		this.restanteMs = this.duracaoMs
		this.restanteS = 0
		this.restanteM = duracaoMin%60
		this.restanteH = Math.floor(duracaoMin/60)
		
		this.pausado = true;
		this.ultimoTick = Date.now();

		this.renderS = null;
		this.renderM = null;
		this.renderH = null;

		this.loaded = false;

	}

	computeElapsedTime(){
		agora = Date.now()
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
			this.updateView()
			setTimeout(() => {this.passo()},100)
		}	
	}

	pause(timer){
		if(timer.pausado){return}
		timer.pausado = true;
		timer.computeElapsedTime()
	}

	unpause(timer){
		if(! timer.pausado){return}
		timer.pausado = false;
		timer.ultimoTick = Date.now()
		setTimeout(() => {timer.passo()},100)
	}

	toString(){
		return "Timer " + (this.pausado? "pausado [" : "rodando [")
		 + this.restanteMs +"/" + this.duracaoMs + "]"
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

	loadTimer(fs,fm,fh){
		if(this.loaded)	return;
		this.setSRenderCallback(fs)
		this.setMRenderCallback(fm)
		this.setHRenderCallback(fh)
		this.updateView()
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

	getS() {
		return this.restanteS
	}

	getM() {
		return this.restanteM
	}

	getH() {
		return this.restanteH
	}

	free(){
		this.pausado = true
		this.renderS = () => {}
		this.renderM = () => {}
		this.renderH = () => {}
	}
}