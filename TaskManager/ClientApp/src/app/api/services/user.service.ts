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
   * Path part for operation findAllUsersUser
   */
  static readonly FindAllUsersUserPath = '/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllUsersUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUsersUser$Plain$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<UserRm>>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.FindAllUsersUserPath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `findAllUsersUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUsersUser$Plain(params?: {
  },
  context?: HttpContext

): Observable<Array<UserRm>> {

    return this.findAllUsersUser$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<UserRm>>) => r.body as Array<UserRm>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllUsersUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUsersUser$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<UserRm>>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.FindAllUsersUserPath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `findAllUsersUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUsersUser(params?: {
  },
  context?: HttpContext

): Observable<Array<UserRm>> {

    return this.findAllUsersUser$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<UserRm>>) => r.body as Array<UserRm>)
    );
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
   * Path part for operation getUserDetailsUser
   */
  static readonly GetUserDetailsUserPath = '/User/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserDetailsUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserDetailsUser$Plain$Response(params: {
    email: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UserRm>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.GetUserDetailsUserPath, 'get');
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
   * To access the full response (for headers, for example), `getUserDetailsUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserDetailsUser$Plain(params: {
    email: string;
  },
  context?: HttpContext

): Observable<UserRm> {

    return this.getUserDetailsUser$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<UserRm>) => r.body as UserRm)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserDetailsUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserDetailsUser$Response(params: {
    email: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UserRm>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.GetUserDetailsUserPath, 'get');
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
   * To access the full response (for headers, for example), `getUserDetailsUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserDetailsUser(params: {
    email: string;
  },
  context?: HttpContext

): Observable<UserRm> {

    return this.getUserDetailsUser$Response(params,context).pipe(
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
