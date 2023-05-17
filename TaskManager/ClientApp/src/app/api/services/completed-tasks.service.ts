/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CompletedTasksRm } from '../models/completed-tasks-rm';

@Injectable({
  providedIn: 'root',
})
export class CompletedTasksService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listCompleteCompletedTasks
   */
  static readonly ListCompleteCompletedTasksPath = '/CompletedTasks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listCompleteCompletedTasks$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  listCompleteCompletedTasks$Plain$Response(params?: {
    projectId?: string;
    email?: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<CompletedTasksRm>>> {

    const rb = new RequestBuilder(this.rootUrl, CompletedTasksService.ListCompleteCompletedTasksPath, 'get');
    if (params) {
      rb.query('projectId', params.projectId, {});
      rb.query('email', params.email, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CompletedTasksRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listCompleteCompletedTasks$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listCompleteCompletedTasks$Plain(params?: {
    projectId?: string;
    email?: string;
  },
  context?: HttpContext

): Observable<Array<CompletedTasksRm>> {

    return this.listCompleteCompletedTasks$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CompletedTasksRm>>) => r.body as Array<CompletedTasksRm>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listCompleteCompletedTasks()` instead.
   *
   * This method doesn't expect any request body.
   */
  listCompleteCompletedTasks$Response(params?: {
    projectId?: string;
    email?: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<CompletedTasksRm>>> {

    const rb = new RequestBuilder(this.rootUrl, CompletedTasksService.ListCompleteCompletedTasksPath, 'get');
    if (params) {
      rb.query('projectId', params.projectId, {});
      rb.query('email', params.email, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CompletedTasksRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listCompleteCompletedTasks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listCompleteCompletedTasks(params?: {
    projectId?: string;
    email?: string;
  },
  context?: HttpContext

): Observable<Array<CompletedTasksRm>> {

    return this.listCompleteCompletedTasks$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CompletedTasksRm>>) => r.body as Array<CompletedTasksRm>)
    );
  }

  /**
   * Path part for operation completeByEmailCompletedTasks
   */
  static readonly CompleteByEmailCompletedTasksPath = '/CompletedTasks/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completeByEmailCompletedTasks$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeByEmailCompletedTasks$Plain$Response(params: {
    email: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<CompletedTasksRm>>> {

    const rb = new RequestBuilder(this.rootUrl, CompletedTasksService.CompleteByEmailCompletedTasksPath, 'get');
    if (params) {
      rb.path('email', params.email, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CompletedTasksRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `completeByEmailCompletedTasks$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeByEmailCompletedTasks$Plain(params: {
    email: string;
  },
  context?: HttpContext

): Observable<Array<CompletedTasksRm>> {

    return this.completeByEmailCompletedTasks$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CompletedTasksRm>>) => r.body as Array<CompletedTasksRm>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completeByEmailCompletedTasks()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeByEmailCompletedTasks$Response(params: {
    email: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<CompletedTasksRm>>> {

    const rb = new RequestBuilder(this.rootUrl, CompletedTasksService.CompleteByEmailCompletedTasksPath, 'get');
    if (params) {
      rb.path('email', params.email, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CompletedTasksRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `completeByEmailCompletedTasks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeByEmailCompletedTasks(params: {
    email: string;
  },
  context?: HttpContext

): Observable<Array<CompletedTasksRm>> {

    return this.completeByEmailCompletedTasks$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CompletedTasksRm>>) => r.body as Array<CompletedTasksRm>)
    );
  }

}
