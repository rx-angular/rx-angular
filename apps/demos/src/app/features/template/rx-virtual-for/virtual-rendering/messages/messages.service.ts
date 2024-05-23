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

    const batch = sortedMessages.slice(index - batchSize, index);
    return timer(250).pipe(map(() => batch));
    // return of(batch);
  };
}
