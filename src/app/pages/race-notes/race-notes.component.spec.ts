import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceNotesComponent } from './race-notes.component';

describe('RaceNotesComponent', () => {
  let component: RaceNotesComponent;
  let fixture: ComponentFixture<RaceNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaceNotesComponent]
    });
    fixture = TestBed.createComponent(RaceNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
