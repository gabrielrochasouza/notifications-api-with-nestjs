import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repositories';
import { CancelNotification } from './cancel-notification';
import { SendNotification } from './send-notification';
import NotFound from './errors/notification-not-found-exception';
import { makeNotification } from '@test/factories/notification-factory';

describe('Cancel notification tests', () => {
  it('Should be able to cancel notification', async () => {
    const inMemoryRepository = new InMemoryNotificationsRepository();
    const repositoryCancel = new CancelNotification(inMemoryRepository);
    const repositorySend = new SendNotification(inMemoryRepository);

    const notificationInfo = makeNotification();

    const { notification } = await repositorySend.execute(notificationInfo);

    const notificationId = {
      notificationId: notification.id,
    };
    const response = await repositoryCancel.execute(notificationId);

    expect(response).toBeTruthy();
    expect(inMemoryRepository.notifications).toHaveLength(1);
    expect(inMemoryRepository.notifications[0].cancelAt).toEqual(
      response.notification.cancelAt,
    );
  });

  it('Should not be able to cancel a non existing notification', async () => {
    const inMemoryRepository = new InMemoryNotificationsRepository();
    const repositoryCancel = new CancelNotification(inMemoryRepository);

    expect(() => {
      return repositoryCancel.execute({
        notificationId: '10',
      });
    }).rejects.toThrow(NotFound);
  });
});
