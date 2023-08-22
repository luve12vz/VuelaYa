import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionPasajerosComponent } from './seleccion-pasajeros.component';

describe('SeleccionPasajerosComponent', () => {
  let component: SeleccionPasajerosComponent;
  let fixture: ComponentFixture<SeleccionPasajerosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionPasajerosComponent]
    });
    fixture = TestBed.createComponent(SeleccionPasajerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
