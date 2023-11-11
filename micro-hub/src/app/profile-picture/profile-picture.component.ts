import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProfilePictureComponent {
  @Input() username: string = '';
  initials: string = '';
  backgroundColor: string = '';
  
  ngOnInit(): void {
    this.setInitialsAndColor();
  }


  private setInitialsAndColor(): void {
    // Split the username into words and get initials
    const words = this.username.split(' ');
    this.initials = words.length > 1 
      ? `${words[0].charAt(0)}${words[1].charAt(0)}` 
      : words[0].charAt(0);

    // Generate a random color
    this.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
  }
}
