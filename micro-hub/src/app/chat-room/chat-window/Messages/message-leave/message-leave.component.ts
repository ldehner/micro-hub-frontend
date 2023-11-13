import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-leave',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-leave.component.html',
  styleUrl: './message-leave.component.scss'
})
export class MessageLeaveComponent {
  @Input() user: any;
}
