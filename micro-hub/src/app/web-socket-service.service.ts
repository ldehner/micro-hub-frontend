import { EventEmitter, Injectable, Output } from '@angular/core';
import { Client, IFrame, IMessage, StompSubscription } from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client!: Client;
  private publicSubscription = new Subject<any>();
  private userSubscription = new Subject<any>();
  private ip: string = '';
  private port: string = '';
  private username: string = '';

  publicSubscription$ = this.publicSubscription.asObservable();
  userSubscription$ = this.userSubscription.asObservable();

  constructor() {
  }

  private registerStompListeners(): boolean {
    var ret = false;
    this.client.onConnect = (frame: IFrame) => {
      console.log('Connected: ' + frame);
      this.client.subscribe("/topic/public", (msg) => this.publicSubscription.next(msg.body));
      this.client.subscribe("/user/queue/reply", (message) => {
        if (message.body) {
          console.log("Queue");
          let body = JSON.parse(message.body);
          body.forEach((element: {
            content: any;
            type: any; sender: any;
          }) => {
            var message = {
              sender: element.sender,
              content: element.content,
              type: element.type
            };
            this.userSubscription.next(JSON.stringify(message));
            console.log(element.sender);
          });
          console.log(body);
          // Handle the received message body
        }
      });
      this.sendMessage('/app/chat.getAllMessages', '');
      var joinMessage = {
        sender: this.username,
        content: '',
        type: 'JOIN'
      };
      this.sendMessage('/app/chat.addUser', JSON.stringify(joinMessage));
      ret = true;
    };

    this.client.onStompError = (frame: IFrame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.onDisconnect = () => {
      console.log('Disconnected');
    };
    return ret;
  }

  public setIp(ip: string, port: string): void {
    console.log(ip);
    this.ip = ip;
    this.port = port;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public connect(): boolean {
    if (this.client != undefined) {
      this.disconnect();
    }
    var ret = this.createClient();
    if (!this.client.active) {
      this.client.activate();
    }
    return ret;
  }

  public createClient(): boolean {
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
    return this.registerStompListeners();
  }

  public disconnect(): void {
    if (this.client.active) {
      this.client.deactivate();
    }
  }

  public unsubscribe(subscription: StompSubscription): void {
    subscription.unsubscribe();
  }

  public sendMessage(destination: string, body: string, headers: {} = {}): boolean {
    if (this.client.active) {
      this.client.publish({ destination, body, headers });
      return true;
    } else {
      console.error('Cannot send message. No STOMP connection.');
      return false;
    }
  }
}
