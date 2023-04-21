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

}
