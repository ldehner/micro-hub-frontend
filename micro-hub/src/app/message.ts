export interface Message {
    content: string;
    type: 'from' | 'to' | 'info';
    sender: string;
  }
