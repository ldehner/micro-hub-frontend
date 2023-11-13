import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageJoinComponent } from './message-join.component';

describe('MessageJoinComponent', () => {
  let component: MessageJoinComponent;
  let fixture: ComponentFixture<MessageJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageJoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
