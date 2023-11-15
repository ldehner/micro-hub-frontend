import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { RoomNavComponent } from "./room-nav/room-nav.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, ChatRoomComponent, RoomNavComponent]
})
export class AppComponent {


  constructor() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
