import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notifications-repository';
import Notification from '@application/entities/notification';

export interface IGetRecipientNotifications {
  recipientId: string;
}

export interface NotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private repository: NotificationRepository) {}

  async execute(
    notificationInfo: IGetRecipientNotifications,
  ): Promise<NotificationResponse> {
    const { recipientId } = notificationInfo;
    const notifications = await this.repository.findManyByRecipientIds(
      recipientId,
    );
    return { notifications };
  }
}
