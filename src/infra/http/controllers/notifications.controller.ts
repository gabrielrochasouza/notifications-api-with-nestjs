import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '../../../application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotificationRepo: SendNotification) {}

  @Post('create')
  async send(@Body() body: CreateNotificationBody) {
    const { notification } = await this.sendNotificationRepo.execute({
      content: body.content,
      category: body.category,
      recipientId: body.recipientId,
    });
    return { notification };
  }
}
