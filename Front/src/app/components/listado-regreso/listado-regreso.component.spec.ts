import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRegresoComponent } from './listado-regreso.component';

describe('ListadoRegresoComponent', () => {
  let component: ListadoRegresoComponent;
  let fixture: ComponentFixture<ListadoRegresoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoRegresoComponent]
    });
    fixture = TestBed.createComponent(ListadoRegresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
