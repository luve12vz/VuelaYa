import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipajeExtraComponent } from './equipaje-extra.component';

describe('EquipajeExtraComponent', () => {
  let component: EquipajeExtraComponent;
  let fixture: ComponentFixture<EquipajeExtraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipajeExtraComponent]
    });
    fixture = TestBed.createComponent(EquipajeExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
