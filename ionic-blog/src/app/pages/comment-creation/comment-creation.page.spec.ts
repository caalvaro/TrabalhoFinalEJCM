import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCreationPage } from './comment-creation.page';

describe('CommentCreationPage', () => {
  let component: CommentCreationPage;
  let fixture: ComponentFixture<CommentCreationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentCreationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
