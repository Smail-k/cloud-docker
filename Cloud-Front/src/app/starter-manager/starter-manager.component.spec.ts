import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterManagerComponent } from './starter-manager.component';

describe('StarterManagerComponent', () => {
  let component: StarterManagerComponent;
  let fixture: ComponentFixture<StarterManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarterManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
