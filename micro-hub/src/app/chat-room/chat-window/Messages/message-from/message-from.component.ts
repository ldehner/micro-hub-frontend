import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePictureComponent } from "../profile-picture/profile-picture.component";

@Component({
    selector: 'app-message-from',
    standalone: true,
    templateUrl: './message-from.component.html',
    styleUrl: './message-from.component.scss',
    imports: [CommonModule, ProfilePictureComponent]
})
export class MessageFromComponent {
  @Input() msg!: string;
  @Input() sender!: string;
}
