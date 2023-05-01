import Notification from 'src/application/entities/notification';
import { NotificationRepository } from 'src/application/repositories/notifications-repository';

export class InMemoryNotificationsRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<Notification> {
    const notificationIndex = this.notifications.findIndex(
      (noti) => noti.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
      return notification;
    }
    this.notifications.push(notification);
    return notification;
  }

  async findById(notificationId: string): Promise<Notification> {
    return this.notifications.find((n) => n.id === notificationId);
  }

  async countManyByRecipientIds(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async findManyByRecipientIds(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }
}
