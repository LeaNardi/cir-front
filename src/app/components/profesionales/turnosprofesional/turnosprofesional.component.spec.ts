import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosprofesionalComponent } from './turnosprofesional.component';

describe('TurnosprofesionalComponent', () => {
  let component: TurnosprofesionalComponent;
  let fixture: ComponentFixture<TurnosprofesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TurnosprofesionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurnosprofesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
