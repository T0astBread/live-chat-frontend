import { Component, OnInit } from '@angular/core';
import { Message } from 'src/models/Message';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userId: number | null = 2;
  messages: Message[] = [];

  constructor(private chat: ChatService) {
  }

  async ngOnInit() {
    this.messages = await this.chat
      .loadMessages()
      .toPromise()
    this.chat
      .subscribeToMessages()
      .subscribe(msg => this.messages = [...this.messages, msg])
  }

  onRegisterFormSubmit(evt: Event) {
    const form = evt.currentTarget as HTMLFormElement
    console.log("New username: ", form.username.value)
    evt.preventDefault()
  }
}
