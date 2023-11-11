import { Component, ElementRef, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MessageFromComponent } from './message-from/message-from.component';
import { MessageToComponent } from './message-to/message-to.component';
import { MessageJoinComponent } from './message-join/message-join.component';
import { Subscription } from 'rxjs';
import { WebSocketService } from './web-socket-service.service';
import { Message } from './message';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MessageFromComponent, MessageJoinComponent, MessageToComponent,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('scrollContainer')
  private scrollContainer!: ElementRef;
  title = 'micro-hub';
  private messagesSubscription: Subscription = new Subscription();
  private subscription: any;
  private myMethodSub: Subscription;
  username: string = '';
  port: string = '8080';
  ip: string = '127.0.0.1';
  message: string = '';
  msgs: Message[] = [];


  public messages: any[] = []; // Array to store incoming messages

  sentMessage: string = "Sent message content fsdfsdf sdfsdf ssdfsdgf dfgdfg dfgdfg dfgdfg dfg dsfhg fdg hfdghdfgh dfghdrfghdfghdfghdfghdfgh fghfgh"; // Replace with actual message content
  receivedMessage: string = "Received message content"; // Replace with actual message content
connectionStatus: string = "connected"; // Replace with actual connection status

  constructor(private stompService: WebSocketService) {
    this.myMethodSub = this.stompService.myMethodCalled$.subscribe((msg) => {
      msg = JSON.parse(msg);
      console.log(msg.type);
      if(msg.sender === this.username && msg.type === 'CHAT'){
        this.addMessage(msg.content, 'to', msg.sender);
      }
      else if(msg.type === 'CHAT'){
        console.log("hey");
        this.addMessage(msg.content, 'from', msg.sender);
      } else{
        console.log("hey2");
        this.addMessage(msg.content, 'info', msg.sender);
      }
    });
   }

  ngOnInit() {

  }

  ngOnDestroy() {
    // Unsubscribe and disconnect from the STOMP server when the component is destroyed
    if (this.subscription) {
      this.stompService.unsubscribe(this.subscription);
    }
    this.stompService.disconnect();
  }

  sendMessage() {
    // Use the stompService to send a message to a specified destination
    const destination = '/app/chat.sendMessage';
    var chatMessage = {
      sender: this.username,
      content: this.message,
      type: 'CHAT'
  };
    this.stompService.sendMessage(destination, JSON.stringify(chatMessage));
    console.log('Message sent to ' + destination);
  }

  connect() {
    // Connect to the STOMP server on component initialization
    console.log(this.ip);
    this.stompService.setUsername(this.username);
    this.stompService.setIp(this.ip, this.port);
    this.stompService.connect();
  }

  onMessageReceived(message: any) {
    console.log('Message received: ');
  }

  addMessage(content: string, type: 'from' | 'to'| 'info', sender: string) {
    console.log('Message received: ' + content);
    this.messages.push({ content, type, sender });
  }


  ngAfterViewInit() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
