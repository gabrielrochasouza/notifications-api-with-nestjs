import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notifications-repository';

export interface ICountRecipientNotification {
  recipientId: string;
}

export interface NotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private repository: NotificationRepository) {}

  async execute(
    notificationInfo: ICountRecipientNotification,
  ): Promise<NotificationResponse> {
    const { recipientId } = notificationInfo;
    const count = await this.repository.countManyByRecipientIds(recipientId);
    return { count };
  }
}
