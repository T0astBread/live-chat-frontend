export interface GraphQLType<N extends string> {
	__typename: N
}

/**
 * mustBe ensures that obj has the expected GraphQL type field.
 * 
 * This implements at least some validation for GraphQL types.
 * 
 * @param typeName The name of the expected type in your GraphQL schema
 * @param obj The object to check
 */
export function mustBe<
	T extends GraphQLType<N>,
	N extends string
>(typeName: N, obj: any): T {
	const casted = obj as T
	if (casted.__typename == typeName)
		return casted
	throw new Error("Recieved object does not match expected GraphQL type: " + typeName + ", " + JSON.stringify(obj))
}
