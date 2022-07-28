import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvictionComponent } from './conviction.component';

describe('ConvictionComponent', () => {
  let component: ConvictionComponent;
  let fixture: ComponentFixture<ConvictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvictionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
