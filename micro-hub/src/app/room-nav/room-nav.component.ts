import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-nav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room-nav.component.html',
  styleUrl: './room-nav.component.scss'
})
export class RoomNavComponent {
username: string = "User";
ip: string = "";
port: string = "";
  
}
