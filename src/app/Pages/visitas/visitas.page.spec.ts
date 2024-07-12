import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitasPage } from './visitas.page';

describe('VisitasPage', () => {
  let component: VisitasPage;
  let fixture: ComponentFixture<VisitasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
