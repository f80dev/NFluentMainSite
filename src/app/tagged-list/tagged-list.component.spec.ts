import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedListComponent } from './tagged-list.component';

describe('TaggedListComponent', () => {
  let component: TaggedListComponent;
  let fixture: ComponentFixture<TaggedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaggedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
