import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingPage } from './posting.page';

describe('PostingPage', () => {
  let component: PostingPage;
  let fixture: ComponentFixture<PostingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
