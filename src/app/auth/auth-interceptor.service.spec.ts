import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthInterceptorService} from './auth-interceptor.service';
import {AuthService} from './auth.service';
import {User} from './user.model';

describe('AuthInterceptorService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        }
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not add auth param when user is not logged in', () => {
    authService.user.next(null);
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.params.has('auth')).toBe(false);
    req.flush({});
  });

  it('should add auth param when user is logged in', () => {
    const user = new User('test@test.com', '123', 'my-token', new Date(Date.now() + 3600000));
    authService.user.next(user);
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne((r) => r.url === '/test');
    expect(req.request.params.has('auth')).toBe(true);
    expect(req.request.params.get('auth')).toBe('my-token');
    req.flush({});
  });
});
