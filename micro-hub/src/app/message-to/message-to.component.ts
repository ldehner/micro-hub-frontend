import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePictureComponent } from "../profile-picture/profile-picture.component";

@Component({
    selector: 'app-message-to',
    standalone: true,
    templateUrl: './message-to.component.html',
    styleUrl: './message-to.component.scss',
    imports: [CommonModule, ProfilePictureComponent],
})
export class MessageToComponent {
  @Input() msg!: string;
}
