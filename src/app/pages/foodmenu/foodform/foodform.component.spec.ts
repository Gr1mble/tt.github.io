import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodformComponent } from './foodform.component';

describe('FoodformComponent', () => {
  let component: FoodformComponent;
  let fixture: ComponentFixture<FoodformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodformComponent]
    });
    fixture = TestBed.createComponent(FoodformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
