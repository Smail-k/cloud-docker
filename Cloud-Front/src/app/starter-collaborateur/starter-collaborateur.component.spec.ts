import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterCollaborateurComponent } from './starter-collaborateur.component';

describe('StarterCollaborateurComponent', () => {
  let component: StarterCollaborateurComponent;
  let fixture: ComponentFixture<StarterCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarterCollaborateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarterCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
