import { Injectable } from '@angular/core';
import { asapScheduler, Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { messages } from './message-data';

export interface MessageContent {
  isForwarded?: boolean;
  replyId?: string | null;
  text?: string | null;
  mediaId?: string | null;
}

export interface Message {
  id: string;
  isGroupMessage: boolean;
  groupId?: string;
  senderId: string;
  recipientId: string;
  message: MessageContent;
  isSeen: boolean;
  sendAt: number;
  seenAt?: number | null;
  isEdited: boolean;
  isDeleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  /**
   * Simulated network latency. Deliberately slow enough that the loading state
   * is actually visible - a real chat backend rarely answers a history request
   * in under a couple hundred ms.
   */
  latency = 700;

  getMessages = (
    lastSeenMessage: Message | null,
    batchSize: number,
  ): Observable<Message[]> => {
    const sortedMessages = messages.sort(
      (a: Message, b: Message) => a.sendAt - b.sendAt,
    );
    const index = !!lastSeenMessage
      ? sortedMessages.findIndex((item) => item.id === lastSeenMessage.id)
      : messages.length;

    // slice() clamps a negative start to 0, so the batch simply runs dry
    // once the beginning of the conversation is reached
    const batch = sortedMessages.slice(Math.max(0, index - batchSize), index);
    return timer(this.latency).pipe(map(() => batch));
  };
}
