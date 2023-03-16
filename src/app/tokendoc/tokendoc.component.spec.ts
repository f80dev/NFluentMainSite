import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokendocComponent } from './tokendoc.component';

describe('TokendocComponent', () => {
  let component: TokendocComponent;
  let fixture: ComponentFixture<TokendocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokendocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokendocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
