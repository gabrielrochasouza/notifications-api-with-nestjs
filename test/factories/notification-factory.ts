import Content from '@application/entities/content';
import Notification from '@application/entities/notification';

import { NotificationProps } from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override?: Override) {
  return new Notification({
    category: 'Nova categoria',
    recipientId: 'dfdfdfdf',
    content: new Content('Conteúdo novo'),
    ...override,
  });
}
