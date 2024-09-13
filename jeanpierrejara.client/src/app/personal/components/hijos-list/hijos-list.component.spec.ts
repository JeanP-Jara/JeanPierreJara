import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HijosListComponent } from './hijos-list.component';

describe('HijosListComponent', () => {
  let component: HijosListComponent;
  let fixture: ComponentFixture<HijosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HijosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HijosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
