import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesignsComponent } from './gamesigns.component';

describe('GamesignsComponent', () => {
  let component: GamesignsComponent;
  let fixture: ComponentFixture<GamesignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamesignsComponent]
    });
    fixture = TestBed.createComponent(GamesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
