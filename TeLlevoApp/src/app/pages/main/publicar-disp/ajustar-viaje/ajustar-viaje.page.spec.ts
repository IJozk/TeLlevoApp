import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjustarViajePage } from './ajustar-viaje.page';

describe('AjustarViajePage', () => {
  let component: AjustarViajePage;
  let fixture: ComponentFixture<AjustarViajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AjustarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
