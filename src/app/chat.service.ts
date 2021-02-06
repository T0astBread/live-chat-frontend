import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mustBe } from 'src/models/types';
import { Message } from 'src/models/Message';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private apollo: Apollo) { }

  registerUser(name: string): Observable<User> {
    return this.apollo.mutate({
      mutation: gql`
        mutation RegisterUser($name: String!) {
          registerUser(input: {
            name: $name
          }) {
            id
            name
          }
        }
      `,
      variables: {
        name
      }
    })
    .pipe(
      map(({ data }: any) => mustBe("User", data.registerUser))
    )
  }

  loadMessages(): Observable<Message[]> {
    return this.apollo.query({
      query: gql`{
        messages {
          content
          poster {
            name
          }
        }
      }`})
      .pipe(
        map(({ data }: any) => (data.messages as any[])
          .map(m => mustBe("Message", m)))
      )
  }

  subscribeToMessages(): Observable<Message> {
    return this.apollo.subscribe({
      query: gql`
        subscription onMessagePosted {
          messagePosted {
            content
            poster {
              name
            }
          }
        }`})
      .pipe(
        map(({ data }: any) => mustBe("Message", data.messagePosted))
      )
  }
}
