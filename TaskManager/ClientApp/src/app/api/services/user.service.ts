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

import { NewUserDto } from '../models/new-user-dto';
import { UserRm } from '../models/user-rm';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation registerUser
   */
  static readonly RegisterUserPath = '/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerUser()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerUser$Response(params?: {
    body?: NewUserDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.RegisterUserPath, 'post');
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
   * To access the full response (for headers, for example), `registerUser$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerUser(params?: {
    body?: NewUserDto
  },
  context?: HttpContext

): Observable<void> {

    return this.registerUser$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findUser
   */
  static readonly FindUserPath = '/User/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUser$Plain$Response(params: {
    email: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UserRm>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.FindUserPath, 'get');
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
        return r as StrictHttpResponse<UserRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUser$Plain(params: {
    email: string;
  },
  context?: HttpContext

): Observable<UserRm> {

    return this.findUser$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<UserRm>) => r.body as UserRm)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUser$Response(params: {
    email: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UserRm>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.FindUserPath, 'get');
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
        return r as StrictHttpResponse<UserRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUser(params: {
    email: string;
  },
  context?: HttpContext

): Observable<UserRm> {

    return this.findUser$Response(params,context).pipe(
      map((r: StrictHttpResponse<UserRm>) => r.body as UserRm)
    );
  }

  /**
   * Path part for operation editUser
   */
  static readonly EditUserPath = '/User/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  editUser$Response(params: {
    email: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.EditUserPath, 'put');
    if (params) {
      rb.path('email', params.email, {});
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
   * To access the full response (for headers, for example), `editUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  editUser(params: {
    email: string;
  },
  context?: HttpContext

): Observable<void> {

    return this.editUser$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
