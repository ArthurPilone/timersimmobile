export {Timer as Timer}

import PushNotification from "react-native-push-notification";

import { ExtraMath } from "./ExtraMath" 

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
	}

	unpause(timer){
		if(!timer.pausado || timer.acabou){return}
		timer.pausado = false;
		timer.ultimoTick = Date.now()
		timer.notifyPaused(false)
		setTimeout(() => {timer.passo()},100)

		PushNotification.localNotification({
			/* Android Only Properties */
			channelId: "canal", // (required) channelId, if the channel doesn't exist, notification will not trigger.
			//ticker: "My Notification Ticker", // (optional)
			showWhen: true, // (optional) default: true
			autoCancel: true, // (optional) default: true
			largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
			//largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
			//smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
			bigText: "My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)", // (optional) default: "message" prop
			subText: "This is a subText", // (optional) default: none
			//bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
			//bigLargeIcon: "ic_launcher", // (optional) default: undefined
			//bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
			//color: "red", // (optional) default: system default
			//vibrate: true, // (optional) default: true
			vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
			//tag: "some_tag", // (optional) add tag to message
			//group: "group", // (optional) add group to message
			//groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
			//ongoing: false, // (optional) set whether this is an "ongoing" notification
			priority: "high", // (optional) set notification priority, default: high
			visibility: "private", // (optional) set notification visibility, default: private
			ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
			//shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
			//onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
			
			when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
			usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
			timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
		  
			actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
			invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
		  
			/* iOS only properties */
			category: "", // (optional) default: empty string
			subtitle: "My Notification Subtitle", // (optional) smaller title below notification title
		  
			/* iOS and Android properties */
			id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
			title: "My Notification Title", // (optional)
			message: "My Notification Message", // (required)
			//picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
			playSound: false, // (optional) default: true
			soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
		  });
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
	}
}