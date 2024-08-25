import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { CommentsService } from '../../services/comments.service';
import { DebugElement } from '@angular/core';

describe('CommentComponent', () => {
  let commenstService: jasmine.SpyObj<CommentsService>;
  let fixure: ComponentFixture<CommentComponent>;
  let component: CommentComponent;
  let el: DebugElement;

  beforeEach(async () => {
    const commentsServiceSpy = jasmine.createSpyObj('CommentsService', [
      'getAllComments',
      'postComment',
    ]);

    await TestBed.configureTestingModule({
      imports: [CommentComponent],
      providers: [{ provide: CommentsService, useValue: commentsServiceSpy }],
    }).compileComponents();

    commenstService = TestBed.inject(
      CommentsService
    ) as jasmine.SpyObj<CommentsService>;

    fixure = TestBed.createComponent(CommentComponent);
    component = fixure.componentInstance;
    el = fixture.DebugElement;
  });

  it('should have input and button present ', () => {
    expect(fixure.nativeElement.querySelector('h1').innerText)
      .withContext("can't find h1")
      .toBe('welcome to comments section');
    expect(fixure.nativeElement.querySelector('input'))
      .withContext("can't find input")
      .toBeTruthy();
    expect(fixure.nativeElement.querySelector('button'))
      .withContext("can't find button")
      .toBeTruthy();
  });
});
