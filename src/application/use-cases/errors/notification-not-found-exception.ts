export default class NotFound extends Error {
  constructor() {
    super('Notification not found!');
  }
}
