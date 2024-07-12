import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EspaciosPage } from './espacios.page';

describe('EspaciosPage', () => {
  let component: EspaciosPage;
  let fixture: ComponentFixture<EspaciosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
