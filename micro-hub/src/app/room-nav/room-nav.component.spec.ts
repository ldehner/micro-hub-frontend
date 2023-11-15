import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomNavComponent } from './room-nav.component';

describe('RoomNavComponent', () => {
  let component: RoomNavComponent;
  let fixture: ComponentFixture<RoomNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
