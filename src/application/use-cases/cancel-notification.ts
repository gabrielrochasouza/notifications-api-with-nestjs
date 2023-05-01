import { Injectable } from '@nestjs/common';
import Notification from '../entities/notification';
import { NotificationRepository } from '../repositories/notifications-repository';
import NotFound from './errors/notification-not-found-exception';

export interface ICancelNotification {
  notificationId: string;
}

export interface NotificationResponse {
  notification: Notification;
}

@Injectable()
export class CancelNotification {
  constructor(private repository: NotificationRepository) {}

  async execute(
    notificationInfo: ICancelNotification,
  ): Promise<NotificationResponse> {
    const { notificationId } = notificationInfo;

    const notification = await this.repository.findById(notificationId);

    if (!notification) {
      throw new NotFound();
    }

    notification.cancel();

    await this.repository.save(notification);

    return {
      notification,
    };
  }
}
