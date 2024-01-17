import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAutoPage } from './add-auto.page';

describe('AddAutoPage', () => {
  let component: AddAutoPage;
  let fixture: ComponentFixture<AddAutoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
