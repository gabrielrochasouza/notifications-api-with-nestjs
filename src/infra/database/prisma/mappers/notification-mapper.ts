import { Notifications as RawNotification } from '@prisma/client';
import Notification from '@application/entities/notification';
import Content from '@application/entities/content';

export class NotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
      cancelAt: notification.cancelAt,
    };
  }

  static toDomain(raw: RawNotification, id?: string): Notification {
    return new Notification(
      {
        content: new Content(raw.content),
        category: raw.category,
        recipientId: raw.recipientId,
        createdAt: raw.createdAt,
        readAt: raw.readAt,
        cancelAt: raw.canceledAt,
      },
      id,
    );
  }
}
