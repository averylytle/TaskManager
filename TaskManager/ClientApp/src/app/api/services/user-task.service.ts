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


@Injectable({
  providedIn: 'root',
})
export class UserTaskService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation assignUserToTaskUserTask
   */
  static readonly AssignUserToTaskUserTaskPath = '/UserTask';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `assignUserToTaskUserTask()` instead.
   *
   * This method doesn't expect any request body.
   */
  assignUserToTaskUserTask$Response(params?: {
    projectId?: string;
    taskId?: string;
    email?: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserTaskService.AssignUserToTaskUserTaskPath, 'post');
    if (params) {
      rb.query('projectId', params.projectId, {});
      rb.query('taskId', params.taskId, {});
      rb.query('email', params.email, {});
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
   * To access the full response (for headers, for example), `assignUserToTaskUserTask$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  assignUserToTaskUserTask(params?: {
    projectId?: string;
    taskId?: string;
    email?: string;
  },
  context?: HttpContext

): Observable<void> {

    return this.assignUserToTaskUserTask$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeUserFromTaskUserTask
   */
  static readonly RemoveUserFromTaskUserTaskPath = '/UserTask';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeUserFromTaskUserTask()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUserFromTaskUserTask$Response(params?: {
    projectId?: string;
    taskId?: string;
    email?: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserTaskService.RemoveUserFromTaskUserTaskPath, 'delete');
    if (params) {
      rb.query('projectId', params.projectId, {});
      rb.query('taskId', params.taskId, {});
      rb.query('email', params.email, {});
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
   * To access the full response (for headers, for example), `removeUserFromTaskUserTask$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUserFromTaskUserTask(params?: {
    projectId?: string;
    taskId?: string;
    email?: string;
  },
  context?: HttpContext

): Observable<void> {

    return this.removeUserFromTaskUserTask$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
