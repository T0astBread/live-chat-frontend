import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mustBe } from 'src/models/types';
import { Message } from 'src/models/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private apollo: Apollo) { }

  loadMessages(): Observable<Message[]> {
    return this.apollo
      .query({
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
}
