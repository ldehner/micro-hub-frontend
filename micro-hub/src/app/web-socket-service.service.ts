import { EventEmitter, Injectable, Output } from '@angular/core';
import { Client, IFrame, IMessage, StompSubscription } from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client!: Client;
  private myMethodSubject = new Subject<any>();
  private ip: string = '';
  private port: string = '';
  private username: string = '';

  myMethodCalled$ = this.myMethodSubject.asObservable();

  constructor() {
  }

  private registerStompListeners(): void {
    this.client.onConnect = (frame: IFrame) => {
      console.log('Connected: ' + frame);
      this.client.subscribe("/topic/public", (msg) => this.myMethodSubject.next(msg.body));
      var joinMessage = {
        sender: this.username,
        content: '',
        type: 'JOIN'
      };
      this.sendMessage('/app/chat.addUser', JSON.stringify(joinMessage));
    };

    this.client.onStompError = (frame: IFrame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.onDisconnect = () => {
      console.log('Disconnected');
    };
  }

  public setIp(ip: string, port: string): void {
    console.log(ip);
    this.ip = ip;
    this.port = port;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public connect(): void {
    if (this.client != undefined) {
      this.disconnect();
    }
    this.createClient();
    if (!this.client.active) {
      this.client.activate();
    }
  }

  public createClient(): void {
    console.log(`ws://${this.ip}:${this.port}/ws`);
    this.client = new Client({
      brokerURL: `ws://${this.ip}:${this.port}/ws`, // Direct WebSocket STOMP endpoint
      // Uncomment and adjust if your server requires credentials
      // connectHeaders: {
      //   login: 'user',
      //   passcode: 'password',
      // },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    this.registerStompListeners();
  }

  public disconnect(): void {
    if (this.client.active) {
      this.client.deactivate();
    }
  }

  public unsubscribe(subscription: StompSubscription): void {
    subscription.unsubscribe();
  }

  public sendMessage(destination: string, body: string, headers: {} = {}): void {
    if (this.client.active) {
      this.client.publish({ destination, body, headers });
    } else {
      console.error('Cannot send message. No STOMP connection.');
    }
  }
}
