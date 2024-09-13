import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HijosEditComponent } from './hijos-edit.component';

describe('HijosEditComponent', () => {
  let component: HijosEditComponent;
  let fixture: ComponentFixture<HijosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HijosEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HijosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
