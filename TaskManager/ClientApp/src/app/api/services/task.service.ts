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

import { ProjectTaskRm } from '../models/project-task-rm';
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
   * Path part for operation listTasksTask
   */
  static readonly ListTasksTaskPath = '/Task';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listTasksTask$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTasksTask$Plain$Response(params?: {
    projectId?: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProjectTaskRm>>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.ListTasksTaskPath, 'get');
    if (params) {
      rb.query('projectId', params.projectId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProjectTaskRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listTasksTask$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTasksTask$Plain(params?: {
    projectId?: string;
  },
  context?: HttpContext

): Observable<Array<ProjectTaskRm>> {

    return this.listTasksTask$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProjectTaskRm>>) => r.body as Array<ProjectTaskRm>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listTasksTask()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTasksTask$Response(params?: {
    projectId?: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProjectTaskRm>>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.ListTasksTaskPath, 'get');
    if (params) {
      rb.query('projectId', params.projectId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProjectTaskRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listTasksTask$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTasksTask(params?: {
    projectId?: string;
  },
  context?: HttpContext

): Observable<Array<ProjectTaskRm>> {

    return this.listTasksTask$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProjectTaskRm>>) => r.body as Array<ProjectTaskRm>)
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
    projectId?: string;
    taskId?: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.CompleteTaskPath, 'delete');
    if (params) {
      rb.query('projectId', params.projectId, {});
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
    projectId?: string;
    taskId?: string;
  },
  context?: HttpContext

): Observable<void> {

    return this.completeTask$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listTasksByUserTask
   */
  static readonly ListTasksByUserTaskPath = '/Task/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listTasksByUserTask$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTasksByUserTask$Plain$Response(params: {
    email: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<TasksRm>>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.ListTasksByUserTaskPath, 'get');
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
        return r as StrictHttpResponse<Array<TasksRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listTasksByUserTask$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTasksByUserTask$Plain(params: {
    email: string;
  },
  context?: HttpContext

): Observable<Array<TasksRm>> {

    return this.listTasksByUserTask$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<TasksRm>>) => r.body as Array<TasksRm>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listTasksByUserTask()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTasksByUserTask$Response(params: {
    email: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<TasksRm>>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.ListTasksByUserTaskPath, 'get');
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
        return r as StrictHttpResponse<Array<TasksRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listTasksByUserTask$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTasksByUserTask(params: {
    email: string;
  },
  context?: HttpContext

): Observable<Array<TasksRm>> {

    return this.listTasksByUserTask$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<TasksRm>>) => r.body as Array<TasksRm>)
    );
  }

}
