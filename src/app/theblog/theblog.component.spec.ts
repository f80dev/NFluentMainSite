import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheblogComponent } from './theblog.component';

describe('TheblogComponent', () => {
  let component: TheblogComponent;
  let fixture: ComponentFixture<TheblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheblogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
