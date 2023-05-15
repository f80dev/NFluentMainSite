import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofofhumanityComponent } from './proofofhumanity.component';

describe('ProofofhumanityComponent', () => {
  let component: ProofofhumanityComponent;
  let fixture: ComponentFixture<ProofofhumanityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofofhumanityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofofhumanityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
