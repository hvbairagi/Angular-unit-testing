import { TestBed } from '@angular/core/testing';
import { CommentsService } from './comments.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { API_URL } from '../utils/resources';
import COMMENTS_DATA from '../../../db.json';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    commentsService = TestBed.inject(CommentsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should give all comments', () => {
    const commentsData = COMMENTS_DATA.comments.slice(0, 2);
    commentsService.getAllComments().subscribe((allComments: any) => {
      expect(allComments).toBeTruthy();
      expect(allComments.length).withContext('should have 2 items').toBe(2);
    });

    const req = httpTesting.expectOne(`${API_URL}/comments`);
    expect(req.request.method).toEqual('GET');
    req.flush(commentsData);
  });

  it('should give a comment by ID', () => {
    const commentsData = COMMENTS_DATA.comments[0];
    const ID = 1;

    commentsService.getCommentById(ID).subscribe((comment: any) => {
      expect(comment).toBeTruthy();
      expect(comment.text).toBe('a comment about post 1');
    });

    // commentsService.getCommentById(2).subscribe((comment: any) => {
    //   expect(comment).toBeTruthy();
    //   expect(comment.text).toBe('a comment about post 1');
    // });

    const req = httpTesting.expectOne(`${API_URL}/comments/${ID}`);
    expect(req.request.method).toEqual('GET');
    req.flush(commentsData);
    httpTesting.verify();
  });

  it('should save a comment', () => {
    const commentData = { id: 10, text: 'Comment added by testing' };
    const ID = 1;
    commentsService.postComment(commentData).subscribe((comment: any) => {
      expect(comment).toBeTruthy();
      expect(comment.text).toBe(commentData.text);
    });

    const req = httpTesting.expectOne(`${API_URL}/comments`);
    expect(req.request.method).toEqual('POST');
    req.flush(commentData);
  });

  it('should give error if save a comment fails', () => {
    const commentData = { id: 11, text: 'Comment added by testing' };
    const errorMessage = 'Internal server error';
    commentsService.postComment(commentData).subscribe({
      next: () => {
        fail('Save comment shoould have failed.');
      },
      error: (err: HttpErrorResponse) => {
        expect(err.status).toBe(500);
        expect(err.statusText).toBe(errorMessage);
      },
    });

    const req = httpTesting.expectOne(`${API_URL}/comments`);
    expect(req.request.method).toEqual('POST');
    req.flush('Failed!', {
      status: 500,
      statusText: errorMessage,
    });
  });

  afterEach(() => {
    httpTesting.verify();
  });
});
