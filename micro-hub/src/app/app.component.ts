import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, ChatRoomComponent]
})
export class AppComponent {


  constructor() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
