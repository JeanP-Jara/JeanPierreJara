import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMensajeComponent } from './alert-mensaje.component';

describe('AlertMensajeComponent', () => {
  let component: AlertMensajeComponent;
  let fixture: ComponentFixture<AlertMensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertMensajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
