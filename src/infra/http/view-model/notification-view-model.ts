import Notification from '@application/entities/notification';

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.props.content.value,
      category: notification.props.category,
      recipientId: notification.props.recipientId,
      readAt: notification.props.readAt,
      createdAt: notification.props.createdAt,
      cancelAt: notification.props.cancelAt,
    };
  }
}
