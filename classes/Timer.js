
export {Timer as Timer}

class Timer {

	constructor(duracaoMin){
		this.duracaoMs = duracaoMin*60*1000
		this.restanteMs = this.duracaoMs
		this.restanteS = 0
		this.restanteM = duracaoMin%60
		this.restanteH = Math.floor(duracaoMin/60)
		this.pausado = true;

		this.renderS = null;
		this.renderM = null;
		this.renderH = null;

		this.loaded = false;

		if((!duracaoMin) || duracaoMin == 0){
			delete this
			return
		}

		// setTimeout( () => {
		// 	this.restanteMs-=500
		// 	this.restanteH -= 2
		// 	console.log("Mudado as hora")
		// 	this.updateView()
		// } , 4000 )

	}

	toString(){
		return "Timer " + (this.pausado? "pausado [" : "rodando [")
		 + this.restanteMs +"/" + this.duracaoMs + "]"
	}

	updateView(){
		try {
			this.renderS(this.restanteS)
			this.renderM(this.restanteM)
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
}