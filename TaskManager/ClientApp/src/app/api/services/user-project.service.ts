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

import { UserRm } from '../models/user-rm';

@Injectable({
  providedIn: 'root',
})
export class UserProjectService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation assignUserToProjectUserProject
   */
  static readonly AssignUserToProjectUserProjectPath = '/UserProject';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `assignUserToProjectUserProject()` instead.
   *
   * This method doesn't expect any request body.
   */
  assignUserToProjectUserProject$Response(params?: {
    projectId?: string;
    email?: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserProjectService.AssignUserToProjectUserProjectPath, 'post');
    if (params) {
      rb.query('projectId', params.projectId, {});
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
   * To access the full response (for headers, for example), `assignUserToProjectUserProject$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  assignUserToProjectUserProject(params?: {
    projectId?: string;
    email?: string;
  },
  context?: HttpContext

): Observable<void> {

    return this.assignUserToProjectUserProject$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeUserFromProjectUserProject
   */
  static readonly RemoveUserFromProjectUserProjectPath = '/UserProject';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeUserFromProjectUserProject()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUserFromProjectUserProject$Response(params?: {
    projectId?: string;
    email?: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserProjectService.RemoveUserFromProjectUserProjectPath, 'delete');
    if (params) {
      rb.query('projectId', params.projectId, {});
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
   * To access the full response (for headers, for example), `removeUserFromProjectUserProject$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUserFromProjectUserProject(params?: {
    projectId?: string;
    email?: string;
  },
  context?: HttpContext

): Observable<void> {

    return this.removeUserFromProjectUserProject$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findUserProject
   */
  static readonly FindUserProjectPath = '/UserProject/{projectId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUserProject$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserProject$Plain$Response(params: {
    projectId: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<UserRm>>> {

    const rb = new RequestBuilder(this.rootUrl, UserProjectService.FindUserProjectPath, 'get');
    if (params) {
      rb.path('projectId', params.projectId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUserProject$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserProject$Plain(params: {
    projectId: string;
  },
  context?: HttpContext

): Observable<Array<UserRm>> {

    return this.findUserProject$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<UserRm>>) => r.body as Array<UserRm>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUserProject()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserProject$Response(params: {
    projectId: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<UserRm>>> {

    const rb = new RequestBuilder(this.rootUrl, UserProjectService.FindUserProjectPath, 'get');
    if (params) {
      rb.path('projectId', params.projectId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUserProject$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserProject(params: {
    projectId: string;
  },
  context?: HttpContext

): Observable<Array<UserRm>> {

    return this.findUserProject$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<UserRm>>) => r.body as Array<UserRm>)
    );
  }

}
