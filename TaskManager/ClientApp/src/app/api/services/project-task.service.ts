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

@Injectable({
  providedIn: 'root',
})
export class ProjectTaskService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listTasksByProjectProjectTask
   */
  static readonly ListTasksByProjectProjectTaskPath = '/ProjectTask';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listTasksByProjectProjectTask$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTasksByProjectProjectTask$Plain$Response(params?: {
    projectId?: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProjectTaskRm>>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectTaskService.ListTasksByProjectProjectTaskPath, 'get');
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
   * To access the full response (for headers, for example), `listTasksByProjectProjectTask$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTasksByProjectProjectTask$Plain(params?: {
    projectId?: string;
  },
  context?: HttpContext

): Observable<Array<ProjectTaskRm>> {

    return this.listTasksByProjectProjectTask$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProjectTaskRm>>) => r.body as Array<ProjectTaskRm>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listTasksByProjectProjectTask()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTasksByProjectProjectTask$Response(params?: {
    projectId?: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProjectTaskRm>>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectTaskService.ListTasksByProjectProjectTaskPath, 'get');
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
   * To access the full response (for headers, for example), `listTasksByProjectProjectTask$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTasksByProjectProjectTask(params?: {
    projectId?: string;
  },
  context?: HttpContext

): Observable<Array<ProjectTaskRm>> {

    return this.listTasksByProjectProjectTask$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProjectTaskRm>>) => r.body as Array<ProjectTaskRm>)
    );
  }

  /**
   * Path part for operation getProjectIdFromTaskIdProjectTask
   */
  static readonly GetProjectIdFromTaskIdProjectTaskPath = '/ProjectTask/{taskId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProjectIdFromTaskIdProjectTask$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProjectIdFromTaskIdProjectTask$Plain$Response(params: {
    taskId: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectTaskService.GetProjectIdFromTaskIdProjectTaskPath, 'get');
    if (params) {
      rb.path('taskId', params.taskId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProjectIdFromTaskIdProjectTask$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProjectIdFromTaskIdProjectTask$Plain(params: {
    taskId: string;
  },
  context?: HttpContext

): Observable<string> {

    return this.getProjectIdFromTaskIdProjectTask$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProjectIdFromTaskIdProjectTask()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProjectIdFromTaskIdProjectTask$Response(params: {
    taskId: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectTaskService.GetProjectIdFromTaskIdProjectTaskPath, 'get');
    if (params) {
      rb.path('taskId', params.taskId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProjectIdFromTaskIdProjectTask$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProjectIdFromTaskIdProjectTask(params: {
    taskId: string;
  },
  context?: HttpContext

): Observable<string> {

    return this.getProjectIdFromTaskIdProjectTask$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
