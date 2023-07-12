import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriplecrownComponent } from './triplecrown.component';

describe('TriplecrownComponent', () => {
  let component: TriplecrownComponent;
  let fixture: ComponentFixture<TriplecrownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriplecrownComponent]
    });
    fixture = TestBed.createComponent(TriplecrownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
