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

import { ProjectDto } from '../models/project-dto';
import { ProjectRm } from '../models/project-rm';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getProjectsProject
   */
  static readonly GetProjectsProjectPath = '/Project';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProjectsProject$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProjectsProject$Plain$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProjectRm>>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectService.GetProjectsProjectPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProjectRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProjectsProject$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProjectsProject$Plain(params?: {
  },
  context?: HttpContext

): Observable<Array<ProjectRm>> {

    return this.getProjectsProject$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProjectRm>>) => r.body as Array<ProjectRm>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProjectsProject()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProjectsProject$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProjectRm>>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectService.GetProjectsProjectPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProjectRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProjectsProject$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProjectsProject(params?: {
  },
  context?: HttpContext

): Observable<Array<ProjectRm>> {

    return this.getProjectsProject$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProjectRm>>) => r.body as Array<ProjectRm>)
    );
  }

  /**
   * Path part for operation createProjectProject
   */
  static readonly CreateProjectProjectPath = '/Project';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProjectProject()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createProjectProject$Response(params?: {
    body?: ProjectDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectService.CreateProjectProjectPath, 'post');
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
   * To access the full response (for headers, for example), `createProjectProject$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createProjectProject(params?: {
    body?: ProjectDto
  },
  context?: HttpContext

): Observable<void> {

    return this.createProjectProject$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
