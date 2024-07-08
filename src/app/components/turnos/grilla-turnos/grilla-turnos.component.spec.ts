import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaTurnosComponent } from './grilla-turnos.component';

describe('GrillaTurnosComponent', () => {
  let component: GrillaTurnosComponent;
  let fixture: ComponentFixture<GrillaTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrillaTurnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrillaTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
