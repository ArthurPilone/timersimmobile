import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { Logo }  from "../minor/Logo.js"
import { styles } from "../../style/style.js"

export { HomeScreen as HomeScreen }

function HomeScreen() {
	return (
	  <View style={styles.container}>
		  <Logo/>
		  <StatusBar style="auto" />
	  </View>
	);
  }