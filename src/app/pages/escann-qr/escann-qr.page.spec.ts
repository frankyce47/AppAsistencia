import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscannQrPage } from './escann-qr.page';

describe('EscannQrPage', () => {
  let component: EscannQrPage;
  let fixture: ComponentFixture<EscannQrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EscannQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
