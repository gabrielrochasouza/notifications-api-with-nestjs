import { NotificationRepository } from '../../../../application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import Notification from '../../../../application/entities/notification';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}
  async create(notification: Notification): Promise<void> {
    await this.prismaService.notifications.create({
      data: {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
        createdAt: notification.createdAt,
        readAt: notification.readAt,
      },
    });
  }
}
