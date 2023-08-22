import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionAsientosIdaComponent } from './seleccion-asientos-ida.component';

describe('SeleccionAsientosIdaComponent', () => {
  let component: SeleccionAsientosIdaComponent;
  let fixture: ComponentFixture<SeleccionAsientosIdaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionAsientosIdaComponent]
    });
    fixture = TestBed.createComponent(SeleccionAsientosIdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
