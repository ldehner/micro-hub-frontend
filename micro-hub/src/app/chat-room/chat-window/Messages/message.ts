export interface Message {
    content: string;
    type: 'from' | 'to' | 'leave' | 'join';
    sender: string;
  }
