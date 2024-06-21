import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTambahPage } from './form-tambah.page';

describe('FormTambahPage', () => {
  let component: FormTambahPage;
  let fixture: ComponentFixture<FormTambahPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTambahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
