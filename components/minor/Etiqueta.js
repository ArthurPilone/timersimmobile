import { View, Text } from 'react-native';

import { styles } from "../../style/style.js"

export const Etiqueta = (props) => (
	<View style={styles.etiqueta}>
		<Text>{props.h}h {props.m}m</Text>
	</View>
  )  