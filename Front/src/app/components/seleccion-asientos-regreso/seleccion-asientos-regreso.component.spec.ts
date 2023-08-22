import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionAsientosRegresoComponent } from './seleccion-asientos-regreso.component';

describe('SeleccionAsientosRegresoComponent', () => {
  let component: SeleccionAsientosRegresoComponent;
  let fixture: ComponentFixture<SeleccionAsientosRegresoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionAsientosRegresoComponent]
    });
    fixture = TestBed.createComponent(SeleccionAsientosRegresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
