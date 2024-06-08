import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiusuarioComponent } from './miusuario.component';

describe('MiusuarioComponent', () => {
  let component: MiusuarioComponent;
  let fixture: ComponentFixture<MiusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiusuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
