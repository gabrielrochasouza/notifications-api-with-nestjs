import { Injectable } from '@nestjs/common';
import Notification from '../entities/notification';

@Injectable()
export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<Notification>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract countManyByRecipientIds(recipientId: string): Promise<number>;
  abstract findManyByRecipientIds(recipientId: string): Promise<Notification[]>;
}
