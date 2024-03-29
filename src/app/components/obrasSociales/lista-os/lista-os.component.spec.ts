import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOsComponent } from './lista-os.component';

describe('ListaOsComponent', () => {
  let component: ListaOsComponent;
  let fixture: ComponentFixture<ListaOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaOsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
