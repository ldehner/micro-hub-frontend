import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-join',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-join.component.html',
  styleUrl: './message-join.component.scss'
})
export class MessageJoinComponent {
@Input() user: any;

}
