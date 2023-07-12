import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketgeneratorComponent } from './bracketgenerator.component';

describe('BracketgeneratorComponent', () => {
  let component: BracketgeneratorComponent;
  let fixture: ComponentFixture<BracketgeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BracketgeneratorComponent]
    });
    fixture = TestBed.createComponent(BracketgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
