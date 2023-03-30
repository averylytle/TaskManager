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

import { TasksDto } from '../models/tasks-dto';
import { TasksRm } from '../models/tasks-rm';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation searchTask
   */
  static readonly SearchTaskPath = '/Task';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchTask$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchTask$Plain$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<TasksRm>>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.SearchTaskPath, 'get');
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
   * To access the full response (for headers, for example), `searchTask$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchTask$Plain(params?: {
  },
  context?: HttpContext

): Observable<Array<TasksRm>> {

    return this.searchTask$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<TasksRm>>) => r.body as Array<TasksRm>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchTask()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchTask$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<TasksRm>>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.SearchTaskPath, 'get');
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
   * To access the full response (for headers, for example), `searchTask$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchTask(params?: {
  },
  context?: HttpContext

): Observable<Array<TasksRm>> {

    return this.searchTask$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<TasksRm>>) => r.body as Array<TasksRm>)
    );
  }

  /**
   * Path part for operation editTask
   */
  static readonly EditTaskPath = '/Task';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editTask()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  editTask$Response(params?: {
    body?: TasksDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.EditTaskPath, 'put');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editTask$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  editTask(params?: {
    body?: TasksDto
  },
  context?: HttpContext

): Observable<void> {

    return this.editTask$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addTaskTask
   */
  static readonly AddTaskTaskPath = '/Task';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addTaskTask()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addTaskTask$Response(params?: {
    body?: TasksDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.AddTaskTaskPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addTaskTask$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addTaskTask(params?: {
    body?: TasksDto
  },
  context?: HttpContext

): Observable<void> {

    return this.addTaskTask$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation completeTask
   */
  static readonly CompleteTaskPath = '/Task';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completeTask()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeTask$Response(params?: {
    taskId?: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.CompleteTaskPath, 'delete');
    if (params) {
      rb.query('taskId', params.taskId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `completeTask$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeTask(params?: {
    taskId?: string;
  },
  context?: HttpContext

): Observable<void> {

    return this.completeTask$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
