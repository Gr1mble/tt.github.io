import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacesignsComponent } from './racesigns.component';

describe('RacesignsComponent', () => {
  let component: RacesignsComponent;
  let fixture: ComponentFixture<RacesignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RacesignsComponent]
    });
    fixture = TestBed.createComponent(RacesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
