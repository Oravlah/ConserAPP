import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MudanzasPage } from './mudanzas.page';

describe('MudanzasPage', () => {
  let component: MudanzasPage;
  let fixture: ComponentFixture<MudanzasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MudanzasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
