import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';

const httpURI = 'http://127.0.0.1:8081/query';
const wsURI = 'ws://127.0.0.1:8081/query';

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        const http = httpLink.create({ uri: httpURI })
        const ws = new WebSocketLink({
          uri: wsURI,
          options: {
            reconnect: true,
          },
        });

        const splitLink = split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' &&
              (definition as OperationDefinitionNode).operation === 'subscription';
          }, ws, http);

        return {
          link: splitLink,
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
