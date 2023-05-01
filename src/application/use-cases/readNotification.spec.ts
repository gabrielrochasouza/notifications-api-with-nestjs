import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repositories';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from './readNotification';

describe('Read notification tests', () => {
  it('Should be able to read notification', async () => {
    const inMemoryRepository = new InMemoryNotificationsRepository();
    const repositoryRead = new ReadNotification(inMemoryRepository);

    await inMemoryRepository.create(makeNotification());

    await repositoryRead.execute({
      notificationId: inMemoryRepository.notifications[0].id,
    });

    expect(inMemoryRepository.notifications[0].readAt).toBeTruthy();
    expect(inMemoryRepository.notifications[0].readAt).toBeDefined();
    expect(inMemoryRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });
});
