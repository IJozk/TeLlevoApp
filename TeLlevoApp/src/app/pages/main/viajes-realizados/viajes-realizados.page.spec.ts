import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajesRealizadosPage } from './viajes-realizados.page';

describe('ViajesRealizadosPage', () => {
  let component: ViajesRealizadosPage;
  let fixture: ComponentFixture<ViajesRealizadosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViajesRealizadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
