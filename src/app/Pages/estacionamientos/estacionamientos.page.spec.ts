import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstacionamientosPage } from './estacionamientos.page';

describe('EstacionamientosPage', () => {
  let component: EstacionamientosPage;
  let fixture: ComponentFixture<EstacionamientosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacionamientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
