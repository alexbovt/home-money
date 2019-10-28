export type MessageType = 'danger' | 'success' | 'warning' | 'info';

export class Message {
  constructor(
    public text: string,
    public type: MessageType = 'danger'
  ) {
  }
}
