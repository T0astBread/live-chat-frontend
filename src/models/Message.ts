import { GraphQLType } from './types';
import { User } from './User';

export interface Message extends GraphQLType<"Message"> {
	content: string | undefined
	poster: User | undefined
}
