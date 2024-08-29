import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { CheckUserResponseData, UserModel } from '../interface/models';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (req.url.endsWith('/api/checkUsername') && req.method === 'POST') {
      return this.handleCheckUsername(req);
    }

    if (req.url.endsWith('/api/createUser') && req.method === 'POST') {
      return this.handleSubmitForm(req);
    }

    if (req.url.endsWith('/api/deleteUser') && req.method === 'DELETE') {
      return this.handleDeleteUser(req);
    }

    if (req.url.endsWith('/api/updateUser') && req.method === 'PUT') {
      return this.handleUpdateUser(req);
    }

    return of(new HttpResponse({ status: 404, body: { result: 'You are using the wrong endpoint' } }));
  }

  private handleCheckUsername(req: HttpRequest<any>): Observable<HttpResponse<CheckUserResponseData>> {
    const isAvailable = req.body.username.includes('new');
    const response = new HttpResponse({ status: 200, body: { isAvailable } });

    return of(response).pipe(
      delay(500),
      tap(() => console.log('checkUsername response:', { isAvailable }))
    );
  }

  private handleSubmitForm(req: HttpRequest<any>): Observable<HttpResponse<UserModel>> {
    const response = new HttpResponse({ status: 200, body: req.body });

    return of(response).pipe(
      delay(500),
      tap(() => console.log('submitForm response'))
    );
  }

  private handleDeleteUser(req: HttpRequest<any>): Observable<HttpResponse<string>> {
    const param = req.params.get('username')
    const response = new HttpResponse({ status: 200, body: param });

    return of(response).pipe(
      delay(500),
      tap(() => console.log('delete response'))
    );
  }

  private handleUpdateUser(req: HttpRequest<any>): Observable<HttpResponse<UserModel>> {
    const response = new HttpResponse({ status: 200, body: req.body });

    return of(response).pipe(
      delay(500),
      tap(() => console.log('update response'))
    );
  }
}
