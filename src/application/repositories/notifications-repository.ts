import { Injectable } from '@nestjs/common';
import Notification from '../entities/notification';

@Injectable()
export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
}
