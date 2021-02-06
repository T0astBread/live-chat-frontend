import { Message } from './Message';
import { GraphQLType } from './types';

export interface User extends GraphQLType<"User"> {
	id: number | undefined
	name: string | undefined
	messages: Message[] | undefined
}
