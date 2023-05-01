import { randomUUID } from 'crypto';
import Content from './content';
import { Replace } from '@helpers/replace';

export interface NotificationProps {
  category: string;
  createdAt?: Date;
  recipientId: string;
  content: Content;
  readAt?: Date;
  cancelAt?: Date;
}

export default class Notification {
  public props: NotificationProps;
  private _id: string;

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
    this._id = id || randomUUID();
  }

  public get id() {
    return this._id;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get category(): string {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get cancelAt(): Date {
    return this.props.cancelAt;
  }

  cancel() {
    this.props.cancelAt = new Date();
  }

  public get readAt() {
    return this.props.readAt;
  }

  read() {
    this.props.readAt = new Date();
  }

  unread() {
    this.props.readAt = null;
    this.props.cancelAt = new Date();
  }
}
