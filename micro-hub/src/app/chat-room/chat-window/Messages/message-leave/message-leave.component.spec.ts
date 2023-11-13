import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageLeaveComponent } from './message-leave.component';

describe('MessageLeaveComponent', () => {
  let component: MessageLeaveComponent;
  let fixture: ComponentFixture<MessageLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageLeaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
