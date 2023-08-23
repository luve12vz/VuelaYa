import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCompraIdaVueltaComponent } from './resumen-compra-ida-vuelta.component';

describe('ResumenCompraIdaVueltaComponent', () => {
  let component: ResumenCompraIdaVueltaComponent;
  let fixture: ComponentFixture<ResumenCompraIdaVueltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumenCompraIdaVueltaComponent]
    });
    fixture = TestBed.createComponent(ResumenCompraIdaVueltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
