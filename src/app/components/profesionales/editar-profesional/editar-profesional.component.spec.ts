import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProfesionalComponent } from './editar-profesional.component';

describe('EditarProfesionalComponent', () => {
  let component: EditarProfesionalComponent;
  let fixture: ComponentFixture<EditarProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarProfesionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
