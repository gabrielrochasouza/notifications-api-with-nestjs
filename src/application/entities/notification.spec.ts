import Content from './content';
import Notification from './notification';

describe('Tests of notification', () => {
  it('Should be able to create a new Notification', () => {
    const notification = new Notification({
      content: new Content('Nova notificação'),
      category: 'Nova categoria',
      recipientId: 'dafdf',
    });
    expect(notification).toBeTruthy();
  });
});
