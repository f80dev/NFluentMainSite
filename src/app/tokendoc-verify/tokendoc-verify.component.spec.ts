import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokendocVerifyComponent } from './tokendoc-verify.component';

describe('TokendocVerifyComponent', () => {
  let component: TokendocVerifyComponent;
  let fixture: ComponentFixture<TokendocVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokendocVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokendocVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
