import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'src/models/Message';
import { User } from 'src/models/User';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User | null = null;
  messages: Message[] = [];
  messageInput = "";

  constructor(private chat: ChatService) { }

  ngOnInit() {
    // Uncomment for development (but don't forget to comment again)
    // this.register("dummy user")
  }

  async onRegisterFormSubmit(evt: Event) {
    evt.preventDefault()
    const form = evt.currentTarget as HTMLFormElement
    const username = form.username.value
    this.register(username)
  }

  onMessageFormSubmit(evt: Event) {
    evt.preventDefault()
    this.post(this.messageInput)
    this.messageInput = ""
  }

  async register(username: string) {
    try {
      this.user = await this.chat
        .registerUser(username)
        .toPromise()
    } catch(e) {
      alert(e)
      throw e
    }

    this.messages = await this.chat
      .loadMessages()
      .toPromise()
    this.chat
      .subscribeToMessages()
      .subscribe(msg => this.messages = [...this.messages, msg])
  }

  async post(message: string) {
    await this.chat
      .postMessage(message, this.user!)
      .toPromise()
    console.info("Posted a message:", message)
  }
}
