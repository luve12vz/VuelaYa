import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenDeVueloComponent } from './resumen-de-vuelo.component';

describe('ResumenDeVueloComponent', () => {
  let component: ResumenDeVueloComponent;
  let fixture: ComponentFixture<ResumenDeVueloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumenDeVueloComponent]
    });
    fixture = TestBed.createComponent(ResumenDeVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
