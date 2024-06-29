import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProfesionalInicioComponent } from './nuevo-profesional-inicio.component';

describe('NuevoProfesionalInicioComponent', () => {
  let component: NuevoProfesionalInicioComponent;
  let fixture: ComponentFixture<NuevoProfesionalInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuevoProfesionalInicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoProfesionalInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
