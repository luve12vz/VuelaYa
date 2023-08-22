import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumendevueloidavueltaComponent } from './resumendevueloidavuelta.component';

describe('ResumendevueloidavueltaComponent', () => {
  let component: ResumendevueloidavueltaComponent;
  let fixture: ComponentFixture<ResumendevueloidavueltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumendevueloidavueltaComponent]
    });
    fixture = TestBed.createComponent(ResumendevueloidavueltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
