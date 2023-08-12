import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasIiComponent } from './noticias-ii.component';

describe('NoticiasIiComponent', () => {
  let component: NoticiasIiComponent;
  let fixture: ComponentFixture<NoticiasIiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticiasIiComponent]
    });
    fixture = TestBed.createComponent(NoticiasIiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
