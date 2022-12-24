import { BotaoDesativavel } from "./BotaoDesativavel";

export const Botao = (props) => (
	<BotaoDesativavel callback={props.callback} texto={props.texto} ativado={true}/>	
)