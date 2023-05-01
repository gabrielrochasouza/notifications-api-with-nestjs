import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body.dto';
import { NotificationViewModel } from '../view-model/notification-view-model';
import Content from '@application/entities/content';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { GetRecipientNotifications } from '@application/use-cases/getRecipientNotifications';
import { ReadNotification } from '@application/use-cases/readNotification';
import { UnreadNotification } from '@application/use-cases/unreadNotification';
import { CountRecipientNotification } from '@application/use-cases/countNotifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotificationRepo: SendNotification,
    private cancelNotificationRepo: CancelNotification,
    private countRecipientNotificationRepo: CountRecipientNotification,
    private getNotificationRepo: GetRecipientNotifications,
    private readNotificationRepo: ReadNotification,
    private unreadNotificationRepo: UnreadNotification,
  ) {}

  @Post('create')
  async send(@Body() body: CreateNotificationBody) {
    const { notification } = await this.sendNotificationRepo.execute({
      content: new Content(body.content),
      category: body.category,
      recipientId: body.recipientId,
    });
    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }

  @Patch('cancel/:notificationId')
  async cancel(@Param('notificationId') notificationId: string) {
    await this.cancelNotificationRepo.execute({ notificationId });
  }

  @Get('count/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    return await this.countRecipientNotificationRepo.execute({ recipientId });
  }

  @Get('/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getNotificationRepo.execute({
      recipientId,
    });
    return notifications.map((notification) =>
      NotificationViewModel.toHttp(notification),
    );
  }

  @Patch('read/:notificationId')
  async read(@Param('notificationId') notificationId: string) {
    try {
      await this.readNotificationRepo.execute({
        notificationId: notificationId,
      });
    } catch (err) {
      return {
        message: 'Not Found',
      };
    }
  }

  @Patch('unread/:notificationId')
  async unread(@Param('notificationId') notificationId: string) {
    try {
      await this.unreadNotificationRepo.execute({
        notificationId: notificationId,
      });
    } catch (err) {
      return {
        message: 'Not Found',
      };
    }
  }
}
