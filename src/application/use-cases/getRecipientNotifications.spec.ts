import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repositories';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './getRecipientNotifications';

describe('Get notification tests', () => {
  it('Should be able to get notifications', async () => {
    const inMemoryRepository = new InMemoryNotificationsRepository();
    const repositoryGet = new GetRecipientNotifications(inMemoryRepository);

    const notificationInfo = makeNotification({ recipientId: 'r-1' });
    const notificationInfo2 = makeNotification({ recipientId: 'r-1' });
    await inMemoryRepository.create(notificationInfo);
    await inMemoryRepository.create(notificationInfo2);

    const { notifications } = await repositoryGet.execute({
      recipientId: 'r-1',
    });

    expect(notifications).toBeTruthy();
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'r-1' }),
        expect.objectContaining({ recipientId: 'r-1' }),
      ]),
    );
    expect(notifications).toHaveLength(2);
  });
});
