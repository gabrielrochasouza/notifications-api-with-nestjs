import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repositories';
import { SendNotification } from './send-notification';
import { makeNotification } from '@test/factories/notification-factory';

describe('Send notification tests', () => {
  it('Should be able to send notification', async () => {
    const inMemoryRepository = new InMemoryNotificationsRepository();
    const repository = new SendNotification(inMemoryRepository);

    const notificationInfo = makeNotification();
    const response = await repository.execute(notificationInfo);

    expect(response).toBeTruthy();
    expect(inMemoryRepository.notifications).toHaveLength(1);
    expect(inMemoryRepository.notifications[0]).toEqual(response.notification);
  });
});
