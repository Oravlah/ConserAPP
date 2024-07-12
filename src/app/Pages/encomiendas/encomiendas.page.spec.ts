import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncomiendasPage } from './encomiendas.page';

describe('EncomiendasPage', () => {
  let component: EncomiendasPage;
  let fixture: ComponentFixture<EncomiendasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EncomiendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
