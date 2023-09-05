import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesTestingComponent } from './notes-testing.component';

describe('NotesTestingComponent', () => {
  let component: NotesTestingComponent;
  let fixture: ComponentFixture<NotesTestingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesTestingComponent]
    });
    fixture = TestBed.createComponent(NotesTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
