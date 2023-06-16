import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpInterceptorFn, HttpHandlerFn
} from '@angular/common/http';
import {Observable} from 'rxjs';

const jwtToken = 'moj token';

export const jwttokenInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> =>
{
  const newRequest = request.clone({setHeaders: {'Authorisation': jwtToken}})
  return next(newRequest);
}
