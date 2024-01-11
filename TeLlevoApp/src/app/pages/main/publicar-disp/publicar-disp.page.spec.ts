import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicarDispPage } from './publicar-disp.page';

describe('PublicarDispPage', () => {
  let component: PublicarDispPage;
  let fixture: ComponentFixture<PublicarDispPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PublicarDispPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
