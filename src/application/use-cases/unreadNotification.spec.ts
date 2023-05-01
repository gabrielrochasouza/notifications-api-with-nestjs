import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repositories';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from './readNotification';
import { UnreadNotification } from './unreadNotification';

describe('Read notification tests', () => {
  it('Should be able to read notification', async () => {
    const inMemoryRepository = new InMemoryNotificationsRepository();
    const repositoryRead = new ReadNotification(inMemoryRepository);
    const repositoryUnread = new UnreadNotification(inMemoryRepository);

    await inMemoryRepository.create(makeNotification());

    await repositoryRead.execute({
      notificationId: inMemoryRepository.notifications[0].id,
    });
    await repositoryUnread.execute({
      notificationId: inMemoryRepository.notifications[0].id,
    });

    expect(inMemoryRepository.notifications[0].readAt).toBeFalsy();
    expect(inMemoryRepository.notifications[0].readAt).toBeNull();
  });
});
