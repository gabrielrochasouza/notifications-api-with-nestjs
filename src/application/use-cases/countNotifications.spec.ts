import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repositories';
import { SendNotification } from './send-notification';
import { CountRecipientNotification } from './countNotifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count notification tests', () => {
  it('Should be able to count notifications', async () => {
    const inMemoryRepository = new InMemoryNotificationsRepository();
    const repositorySend = new SendNotification(inMemoryRepository);
    const repositoryCount = new CountRecipientNotification(inMemoryRepository);

    const notificationInfo = makeNotification();
    const notificationInfo2 = makeNotification();
    await repositorySend.execute(notificationInfo);
    await repositorySend.execute(notificationInfo2);

    const response = await repositoryCount.execute({ recipientId: 'dfdfdfdf' });

    expect(response).toBeTruthy();
    expect(response.count).toBe(2);
  });
});
