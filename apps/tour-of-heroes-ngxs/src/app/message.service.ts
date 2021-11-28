import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';

interface MessageServiceState {
  messages: string[];
}

const initState: MessageServiceState = {
  messages: [],
};

@Injectable({ providedIn: 'root' })
export class MessageService extends RxState<MessageServiceState> {
  readonly messages$ = this.select('messages');

  constructor() {
    super();
    this.set(initState);
  }

  add(message: string) {
    this.set('messages', (oldState) => [...oldState.messages, message]);
  }

  clear() {
    this.set({ messages: [] });
  }
}
