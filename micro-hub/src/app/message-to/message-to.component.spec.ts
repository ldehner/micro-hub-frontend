import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageToComponent } from './message-to.component';

describe('MessageToComponent', () => {
  let component: MessageToComponent;
  let fixture: ComponentFixture<MessageToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageToComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
