import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { DatabaseModule } from '../database/database.module';
import { SendNotification } from '@application/use-cases/send-notification';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/readNotification';
import { UnreadNotification } from '@application/use-cases/unreadNotification';
import { GetRecipientNotifications } from '@application/use-cases/getRecipientNotifications';
import { CountRecipientNotification } from '@application/use-cases/countNotifications';

@Module({
  controllers: [NotificationsController],
  imports: [DatabaseModule],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    GetRecipientNotifications,
    CountRecipientNotification,
  ],
})
export class HttpModule {}
