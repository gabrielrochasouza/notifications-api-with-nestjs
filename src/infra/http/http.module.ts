import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { DatabaseModule } from '../database/database.module';
import { SendNotification } from '../../application/use-cases/send-notification';

@Module({
  controllers: [NotificationsController],
  imports: [DatabaseModule],
  providers: [SendNotification],
})
export class HttpModule {}
