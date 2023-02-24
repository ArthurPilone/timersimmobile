import PushNotification from "react-native-push-notification";

import { ExtraMath } from "./ExtraMath";

export {testNotificationsManager as testNotificationsManager}

class TestNotificationsManager {
	
	constructor(enabled){
		this.notifsEnabled = enabled
	}

	buildNotifs(tags, tagRemotion, now, remainingTestTime, realistic){
		if(! this.notifsEnabled){ return }
		tags.forEach((val,index) => {
			let tagMs = ExtraMath.minutesToMs(tagRemotion[index])
			let tagTime = [(val-(val % 60))/60 , val % 60]
			if(tagMs < remainingTestTime){
				this.scheduleNotif(tagTime, now + (remainingTestTime-tagMs), realistic)
			}
		})
	}

	scheduleNotif(tagTime, fireDate, realistic){
		if(! this.notifsEnabled){ return }
		let tempoRestante = tagTime[0] > 0 ? tagTime[0] + " horas e " : "" 
		tempoRestante += tagTime[1] + (tagTime[1]==1 ? " minuto" : " minutos")

		let lastTag = (tagTime[0] == 0 && tagTime[1] == 0);

		let titulo = lastTag ? "Fim de prova !!" : "Restam " + tempoRestante
		let mensagem = lastTag ? "O tempo de prova acabou !!" : "A etiqueta de " + tempoRestante + " foi removida"
		let textoGrande = lastTag ? mensagem : mensagem  + (realistic ? ", mas será que o fiscal se adiantou ou atrasou desta vez? " : "")

		PushNotification.localNotificationSchedule({

			/* Android Only Properties */
			channelId: "canal", // (required) channelId, if the channel doesn't exist, notification will not trigger.
			//ticker: "My Notification Ticker", // (optional)
			showWhen: true, // (optional) default: true
			autoCancel: true, // (optional) default: true
			largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
			//smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
			bigText: textoGrande, // (optional) default: "message" prop
			subText: (realistic && !lastTag) ? " ou será menos?" : '', // (optional) default: none
			//bigLargeIcon: "ic_launcher", // (optional) default: undefined
			//bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
			//color: "red", // (optional) default: system default
			vibration: 700, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
			priority: "high", // (optional) set notification priority, default: high
			visibility: "private", //a
			ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
			//onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
			allowWhileIdle: true,
			
			//when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
			usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
			timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
		
			//subtitle: "My Notification Subtitle", // (optional) smaller title below notification title

			title: titulo , // (optional)
			message: mensagem , // (required)
			playSound: false, // (optional) default: true
			soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
			date: new Date(fireDate),
		})
	}

	clearNotifications(){
		PushNotification.cancelAllLocalNotifications()
	}

	toggleNotifications(val){
		this.notifsEnabled = val
		if (! val) {
			this.clearNotifications()
		}
	}
}

const testNotificationsManager = new TestNotificationsManager(true)