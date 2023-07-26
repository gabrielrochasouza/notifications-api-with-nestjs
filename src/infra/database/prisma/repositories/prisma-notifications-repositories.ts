import { NotificationRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import Notification from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationMapper } from '../mappers/notification-mapper';

@Injectable()
export class PrismaRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notifications.create({
      data: NotificationMapper.toPrisma(notification),
    });
  }

  async findById(notificationId: string): Promise<Notification> {
    const notification = await this.prismaService.notifications.findFirst({
      where: { id: notificationId },
    });

    if (!notification) {
      return null;
    }

    return NotificationMapper.toDomain(notification, notification.id);
  }

  async save(notification: Notification): Promise<Notification> {
    const raw = NotificationMapper.toPrisma(notification);
    await this.prismaService.notifications.update({
      where: {
        id: raw.id,
      },
      data: {
        readAt: raw.readAt,
        canceledAt: raw.cancelAt,
        category: raw.category,
        content: raw.content,
      },
    });
    return notification;
  }

  async countManyByRecipientIds(recipientId: string): Promise<number> {
    const notifications = await this.prismaService.notifications.findMany({
      where: {
        recipientId: recipientId,
      },
    });
    return notifications.length;
  }

  async findManyByRecipientIds(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notifications.findMany({
      where: {
        recipientId,
      },
    });
    return notifications.map((notification) =>
      NotificationMapper.toDomain(notification, notification.id),
    );
  }
}
