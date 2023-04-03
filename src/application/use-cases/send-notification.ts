import { Injectable } from '@nestjs/common';
import Content from '../entities/content';
import Notification from '../entities/notification';
import { NotificationRepository } from '../repositories/notifications-repository';

export interface ISendNotification {
  content: string;
  category: string;
  recipientId: string;
}

export interface NotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private repository: NotificationRepository) {}

  async execute(
    notificationInfo: ISendNotification,
  ): Promise<NotificationResponse> {
    const { category, content, recipientId } = notificationInfo;
    const notification = new Notification({
      category,
      content: new Content(content),
      recipientId,
    });
    this.repository.create(notification);
    return {
      notification,
    };
  }
}
