import { Message } from './Message';

export interface User {
	id: number | undefined
	name: string | undefined
	messages: Message[] | undefined
}
