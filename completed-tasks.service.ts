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

import { TasksRm } from '../models/tasks-rm';

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
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<TasksRm>>> {

    const rb = new RequestBuilder(this.rootUrl, CompletedTasksService.ListCompleteCompletedTasksPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TasksRm>>;
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
  },
  context?: HttpContext

): Observable<Array<TasksRm>> {

    return this.listCompleteCompletedTasks$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<TasksRm>>) => r.body as Array<TasksRm>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listCompleteCompletedTasks()` instead.
   *
   * This method doesn't expect any request body.
   */
  listCompleteCompletedTasks$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<TasksRm>>> {

    const rb = new RequestBuilder(this.rootUrl, CompletedTasksService.ListCompleteCompletedTasksPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TasksRm>>;
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
  },
  context?: HttpContext

): Observable<Array<TasksRm>> {

    return this.listCompleteCompletedTasks$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<TasksRm>>) => r.body as Array<TasksRm>)
    );
  }

}
